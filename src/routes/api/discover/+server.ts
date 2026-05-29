// server側でオートディスカバリー機能
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
  const targetUrl = url.searchParams.get('url');

  if (!targetUrl) {
    return json({ error: 'URLが指定されていません' }, { status: 400 });
  }

  try {
    // 💡 改善1: 強力なブラウザ偽装ヘッダーを追加し、botブロックをすり抜ける
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'ja,en-US;q=0.7,en;q=0.3'
      }
    });

    if (!response.ok) {
      throw new Error(`サイトにアクセスできませんでした (Status: ${response.status})`);
    }

    const html = await response.text();

    // 💡 改善2: まず全ての <link ...> タグを大雑把に抽出する
    const linkTags = html.match(/<link[^>]+>/gi) || [];
    let feedUrl = null;

    // 抽出したlinkタグを1つずつ検証する（属性の順番がバラバラでもOK！）
    for (const tag of linkTags) {
      const isAlternate = /rel=["']alternate["']/i.test(tag);
      const isRssOrAtom = /type=["']application\/(rss\+xml|atom\+xml)["']/i.test(tag);

      // RSSかAtomの条件を満たしていれば、hrefの中身を抜き出す
      if (isAlternate && isRssOrAtom) {
        const hrefMatch = tag.match(/href=["']([^"']+)["']/i);
        if (hrefMatch && hrefMatch[1]) {
          feedUrl = hrefMatch[1];
          break; // 1つ見つかったらそこで探索終了
        }
      }
    }

    if (feedUrl) {
      // 💡 改善3: 相対パスの解決をより堅牢に（URLオブジェクトを使う）
      try {
        // httpから始まっていない（/feed などの）場合、元のURLと結合して絶対URLにする
        feedUrl = new URL(feedUrl, targetUrl).href;
      } catch (e) {
        console.error('URLの変換に失敗しました:', feedUrl);
      }

      return json({ feedUrl });
    } else {
      return json({ error: 'RSSフィードが見つかりませんでした' }, { status: 404 });
    }
  } catch (err) {
    console.error('Discover API Error:', err);
    return json({ error: '解析中にエラーが発生しました' }, { status: 500 });
  }
};
