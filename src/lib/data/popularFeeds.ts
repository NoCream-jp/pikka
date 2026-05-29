export type PopularFeed = {
    name: string;
    keywords: string[];
    url: string;
  };
  
  export const popularFeeds: PopularFeed[] = [
    // ==========================================
    // 📰 総合ITニュース・ポータル
    // ==========================================
    { name: 'Publickey', keywords: ['publickey', 'パブリックキー'], url: 'https://www.publickey1.jp/atom.xml' },
    { name: 'ITmedia NEWS', keywords: ['itmedia', 'ニュース'], url: 'https://rss.itmedia.co.jp/rss/2.0/news_bursts.xml' },
    { name: 'GIGAZINE', keywords: ['gigazine', 'ギガジン'], url: 'https://gigazine.net/news/rss_2.0/' },
    { name: 'TechCrunch', keywords: ['techcrunch', 'テッククランチ'], url: 'https://techcrunch.com/feed/' },
    { name: 'WIRED.jp', keywords: ['wired', 'ワイアード'], url: 'https://wired.jp/feed/rss/' },
    { name: 'CNET Japan', keywords: ['cnet', 'シーネット'], url: 'http://feeds.japan.cnet.com/rss/cnet/all.rdf' },
    { name: 'ASCII.jp', keywords: ['ascii', 'アスキー'], url: 'http://ascii.jp/macmac/rss.xml' },
    { name: '窓の杜', keywords: ['窓の杜', 'まどのもり'], url: 'https://forest.watch.impress.co.jp/data/rss/1.0/wf/feed.rdf' },
    { name: 'PC Watch', keywords: ['pc watch', 'ハードウェア'], url: 'https://pc.watch.impress.co.jp/data/rss/1.0/pcw/feed.rdf' },
    { name: 'CodeZine', keywords: ['codezine', 'プログラミング'], url: 'https://codezine.jp/rss/new/20/index.xml' },
    { name: 'InfoQ Japan', keywords: ['infoq', 'アーキテクチャ'], url: 'https://www.infoq.com/jp/feed' },
    { name: 'Hacker News', keywords: ['hacker news', 'ycombinator'], url: 'https://news.ycombinator.com/rss' },
    { name: 'DEV Community', keywords: ['dev.to', 'devcommunity'], url: 'https://dev.to/feed' },
    { name: 'The Verge (Tech)', keywords: ['the verge', 'バージ'], url: 'https://www.theverge.com/rss/index.xml' },
  
    // ==========================================
    // 🏢 国内メガベンチャー・Web系 テックブログ
    // ==========================================
    { name: 'メルカリエンジニアリングブログ', keywords: ['mercari', 'メルカリ'], url: 'https://engineering.mercari.com/blog/feed.xml' },
    { name: 'LINE ENGINEERING', keywords: ['line', 'ライン'], url: 'https://engineering.linecorp.com/ja/feed/' },
    { name: 'CyberAgent Developer Blog', keywords: ['cyberagent', 'サイバーエージェント'], url: 'https://developers.cyberagent.co.jp/blog/feed/' },
    { name: 'DeNA Engineering', keywords: ['dena', 'ディーエヌエー'], url: 'https://engineering.dena.com/blog/index.xml' },
    { name: 'Cookpad Tech Life', keywords: ['cookpad', 'クックパッド'], url: 'https://techlife.cookpad.com/feed' },
    { name: 'Yahoo! JAPAN Tech Blog', keywords: ['yahoo', 'ヤフー'], url: 'https://techblog.yahoo.co.jp/index.xml' },
    { name: '楽天 Tech Blog', keywords: ['rakuten', '楽天'], url: 'https://techblog.rakuten.co.jp/feed' },
    { name: 'SmartHR Tech Blog', keywords: ['smarthr', 'スマートエイチアール'], url: 'https://tech.smarthr.jp/feed' },
    { name: 'マネーフォワード エンジニアブログ', keywords: ['money forward', 'マネーフォワード'], url: 'https://moneyforward-dev.jp/feed' },
    { name: 'freee Developers Hub', keywords: ['freee', 'フリー'], url: 'https://developers.freee.co.jp/feed' },
    { name: 'ZOZO TECH BLOG', keywords: ['zozo', 'ゾゾ'], url: 'https://techblog.zozo.com/feed' },
    { name: 'GREE Engineering', keywords: ['gree', 'グリー'], url: 'https://labs.gree.jp/blog/feed/' },
    { name: 'はてな開発ブログ', keywords: ['hatena', 'はてな'], url: 'https://developer.hatenastaff.com/feed' },
    { name: 'Cybozu Inside Out', keywords: ['cybozu', 'サイボウズ'], url: 'https://blog.cybozu.io/feed' },
    { name: 'Wantedly Engineering', keywords: ['wantedly', 'ウォンテッドリー'], url: 'https://www.wantedly.com/companies/wantedly/post_articles/rss.xml' },
    { name: 'MIXI DEVELOPERS', keywords: ['mixi', 'ミクシィ'], url: 'https://mixi-developers.mixi.co.jp/feed' },
    { name: 'U-NEXT Tech Blog', keywords: ['u-next', 'ユーネクスト'], url: 'https://tech.unext.co.jp/feed' },
    { name: 'Tier IV Tech Blog', keywords: ['tier iv', 'ティアフォー', '自動運転'], url: 'https://tech.tier4.jp/feed' },
    { name: 'Sansan Builders Box', keywords: ['sansan', 'サンサン'], url: 'https://buildersbox.corp-sansan.com/feed' },
    { name: 'Finatext Tech Blog', keywords: ['finatext', 'フィナテキスト'], url: 'https://techblog.finatext.com/feed' },
    { name: 'Chatwork Creator\'s Note', keywords: ['chatwork', 'チャットワーク'], url: 'https://creators-note.chatwork.com/feed' },
    { name: 'Gunosy Tech Blog', keywords: ['gunosy', 'グノシー'], url: 'https://tech.gunosy.io/feed' },
    { name: 'DMM Inside', keywords: ['dmm', 'ディーエムエム'], url: 'https://inside.dmm.com/feed' },
    { name: 'Speee DEVELOPER BLOG', keywords: ['speee', 'スピー'], url: 'https://techrocca.speee.jp/feed' },
    { name: 'BASE Developers Blog', keywords: ['base', 'ベイス'], url: 'https://devblog.thebase.in/feed' },
    { name: 'STORES Product Blog', keywords: ['stores', 'ストアーズ'], url: 'https://product.st.inc/feed' },
    { name: 'Helpfeel Tech Blog', keywords: ['helpfeel', 'nota'], url: 'https://tech.helpfeel.com/feed' },
    { name: '10X Product Blog', keywords: ['10x', 'テンエックス'], url: 'https://product.10x.co.jp/feed' },
    { name: 'CADDi Tech Blog', keywords: ['caddi', 'キャディ'], url: 'https://caddi.tech/feed' },
    { name: 'LayerX エンジニアブログ', keywords: ['layerx', 'レイヤーエックス'], url: 'https://tech.layerx.co.jp/feed' },
    { name: 'Visional Engineering', keywords: ['visional', 'ビズリーチ'], url: 'https://engineering.visional.inc/blog/feed' },
    { name: 'PR TIMES 開発者ブログ', keywords: ['pr times', 'prtimes'], url: 'https://developers.prtimes.jp/feed/' },
    { name: 'Goodpatch Blog', keywords: ['goodpatch', 'グッドパッチ'], url: 'https://goodpatch.com/blog/feed' },
    { name: 'LIG ブログ', keywords: ['lig', 'リグ', 'web制作'], url: 'https://liginc.co.jp/feed' },
    { name: 'クラスメソッド DevelopersIO', keywords: ['classmethod', 'クラスメソッド', 'aws'], url: 'https://dev.classmethod.jp/feed/' },
    { name: 'Serverworks Tech Blog', keywords: ['serverworks', 'サーバーワークス'], url: 'https://blog.serverworks.co.jp/feed' },
    { name: '食べログ Tech Blog', keywords: ['tabelog', '食べログ'], url: 'https://tech-blog.tabelog.com/feed' },
    { name: 'くらしのマーケット Tech Blog', keywords: ['minma', 'くらしのマーケット'], url: 'https://tech.minma.jp/feed' },
    { name: 'KAKEHASHI Tech Blog', keywords: ['kakehashi', 'カケハシ'], url: 'https://kakehashi-dev.hatenablog.com/feed' },
  
    // ==========================================
    // 🌍 グローバル企業 テックブログ
    // ==========================================
    { name: 'Netflix TechBlog', keywords: ['netflix', 'ネットフリックス'], url: 'https://netflixtechblog.com/feed' },
    { name: 'Uber Engineering', keywords: ['uber', 'ウーバー'], url: 'https://www.uber.com/en-JP/blog/engineering/rss/' },
    { name: 'Airbnb Engineering', keywords: ['airbnb', 'エアビー'], url: 'https://medium.com/airbnb-engineering/feed' },
    { name: 'Discord Engineering', keywords: ['discord', 'ディスコード'], url: 'https://discord.com/blog/rss.xml' },
    { name: 'Slack Engineering', keywords: ['slack', 'スラック'], url: 'https://slack.engineering/feed/' },
    { name: 'Spotify Engineering', keywords: ['spotify', 'スポティファイ'], url: 'https://engineering.atspotify.com/feed/' },
    { name: 'GitHub Blog', keywords: ['github', 'ギットハブ'], url: 'https://github.blog/feed/' },
    { name: 'GitLab Blog', keywords: ['gitlab', 'ギットラボ'], url: 'https://about.gitlab.com/atom.xml' },
    { name: 'Docker Blog', keywords: ['docker', 'ドッカー'], url: 'https://www.docker.com/blog/feed/' },
    { name: 'AWS News Blog', keywords: ['aws', 'amazon'], url: 'https://aws.amazon.com/jp/blogs/news/feed/' },
    { name: 'Google Cloud Blog', keywords: ['gcp', 'google cloud'], url: 'https://cloudblog.withgoogle.com/ja/rss/' },
    { name: 'Microsoft Azure Blog', keywords: ['azure', 'microsoft'], url: 'https://azure.microsoft.com/ja-jp/blog/feed/' },
    { name: 'Notion Blog', keywords: ['notion', 'ノーション'], url: 'https://www.notion.so/blog/rss.xml' },
  
    // ==========================================
    // 💻 フロントエンド・Web開発・フレームワーク
    // ==========================================
    { name: 'Svelte Blog', keywords: ['svelte', 'スベルト'], url: 'https://svelte.dev/blog/rss.xml' },
    { name: 'Astro Blog', keywords: ['astro', 'アストロ'], url: 'https://astro.build/rss.xml' },
    { name: 'Tailwind CSS Blog', keywords: ['tailwind', 'テイルウィンド'], url: 'https://tailwindcss.com/feeds/feed.xml' },
    { name: 'Bun Blog', keywords: ['bun', 'バン'], url: 'https://bun.sh/rss.xml' },
    { name: 'Supabase Blog', keywords: ['supabase', 'スパベース'], url: 'https://supabase.com/rss.xml' },
    { name: 'Vercel Blog', keywords: ['vercel', 'バーセル'], url: 'https://vercel.com/atom' },
    { name: 'Netlify Blog', keywords: ['netlify', 'ネットリファイ'], url: 'https://www.netlify.com/blog/index.xml' },
    { name: 'Cloudflare Blog', keywords: ['cloudflare', 'クラウドフレア'], url: 'https://blog.cloudflare.com/rss/' },
    { name: 'React Blog', keywords: ['react', 'リアクト'], url: 'https://react.dev/rss.xml' },
    { name: 'Vue.js Blog', keywords: ['vue', 'ビュー'], url: 'https://blog.vuejs.org/feed.rss' },
    { name: 'TypeScript Blog', keywords: ['typescript', 'ts'], url: 'https://devblogs.microsoft.com/typescript/feed/' },
    { name: 'CSS-Tricks', keywords: ['css-tricks', 'css'], url: 'https://css-tricks.com/feed/' },
    { name: 'Smashing Magazine', keywords: ['smashing magazine', 'フロントエンド'], url: 'https://www.smashingmagazine.com/feed/' },
    { name: 'コリス', keywords: ['coliss', 'html', 'css'], url: 'https://coliss.com/feed/' },
    { name: 'ICS MEDIA', keywords: ['ics', 'webgl'], url: 'https://ics.media/feed/' },
  
    // ==========================================
    // 🛡️ セキュリティ関連
    // ==========================================
    { name: 'IPA 情報セキュリティ 重要なセキュリティ情報', keywords: ['ipa', 'セキュリティ', 'sc'], url: 'https://www.ipa.go.jp/security/rss/alert.xml' },
    { name: 'JPCERT/CC 注意喚起', keywords: ['jpcert', 'インシデント'], url: 'https://www.jpcert.or.jp/rss/jpcert.rdf' },
    { name: 'Security NEXT', keywords: ['security next', '脆弱性'], url: 'https://www.security-next.com/feed' },
    { name: 'ScanNetSecurity', keywords: ['scannetsecurity', 'スキャンネット'], url: 'https://scan.netsecurity.ne.jp/rss/index.rdf' },
    { name: 'Flatt Security Blog', keywords: ['flatt security', 'フラットセキュリティ'], url: 'https://blog.flatt.tech/feed' },
    { name: 'Trend Micro Security Blog', keywords: ['trend micro', 'トレンドマイクロ'], url: 'https://blog.trendmicro.co.jp/feed/' },
    { name: 'Kaspersky Daily', keywords: ['kaspersky', 'カスペルスキー'], url: 'https://blog.kaspersky.co.jp/feed/' },
    { name: 'Palo Alto Networks Blog', keywords: ['palo alto', 'パロアルト'], url: 'https://www.paloaltonetworks.jp/company/in-the-news/rss' },
  
    // ==========================================
    // 🤖 AI・機械学習・アルゴリズム・データサイエンス
    // ==========================================
    { name: 'OpenAI Blog', keywords: ['openai', 'chatgpt'], url: 'https://openai.com/blog/rss.xml' },
    { name: 'Google DeepMind Blog', keywords: ['deepmind', 'ディープマインド', '強化学習'], url: 'https://deepmind.google/blog/rss.xml' },
    { name: 'Preferred Networks (PFN)', keywords: ['pfn', '機械学習'], url: 'https://tech.preferred.jp/ja/feed/' },
    { name: 'Berkeley AI Research (BAIR)', keywords: ['bair', '強化学習', 'ai'], url: 'https://bair.berkeley.edu/blog/feed.xml' },
    { name: 'AtCoder Info', keywords: ['atcoder', 'アットコーダー', '競プロ'], url: 'https://atcoder.jp/posts.rss' },
    { name: 'chokudaiのブログ', keywords: ['chokudai', '競技プログラミング'], url: 'https://chokudai.hatenablog.com/feed' },
    { name: 'E869120\'s Blog', keywords: ['e869120', '競プロ', 'アルゴリズム'], url: 'https://e869120.hatenablog.com/feed' },
    { name: 'Kenkooooのブログ', keywords: ['kenkoooo', 'atcoder problems'], url: 'https://kenkoooo.hatenablog.com/feed' },
  
    // ==========================================
    // 🖥️ 言語・インフラ・バックエンド系ツール
    // ==========================================
    { name: 'Rust Blog', keywords: ['rust', 'ラスト'], url: 'https://blog.rust-lang.org/feed.xml' },
    { name: 'The Go Blog', keywords: ['go', 'golang'], url: 'https://go.dev/blog/feed.atom' },
    { name: 'Python Insider', keywords: ['python', 'パイソン'], url: 'https://pythoninsider.blogspot.com/feeds/posts/default' },
    { name: 'Ruby News', keywords: ['ruby', 'ルビー'], url: 'https://www.ruby-lang.org/en/feeds/news.rss' },
    { name: 'PostgreSQL News', keywords: ['postgresql', 'db'], url: 'https://www.postgresql.org/news.rss' },
    { name: 'PlanetScale Blog', keywords: ['planetscale', 'mysql'], url: 'https://planetscale.com/feed' },
    { name: 'HashiCorp Blog', keywords: ['hashicorp', 'terraform'], url: 'https://www.hashicorp.com/blog/feed.xml' },
  
    // ==========================================
    // 📚 CG・コミュニティ系・その他
    // ==========================================
    { name: 'Zenn (総合トレンド)', keywords: ['zenn', 'ぜん'], url: 'https://zenn.dev/feed' },
    { name: 'Qiita (トレンド)', keywords: ['qiita', 'キータ'], url: 'https://qiita.com/popular-items/feed.atom' },
    { name: 'note (テクノロジートレンド)', keywords: ['note', 'ノート'], url: 'https://note.com/topic/tech/rss' },
    { name: 'はてなブックマーク (IT総合)', keywords: ['hatena', 'はてブ', 'it'], url: 'https://b.hatena.ne.jp/hotentry/it.rss' }
  ];