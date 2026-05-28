/*
 * 検索補助機能のためのハードコーディング
 */
export type PopularFeed = {
  name: string;
  keywords: string[]; // 検索に引っかけるための表記ゆれ
  url: string; // 実際のRSSフィードのURL
};

export const popularFeeds: PopularFeed[] = [
  {
    name: 'Zenn',
    keywords: ['zen', 'zenn', 'ぜん', 'ゼン'],
    url: 'https://zenn.dev/feed'
  },
  {
    name: 'Qiita',
    keywords: ['qiita', 'きいた', 'きーた', 'キータ'],
    url: 'https://qiita.com/popular-items/feed'
  },
  {
    name: 'note (IT/テクノロジー)',
    keywords: ['note', 'のーと', 'ノート'],
    url: 'https://note.com/topic/tech/rss'
  },
  {
    name: 'はてなブックマーク (IT)',
    keywords: ['hatena', 'はてな', 'ハテナ', 'はてぶ', 'b!'],
    url: 'https://b.hatena.ne.jp/hotentry/it.rss'
  },
  {
    name: 'ITmedia',
    keywords: ['itmedia', 'アイティメディア', 'あいてぃめでぃあ'],
    url: 'https://rss.itmedia.co.jp/rss/2.0/itmedia_all.xml'
  }
  // 必要に応じて後から追加していける
];
