import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import Parser from 'rss-parser';

// RSSパーサーの初期化
const parser = new Parser();

// GETリクエストを受け取る関数
export const GET: RequestHandler = async ({ url }) => {
  // アクセスされたURLから `?url=...` の部分を抜き出す
  const feedUrl = url.searchParams.get('url');

  if (!feedUrl) {
    return json({ error: 'URLが指定されていません' }, { status: 400 });
  }

  try {
    // 指定されたURLのRSSを取得してパース（解析）する
    const feed = await parser.parseURL(feedUrl);

    // サイトのタイトルと、記事一覧（items）をフロントエンドに返す
    return json({
      title: feed.title,
      items: feed.items
    });
  } catch (error) {
    console.error('RSSパースエラー:', error);
    return json({ error: 'RSSフィードの取得に失敗しました' }, { status: 500 });
  }
};
