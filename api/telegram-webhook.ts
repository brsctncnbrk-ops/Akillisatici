// Vercel serverless fonksiyon: Telegram inline-button geri çağrılarını işler.
// Approve → drafts/*.md'yi src/content/posts/'a taşır, durumu yayinda yapar.
// Reject  → drafts/*.md'yi siler.
// Her iki işlem GitHub REST API üzerinden yapılır; Vercel build/deploy otomatik tetiklenir.

const REPO = 'brsctncnbrk-ops/akillisatici';
const BRANCH = 'main';
const GH_API = 'https://api.github.com';
const TG_API = 'https://api.telegram.org';

// --- Tip tanımları ---------------------------------------------------------

interface TelegramMessage {
  chat: { id: number };
  message_id: number;
  text?: string;
}

interface TelegramCallbackQuery {
  id: string;
  data?: string;
  from?: { id: number };
  message?: TelegramMessage;
}

interface TelegramUpdate {
  callback_query?: TelegramCallbackQuery;
}

interface GithubFile {
  content: string; // base64
  sha: string;
}

// Vercel classic (Node.js) handler imzası — @vercel/node gerekmez.
interface Req {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  body: TelegramUpdate;
}
interface Res {
  status(code: number): Res;
  json(body: unknown): void;
}

// --- GitHub REST yardımcıları ----------------------------------------------

function ghHeaders(): Record<string, string> {
  const token = process.env.GITHUB_PAT;
  if (!token) throw new Error('GITHUB_PAT ortam değişkeni eksik.');
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
  };
}

async function ghGet(path: string): Promise<GithubFile> {
  const res = await fetch(`${GH_API}/repos/${REPO}/contents/${path}?ref=${BRANCH}`, {
    headers: ghHeaders(),
  });
  if (!res.ok) throw new Error(`GitHub GET ${path} → ${res.status} ${res.statusText}`);
  return res.json() as Promise<GithubFile>;
}

async function ghPut(path: string, content: string, message: string): Promise<void> {
  const res = await fetch(`${GH_API}/repos/${REPO}/contents/${path}`, {
    method: 'PUT',
    headers: ghHeaders(),
    body: JSON.stringify({
      message,
      content: Buffer.from(content).toString('base64'),
      branch: BRANCH,
    }),
  });
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`GitHub PUT ${path} → ${res.status}: ${detail}`);
  }
}

async function ghDelete(path: string, sha: string, message: string): Promise<void> {
  const res = await fetch(`${GH_API}/repos/${REPO}/contents/${path}`, {
    method: 'DELETE',
    headers: ghHeaders(),
    body: JSON.stringify({ message, sha, branch: BRANCH }),
  });
  if (!res.ok) throw new Error(`GitHub DELETE ${path} → ${res.status} ${res.statusText}`);
}

// --- Telegram yardımcıları ------------------------------------------------

async function tgCall(method: string, body: object): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return;
  await fetch(`${TG_API}/bot${token}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

async function answerCallback(id: string, text: string): Promise<void> {
  await tgCall('answerCallbackQuery', { callback_query_id: id, text });
}

async function editMessage(chatId: number, msgId: number, text: string): Promise<void> {
  await tgCall('editMessageText', {
    chat_id: chatId,
    message_id: msgId,
    text,
    parse_mode: 'Markdown',
  });
}

// --- İş mantığı -----------------------------------------------------------

async function approveDraft(filename: string): Promise<void> {
  const draftPath = `drafts/${filename}`;
  const file = await ghGet(draftPath);
  const raw = Buffer.from(file.content, 'base64').toString('utf-8');

  // Tek satırlık durum değişikliği — frontmatter.ts'nin yamlStr formatıyla eşleşir.
  const published = raw.replace("durumu: 'taslak'", "durumu: 'yayinda'");
  if (published === raw) throw new Error(`durumu değeri bulunamadı: ${filename}`);

  const postPath = `src/content/posts/${filename}`;
  await ghPut(postPath, published, `content: ${filename} yayınlandı (Telegram onayı)`);
  await ghDelete(draftPath, file.sha, `chore: taslak silindi — ${filename}`);
}

async function rejectDraft(filename: string): Promise<void> {
  const draftPath = `drafts/${filename}`;
  const file = await ghGet(draftPath);
  await ghDelete(draftPath, file.sha, `chore: taslak reddedildi — ${filename}`);
}

// --- Ana handler ----------------------------------------------------------

export default async function handler(req: Req, res: Res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Webhook güvenlik doğrulaması
  const secret = req.headers['x-telegram-bot-api-secret-token'];
  const expected = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (expected && secret !== expected) return res.status(401).json({ error: 'Unauthorized' });

  const update = req.body;
  if (!update?.callback_query) return res.status(200).json({ ok: true });

  const { id: cbId, data: action, from, message } = update.callback_query;
  if (!message?.text || !action) return res.status(200).json({ ok: true });

  // Yalnızca yapılandırılmış chat'ten gelen buton basışlarını işle
  const allowedChatId = process.env.TELEGRAM_CHAT_ID;
  if (allowedChatId && String(from?.id) !== allowedChatId) {
    await answerCallback(cbId, '⛔ Yetkisiz.');
    return res.status(200).json({ ok: true });
  }

  // Dosya adını mesaj metninden ayıkla: "📁 dosyaadi.md" satırından
  const match = message.text.match(/^📁 (.+\.md)$/m);
  if (!match) {
    await answerCallback(cbId, '❗ Dosya adı mesajda bulunamadı.');
    return res.status(200).json({ ok: true });
  }

  const filename = match[1].trim();

  // Telegram callback'e 10 saniye içinde yanıt verilmeli — GitHub işlemleri öncesinde bildir.
  if (action === 'approve') {
    await answerCallback(cbId, '⏳ Yayınlanıyor...');
  } else if (action === 'reject') {
    await answerCallback(cbId, '⏳ Siliniyor...');
  } else {
    return res.status(200).json({ ok: true });
  }

  try {
    if (action === 'approve') {
      await approveDraft(filename);
      await editMessage(
        message.chat.id,
        message.message_id,
        `✅ *Yayınlandı*\n\n${message.text}`,
      );
    } else {
      await rejectDraft(filename);
      await editMessage(
        message.chat.id,
        message.message_id,
        `❌ *Reddedildi*\n\n${message.text}`,
      );
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[webhook] hata:', msg);
    await tgCall('sendMessage', {
      chat_id: message.chat.id,
      text: `❗ *Hata:* ${msg.slice(0, 200)}`,
      parse_mode: 'Markdown',
    });
  }

  return res.status(200).json({ ok: true });
}
