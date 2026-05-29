import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import Parser from 'rss-parser';

const parser = new Parser({
  customFields: {
    item: [
      ['media:thumbnail', 'mediaThumbnail'],
      ['media:content', 'mediaContent', { keepArray: true }],
      ['hatena:imageurl', 'hatenaImageUrl'],
      ['content:encoded', 'contentEncoded']
    ]
  }
});

async function fetchOgpImage(url: string): Promise<string> {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (!res.ok) return '';

    const html = await res.text();

    // 正規表現で <meta property="og:image" content="..."> のURL部分を抽出
    const ogImageMatch =
      html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);

    return ogImageMatch ? ogImageMatch[1] : '';
  } catch (error) {
    return '';
  }
}

export const GET: RequestHandler = async ({ url }) => {
  const feedUrl = url.searchParams.get('url');

  if (!feedUrl) return json({ error: 'URLが指定されていません' }, { status: 400 });

  try {
    const feed = await parser.parseURL(feedUrl);
    const items = await Promise.all(
      (feed.items || []).map(async (item: any) => {
        let thumbnailUrl = '';

        if (item.hatenaImageUrl) thumbnailUrl = item.hatenaImageUrl;
        else if (item.mediaThumbnail && item.mediaThumbnail.$ && item.mediaThumbnail.$.url)
          thumbnailUrl = item.mediaThumbnail.$.url;
        else if (typeof item.mediaThumbnail === 'string') thumbnailUrl = item.mediaThumbnail;
        else if (item.mediaContent && item.mediaContent[0] && item.mediaContent[0].$)
          thumbnailUrl = item.mediaContent[0].$.url;
        else if (item.enclosure && item.enclosure.url) {
          const isImage =
            item.enclosure.type?.startsWith('image/') ||
            /\.(jpe?g|png|gif|webp)(\?.*)?$/i.test(item.enclosure.url);
          if (isImage) thumbnailUrl = item.enclosure.url;
        }

        if (!thumbnailUrl) {
          const htmlContent =
            item.contentEncoded || item.content || item.description || item.summary || '';
          const imgMatch = htmlContent.match(/<img[^>]+(?:src|data-src)=["']([^"']+)["']/i);
          if (imgMatch && imgMatch[1]) thumbnailUrl = imgMatch[1];
        }

        if (!thumbnailUrl && item.link) {
          thumbnailUrl = await fetchOgpImage(item.link);
        }

        return {
          ...item,
          thumbnailUrl: thumbnailUrl
        };
      })
    );

    return json({ title: feed.title, items });
  } catch (error) {
    console.error('RSSパースエラー:', error);
    return json({ error: 'RSSフィードの取得に失敗しました' }, { status: 500 });
  }
};
