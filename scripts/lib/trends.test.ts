import { describe, it, expect } from 'vitest';
import { parseFeed } from './trends';

const RSS = `<?xml version="1.0"?>
<rss version="2.0"><channel>
  <item>
    <title><![CDATA[New AI tool for Shopify sellers]]></title>
    <link>https://example.com/a</link>
    <description><![CDATA[<p>A new <b>generative AI</b> assistant.</p>]]></description>
    <pubDate>Fri, 13 Jun 2026 10:00:00 GMT</pubDate>
  </item>
  <item>
    <title>Etsy launches chatbot</title>
    <link>https://example.com/b</link>
    <description>Customer support news &amp; more</description>
    <pubDate>Thu, 12 Jun 2026 09:00:00 GMT</pubDate>
  </item>
</channel></rss>`;

const ATOM = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <entry>
    <title>Amazon seller AI update</title>
    <link href="https://example.com/c" rel="alternate"/>
    <summary>Some summary text</summary>
    <published>2026-06-11T08:00:00Z</published>
  </entry>
</feed>`;

describe('parseFeed (RSS)', () => {
  it('item başlık, link, özet ve tarihi çıkarır', () => {
    const out = parseFeed(RSS, 'src-rss');
    expect(out.length).toBe(2);
    expect(out[0].baslik).toBe('New AI tool for Shopify sellers');
    expect(out[0].link).toBe('https://example.com/a');
    expect(out[0].ozet).toContain('generative AI');
    expect(out[0].ozet).not.toContain('<');
    expect(out[0].yayinTarihi).toBe('2026-06-13T10:00:00.000Z');
    expect(out[0].kaynak).toBe('src-rss');
  });

  it('HTML varlıklarını çözer', () => {
    const out = parseFeed(RSS, 'src-rss');
    expect(out[1].ozet).toBe('Customer support news & more');
  });
});

describe('parseFeed (Atom)', () => {
  it('entry ve href link biçimini destekler', () => {
    const out = parseFeed(ATOM, 'src-atom');
    expect(out.length).toBe(1);
    expect(out[0].baslik).toBe('Amazon seller AI update');
    expect(out[0].link).toBe('https://example.com/c');
    expect(out[0].yayinTarihi).toBe('2026-06-11T08:00:00.000Z');
  });
});
