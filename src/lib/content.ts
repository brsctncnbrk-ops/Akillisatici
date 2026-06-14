import { getCollection, type CollectionEntry } from 'astro:content';

// Yalnızca yayında olan yazıları (editöryel kapı), tarihe göre yeniden eskiye döner.
export async function getYayindaPosts(): Promise<CollectionEntry<'posts'>[]> {
  const posts = await getCollection('posts', ({ data }) => data.durumu === 'yayinda');
  return posts.sort((a, b) => b.data.tarih.getTime() - a.data.tarih.getTime());
}

// Belirli bir kategoriye ait yayında yazılar.
export async function getPostsByKategori(kategoriAd: string): Promise<CollectionEntry<'posts'>[]> {
  const posts = await getYayindaPosts();
  return posts.filter((p) => p.data.kategori === kategoriAd);
}

// Tüm araçları döner.
export async function getTools(): Promise<CollectionEntry<'tools'>[]> {
  const tools = await getCollection('tools');
  return tools.sort((a, b) => a.data.ad.localeCompare(b.data.ad, 'tr'));
}
