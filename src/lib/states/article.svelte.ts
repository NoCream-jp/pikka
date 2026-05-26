// TypeScriptの型定義（データの形を保証します）
export type Article = {
  id: number;
  title: string;
  isBookmarked: boolean;
};

// 状態とロジックをカプセル化したクラス
export class ArticleManager {
  // UIの状態
  activeTab = $state('関連度');
  tabs = ['新着', '関連度', 'おすすめ'];

  // 記事データ（今回はダミーデータ）
  articles = $state<Article[]>([
    {
      id: 1,
      title:
        'PostgreSQLの内部では何が起きているのか？ 高並列環境でのトランザクション分離レベル活用',
      isBookmarked: true
    },
    {
      id: 2,
      title: 'Svelte 5 Runes: Reactivity Reimagined - 状態管理の新しいアプローチ',
      isBookmarked: false
    },
    {
      id: 3,
      title: 'Tailwind CSS v4 がリリース。JITエンジンの進化と新しい設定ファイルについて',
      isBookmarked: true
    },
    {
      id: 4,
      title: 'UI/UXデザインの基本原則：ユーザーを迷わせないマイクロインタラクションの実装',
      isBookmarked: false
    }
  ]);

  // しおりを切り替えるメソッド
  toggleBookmark(id: number) {
    this.articles = this.articles.map((article) =>
      article.id === id ? { ...article, isBookmarked: !article.isBookmarked } : article
    );
  }
}
