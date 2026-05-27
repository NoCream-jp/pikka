# 📖 pikka - アプリケーションロジック仕様

「知りたいニュースを、知りたいときに。」をコンセプトにしたRSSリーダーアプリ「pikka」の、システム構成および状態管理ロジックのドキュメントです。
Svelte 5 の最新機能（Runes）と、Supabase を用いたモダンなフルスタック構成を採用しています。

## ⚙️ システム・アーキテクチャ（データフロー）

アプリは以下の3つの層で連携して動作します。

1. **Database 層 (Supabase):** ユーザーが登録した購読先（RSSフィードのURLとサイト名）を永続化。
2. **API 層 (SvelteKit サーバーサイド):** ブラウザのCORS制限を回避し、外部サイトからXML形式のRSSデータを取得・解析（JSON化）してフロントエンドへ渡す中継役。
3. **Client 層 (Svelte 5 `$state`):** データベースの購読リストを元にAPIを並列で叩き、取得した記事群をマージ・ソートして画面に描画。

## 📂 主要なディレクトリ構成と役割

```text
src/
├── lib/
│   ├── components/
│   │   └── ArticleCard.svelte    # 記事1件分のUI（見た目）をカプセル化したコンポーネント
│   ├── states/
│   │   └── article.svelte.ts     # 【中核】記事の取得・ソート・状態管理を担うロジッククラス
│   └── supabaseClient.ts         # Supabaseとの接続設定
├── routes/
│   ├── api/rss/
│   │   └── +server.ts            # CORS回避用・RSSパース代行API（エンドポイント）
│   ├── settings/
│   │   └── +page.svelte          # フィードURLの追加・削除を行う設定画面
│   ├── +layout.svelte            # アプリ全体の共通レイアウト
│   └── +page.svelte              # メイン画面（タブ切り替え・記事リスト表示）
```