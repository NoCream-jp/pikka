export type PopularFeed = {
  name: string;
  keywords: string[];
  url: string;
};

export const popularFeeds: PopularFeed[] = [
  // ==========================================
  // 📰 総合ITニュース・メディア
  // ==========================================
  {
    name: 'Publickey',
    keywords: ['publickey', 'パブリックキー', 'クラウド'],
    url: 'https://www.publickey1.jp/atom.xml'
  },
  {
    name: 'ITmedia NEWS',
    keywords: ['itmedia', 'アイティメディア', 'ニュース'],
    url: 'https://rss.itmedia.co.jp/rss/2.0/news_bursts.xml'
  },
  {
    name: 'ITmedia エンタープライズ',
    keywords: ['itmedia enterprise', 'エンタープライズ'],
    url: 'https://rss.itmedia.co.jp/rss/2.0/enterprise.xml'
  },
  {
    name: 'GIGAZINE',
    keywords: ['gigazine', 'ギガジン'],
    url: 'https://gigazine.net/news/rss_2.0/'
  },
  {
    name: 'TechCrunch Japan',
    keywords: ['techcrunch', 'テッククランチ', 'スタートアップ'],
    url: 'https://techcrunch.com/feed/'
  },
  {
    name: 'WIRED.jp',
    keywords: ['wired', 'ワイアード', 'テクノロジー'],
    url: 'https://wired.jp/feed/rss/'
  },
  {
    name: 'CNET Japan',
    keywords: ['cnet', 'シーネット'],
    url: 'http://feeds.japan.cnet.com/rss/cnet/all.rdf'
  },
  { name: 'ASCII.jp', keywords: ['ascii', 'アスキー'], url: 'http://ascii.jp/macmac/rss.xml' },
  {
    name: '窓の杜',
    keywords: ['窓の杜', 'まどのもり', 'ソフトウェア'],
    url: 'https://forest.watch.impress.co.jp/data/rss/1.0/wf/feed.rdf'
  },
  {
    name: 'PC Watch',
    keywords: ['pc watch', 'ピーシーウォッチ', 'ハードウェア'],
    url: 'https://pc.watch.impress.co.jp/data/rss/1.0/pcw/feed.rdf'
  },
  {
    name: 'ケータイ Watch',
    keywords: ['ケータイ watch', 'スマホ', 'モバイル'],
    url: 'https://k-tai.watch.impress.co.jp/data/rss/1.0/ktw/feed.rdf'
  },
  {
    name: 'INTERNET Watch',
    keywords: ['internet watch', 'インターネット', 'ネットワーク'],
    url: 'https://internet.watch.impress.co.jp/data/rss/1.0/iw/feed.rdf'
  },
  {
    name: 'CodeZine',
    keywords: ['codezine', 'コードジン', 'プログラミング'],
    url: 'https://codezine.jp/rss/new/20/index.xml'
  },
  {
    name: 'EnterpriseZine',
    keywords: ['enterprisezine', 'エンタープライズジン'],
    url: 'https://enterprisezine.jp/rss/new/20/index.xml'
  },
  {
    name: 'InfoQ Japan',
    keywords: ['infoq', 'インフォキュー', 'アーキテクチャ'],
    url: 'https://www.infoq.com/jp/feed'
  },

  // ==========================================
  // 🏢 企業テックブログ（エンジニアリングブログ）
  // ==========================================
  {
    name: 'DevelopersIO (クラスメソッド)',
    keywords: ['developersio', 'クラスメソッド', 'aws'],
    url: 'https://dev.classmethod.jp/feed/'
  },
  {
    name: 'Mercari Engineering Blog',
    keywords: ['mercari', 'メルカリ', 'テックブログ'],
    url: 'https://engineering.mercari.com/blog/feed.xml'
  },
  {
    name: 'LINE ENGINEERING',
    keywords: ['line', 'ライン', 'テックブログ'],
    url: 'https://engineering.linecorp.com/ja/feed/'
  },
  {
    name: 'CyberAgent Developer Blog',
    keywords: ['cyberagent', 'サイバーエージェント'],
    url: 'https://developers.cyberagent.co.jp/blog/feed/'
  },
  {
    name: 'DeNA Engineering',
    keywords: ['dena', 'ディーエヌエー'],
    url: 'https://engineering.dena.com/blog/index.xml'
  },
  {
    name: 'Cookpad Tech Life',
    keywords: ['cookpad', 'クックパッド', 'ruby'],
    url: 'https://techlife.cookpad.com/feed'
  },
  {
    name: 'Yahoo! JAPAN Tech Blog',
    keywords: ['yahoo', 'ヤフー', 'テックブログ'],
    url: 'https://techblog.yahoo.co.jp/index.xml'
  },
  {
    name: '楽天 Tech Blog',
    keywords: ['rakuten', '楽天', 'テックブログ'],
    url: 'https://techblog.rakuten.co.jp/feed'
  },
  {
    name: 'SmartHR Tech Blog',
    keywords: ['smarthr', 'スマートエイチアール'],
    url: 'https://tech.smarthr.jp/feed'
  },
  {
    name: 'Money Forward Engineers',
    keywords: ['money forward', 'マネーフォワード'],
    url: 'https://moneyforward-dev.jp/feed'
  },
  {
    name: 'freee Developers Hub',
    keywords: ['freee', 'フリー', 'テックブログ'],
    url: 'https://developers.freee.co.jp/feed'
  },
  {
    name: 'ZOZO TECH BLOG',
    keywords: ['zozo', 'ゾゾ', 'テックブログ'],
    url: 'https://techblog.zozo.com/feed'
  },
  {
    name: 'GREE Engineering',
    keywords: ['gree', 'グリー'],
    url: 'https://labs.gree.jp/blog/feed/'
  },
  {
    name: 'はてな開発ブログ',
    keywords: ['hatena', 'はてな', 'テックブログ'],
    url: 'https://developer.hatenastaff.com/feed'
  },
  {
    name: 'Cybozu Inside Out',
    keywords: ['cybozu', 'サイボウズ'],
    url: 'https://blog.cybozu.io/feed'
  },
  {
    name: 'Wantedly Engineering',
    keywords: ['wantedly', 'ウォンテッドリー'],
    url: 'https://www.wantedly.com/companies/wantedly/post_articles/rss.xml'
  },
  { name: 'Zenn 開発ブログ', keywords: ['zenn 開発', '公式'], url: 'https://zenn.dev/zenn/feed' },
  {
    name: 'Supabase 公式ブログ',
    keywords: ['supabase', 'スパベース', 'baas'],
    url: 'https://supabase.com/rss.xml'
  },

  // ==========================================
  // 🛡️ セキュリティ・インフラ・クラウド
  // ==========================================
  {
    name: 'JPCERT/CC 注意喚起',
    keywords: ['jpcert', 'セキュリティ', '注意喚起'],
    url: 'https://www.jpcert.or.jp/rss/jpcert.rdf'
  },
  {
    name: 'Security NEXT',
    keywords: ['security next', 'セキュリティネクスト', '脆弱性'],
    url: 'https://www.security-next.com/feed'
  },
  {
    name: 'ScanNetSecurity',
    keywords: ['scannetsecurity', 'スキャンネットセキュリティ'],
    url: 'https://scan.netsecurity.ne.jp/rss/index.rdf'
  },
  {
    name: 'AWS News Blog (日本語)',
    keywords: ['aws', 'amazon web services', 'クラウド'],
    url: 'https://aws.amazon.com/jp/blogs/news/feed/'
  },
  {
    name: 'Google Cloud Blog (日本語)',
    keywords: ['gcp', 'google cloud', 'クラウド'],
    url: 'https://cloudblog.withgoogle.com/ja/rss/'
  },
  {
    name: 'Microsoft Azure Blog',
    keywords: ['azure', 'microsoft', 'クラウド'],
    url: 'https://azure.microsoft.com/ja-jp/blog/feed/'
  },
  {
    name: 'Cloudflare Blog',
    keywords: ['cloudflare', 'クラウドフレア', 'cdn'],
    url: 'https://blog.cloudflare.com/rss/'
  },
  {
    name: 'Docker Blog',
    keywords: ['docker', 'ドッカー', 'コンテナ'],
    url: 'https://www.docker.com/blog/feed/'
  },

  // ==========================================
  // 🎨 Webフロントエンド・デザイン
  // ==========================================
  {
    name: 'コリス',
    keywords: ['coliss', 'コリス', 'デザイン', 'css', 'html'],
    url: 'https://coliss.com/feed/'
  },
  {
    name: 'LIGブログ (Web制作)',
    keywords: ['lig', 'リグ', 'web制作', 'デザイン'],
    url: 'https://liginc.co.jp/web/feed'
  },
  {
    name: 'ICS MEDIA',
    keywords: ['ics media', 'フロントエンド', 'webgl'],
    url: 'https://ics.media/feed/'
  },
  {
    name: 'Webクリエイターボックス',
    keywords: ['webクリエイターボックス', 'webデザイン'],
    url: 'https://www.webcreatorbox.com/feed'
  },
  {
    name: 'Smashing Magazine',
    keywords: ['smashing magazine', 'フロントエンド', 'ui'],
    url: 'https://www.smashingmagazine.com/feed/'
  },
  {
    name: 'CSS-Tricks',
    keywords: ['css-tricks', 'css', 'フロントエンド'],
    url: 'https://css-tricks.com/feed/'
  },

  // ==========================================
  // 📚 Zenn トピック別フィード (トレンド技術)
  // ==========================================
  {
    name: 'Zenn (Svelte)',
    keywords: ['zenn', 'svelte', 'スベルト', 'フロントエンド'],
    url: 'https://zenn.dev/topics/svelte/feed'
  },
  {
    name: 'Zenn (Astro)',
    keywords: ['zenn', 'astro', 'アストロ', 'ssg'],
    url: 'https://zenn.dev/topics/astro/feed'
  },
  {
    name: 'Zenn (Tailwind CSS)',
    keywords: ['zenn', 'tailwind', 'テイルウィンド', 'css'],
    url: 'https://zenn.dev/topics/tailwindcss/feed'
  },
  {
    name: 'Zenn (Bun)',
    keywords: ['zenn', 'bun', 'バン', 'javascript'],
    url: 'https://zenn.dev/topics/bun/feed'
  },
  {
    name: 'Zenn (Supabase)',
    keywords: ['zenn', 'supabase', 'baas', 'データベース'],
    url: 'https://zenn.dev/topics/supabase/feed'
  },
  {
    name: 'Zenn (React)',
    keywords: ['zenn', 'react', 'リアクト'],
    url: 'https://zenn.dev/topics/react/feed'
  },
  {
    name: 'Zenn (Next.js)',
    keywords: ['zenn', 'next.js', 'nextjs'],
    url: 'https://zenn.dev/topics/nextjs/feed'
  },
  {
    name: 'Zenn (TypeScript)',
    keywords: ['zenn', 'typescript', 'ts'],
    url: 'https://zenn.dev/topics/typescript/feed'
  },
  {
    name: 'Zenn (Python)',
    keywords: ['zenn', 'python', 'パイソン'],
    url: 'https://zenn.dev/topics/python/feed'
  },
  { name: 'Zenn (Go)', keywords: ['zenn', 'go', 'golang'], url: 'https://zenn.dev/topics/go/feed' },
  {
    name: 'Zenn (Rust)',
    keywords: ['zenn', 'rust', 'ラスト'],
    url: 'https://zenn.dev/topics/rust/feed'
  },
  {
    name: 'Zenn (競技プログラミング)',
    keywords: ['zenn', '競技プログラミング', '競プロ', 'atcoder'],
    url: 'https://zenn.dev/topics/競技プログラミング/feed'
  },
  {
    name: 'Zenn (AtCoder)',
    keywords: ['zenn', 'atcoder', 'アットコーダー'],
    url: 'https://zenn.dev/topics/atcoder/feed'
  },
  {
    name: 'Zenn (強化学習)',
    keywords: ['zenn', '強化学習', '機械学習', 'rl'],
    url: 'https://zenn.dev/topics/強化学習/feed'
  },
  {
    name: 'Zenn (機械学習)',
    keywords: ['zenn', '機械学習', 'machine learning', 'ai'],
    url: 'https://zenn.dev/topics/機械学習/feed'
  },
  {
    name: 'Zenn (情報処理安全確保支援士)',
    keywords: ['zenn', '情報処理安全確保支援士', 'sc', 'ipa', 'セキュリティ'],
    url: 'https://zenn.dev/topics/情報処理安全確保支援士/feed'
  },
  {
    name: 'Zenn (GitHub)',
    keywords: ['zenn', 'github', 'git'],
    url: 'https://zenn.dev/topics/github/feed'
  },
  {
    name: 'Zenn (Docker)',
    keywords: ['zenn', 'docker', 'コンテナ'],
    url: 'https://zenn.dev/topics/docker/feed'
  },

  // ==========================================
  // 📚 Qiita タグ別フィード
  // ==========================================
  {
    name: 'Qiita (競技プログラミング)',
    keywords: ['qiita', '競技プログラミング', '競プロ'],
    url: 'https://qiita.com/tags/競技プログラミング/feed'
  },
  {
    name: 'Qiita (AtCoder)',
    keywords: ['qiita', 'atcoder', 'アットコーダー'],
    url: 'https://qiita.com/tags/atcoder/feed'
  },
  {
    name: 'Qiita (Python)',
    keywords: ['qiita', 'python', 'パイソン'],
    url: 'https://qiita.com/tags/python/feed'
  },
  {
    name: 'Qiita (JavaScript)',
    keywords: ['qiita', 'javascript', 'js'],
    url: 'https://qiita.com/tags/javascript/feed'
  },
  {
    name: 'Qiita (AWS)',
    keywords: ['qiita', 'aws', 'クラウド'],
    url: 'https://qiita.com/tags/aws/feed'
  },
  {
    name: 'Qiita (Docker)',
    keywords: ['qiita', 'docker', 'ドッカー'],
    url: 'https://qiita.com/tags/docker/feed'
  },
  {
    name: 'Qiita (強化学習)',
    keywords: ['qiita', '強化学習', 'ai'],
    url: 'https://qiita.com/tags/強化学習/feed'
  },
  {
    name: 'Qiita (セキュリティ)',
    keywords: ['qiita', 'セキュリティ', 'security'],
    url: 'https://qiita.com/tags/セキュリティ/feed'
  },

  // ==========================================
  // 📚 note トピック別フィード
  // ==========================================
  {
    name: 'note (テクノロジー)',
    keywords: ['note', 'テクノロジー', 'tech'],
    url: 'https://note.com/topic/tech/rss'
  },
  {
    name: 'note (プログラミング)',
    keywords: ['note', 'プログラミング', '開発'],
    url: 'https://note.com/hashtag/プログラミング/rss'
  },
  {
    name: 'note (エンジニア)',
    keywords: ['note', 'エンジニア', 'キャリア'],
    url: 'https://note.com/hashtag/エンジニア/rss'
  },

  // ==========================================
  // 🔖 はてなブックマーク ホットエントリ
  // ==========================================
  {
    name: 'はてなブックマーク (IT総合)',
    keywords: ['hatena', 'はてブ', 'it'],
    url: 'https://b.hatena.ne.jp/hotentry/it.rss'
  },
  {
    name: 'はてなブックマーク (プログラミング)',
    keywords: ['hatena', 'はてブ', 'プログラミング'],
    url: 'https://b.hatena.ne.jp/hotentry/it/programming.rss'
  },
  {
    name: 'はてなブックマーク (テクノロジー)',
    keywords: ['hatena', 'はてブ', 'テクノロジー'],
    url: 'https://b.hatena.ne.jp/hotentry/it/technology.rss'
  },
  {
    name: 'はてなブックマーク (セキュリティ)',
    keywords: ['hatena', 'はてブ', 'セキュリティ'],
    url: 'https://b.hatena.ne.jp/hotentry/it/security.rss'
  }
];
