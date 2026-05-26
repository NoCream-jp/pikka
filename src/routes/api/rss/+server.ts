// import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
// import Parser from 'rss-parser';

// // RSSパーサーの初期化
// const parser = new Parser();

// // GETリクエストを受け取る関数
// export const GET: RequestHandler = async ({ url }) => {
//   // アクセスされたURLから `?url=...` の部分を抜き出す
//   const feedUrl = url.searchParams.get('url');

//   if (!feedUrl) {
//     return json({ error: 'URLが指定されていません' }, { status: 400 });
//   }

//   try {
//     // 指定されたURLのRSSを取得してパース（解析）する
//     const feed = await parser.parseURL(feedUrl);

//     // サイトのタイトルと、記事一覧（items）をフロントエンドに返す
//     return json({
//       title: feed.title,
//       items: feed.items
//     });
//   } catch (error) {
//     console.error('RSSパースエラー:', error);
//     return json({ error: 'RSSフィードの取得に失敗しました' }, { status: 500 });
//   }
// };

import { json } from '@sveltejs/kit';
import Parser from 'rss-parser';

const parser = new Parser({
  // 通常のパースでは無視されがちなカスタムタグを明示的に取得する設定
  customFields: {
    item: [
      ['media:content', 'mediaContent', { keepArray: true }],
      ['enclosure', 'enclosure']
    ]
  }
});

export const GET: RequestHandler = async ({ url }) => {
  const feedUrl = url.searchParams.get('url');

  if (!feedUrl) {
    return json({ error: 'URLが指定されていません' }, { status: 400 });
  }

  try {
    const feed = await parser.parseURL(feedUrl);

    // 各記事のデータからサムネイルURLを抽出する
    const items = (feed.items || []).map((item: any) => {
      let thumbnailUrl = '';

      // 1. <media:content url="..."> タグから取得を試みる
      if (item.mediaContent && item.mediaContent[0] && item.mediaContent[0].$) {
        thumbnailUrl = item.mediaContent[0].$.url;
      }
      // 2. <enclosure url="..."> タグから取得を試みる
      else if (item.enclosure && item.enclosure.url) {
        thumbnailUrl = item.enclosure.url;
      }
      // 3. 本文（contentやdescription）の中に <img> タグがあれば、その src を抽出する
      else {
        const content = item.content || item.summary || '';
        const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
        if (imgMatch && imgMatch[1]) {
          thumbnailUrl = imgMatch[1];
        }
      }

      return {
        ...item,
        thumbnailUrl: thumbnailUrl // 💡 抽出したサムネイルURLを付与
      };
    });

    return json({
      title: feed.title,
      items: items
    });
  } catch (error) {
    console.error('RSSパースエラー:', error);
    return json({ error: 'RSSフィードの取得に失敗しました' }, { status: 500 });
  }
};
