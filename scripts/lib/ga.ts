// Google Analytics 4 (GA4) Data API erişimi — service-account JWT akışı.
// Ek bağımlılık YOK: OAuth2 imzalama node:crypto ile yapılır.
// notify-traffic.ts (günlük Telegram özeti) ve traffic-report.ts (aralık raporu)
// bu ortak modülü kullanır.

import { createSign } from 'node:crypto';

export interface ServiceAccount {
  client_email: string;
  private_key: string;
}

export interface MetricRow {
  dimensionValues?: { value: string }[];
  metricValues?: { value: string }[];
}

interface RunReportResponse {
  rows?: MetricRow[];
  error?: { message: string };
}

// GA_SERVICE_ACCOUNT_JSON ortam değişkenini güvenle ayrıştırır; geçersizse null.
export function parseServiceAccount(json: string | undefined): ServiceAccount | null {
  if (!json) return null;
  try {
    const sa = JSON.parse(json) as ServiceAccount;
    return sa.client_email && sa.private_key ? sa : null;
  } catch {
    return null;
  }
}

function base64url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

// Service account JWT'sini imzalayıp kısa ömürlü (1 saat) erişim token'ı alır.
export async function getAccessToken(sa: ServiceAccount): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claim = base64url(
    JSON.stringify({
      iss: sa.client_email,
      scope: 'https://www.googleapis.com/auth/analytics.readonly',
      aud: 'https://oauth2.googleapis.com/token',
      iat: now,
      exp: now + 3600,
    }),
  );
  const signingInput = `${header}.${claim}`;
  const signature = createSign('RSA-SHA256').update(signingInput).sign(sa.private_key);
  const jwt = `${signingInput}.${base64url(signature)}`;

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });
  const data = (await res.json()) as { access_token?: string; error_description?: string };
  if (!data.access_token) {
    throw new Error(`OAuth token alınamadı: ${data.error_description ?? 'bilinmeyen hata'}`);
  }
  return data.access_token;
}

// GA4 Data API runReport çağrısı; satır dizisini döndürür (yoksa boş dizi).
export async function runReport(
  propertyId: string,
  token: string,
  body: object,
): Promise<MetricRow[]> {
  const res = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    },
  );
  const data = (await res.json()) as RunReportResponse;
  if (data.error) throw new Error(`GA4 API hatası: ${data.error.message}`);
  return data.rows ?? [];
}
