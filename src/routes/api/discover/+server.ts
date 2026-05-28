import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
  const targetUrl = url.searchParams.get('url');
  if (!targetUrl) return json({ error: 'URLが必要です' }, { status: 400 });

  try {
    // ユーザーが入力したURLのHTMLを取得する
    const response = await fetch(targetUrl);
    if (!response.ok) throw new Error('サイトにアクセスできませんでした');

    const html = await response.text();

    // HTMLの中から <link rel="alternate" type="application/rss+xml" href="..."> を探す正規表現
    const rssMatch = html.match(
      /<link[^>]*rel=["']alternate["'][^>]*type=["']application\/(rss\+xml|atom\+xml)["'][^>]*href=["']([^"']+)["']/i
    );

    if (rssMatch && rssMatch[2]) {
      let feedUrl = rssMatch[2];
      // もし href="/feed" のような相対パスだった場合、絶対パスに直す
      if (feedUrl.startsWith('/')) {
        const baseUrl = new URL(targetUrl);
        feedUrl = `${baseUrl.origin}${feedUrl}`;
      }
      return json({ feedUrl });
    } else {
      return json({ error: 'RSSフィードが見つかりませんでした' }, { status: 404 });
    }
  } catch (err) {
    return json({ error: '解析エラー' }, { status: 500 });
  }
};
