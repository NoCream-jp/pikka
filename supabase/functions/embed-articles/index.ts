import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const rawText = await req.text();
    if (!rawText) throw new Error('データが空っぽです');

    let payload;
    try {
      payload = JSON.parse(rawText);
    } catch (e) {
      throw new Error('不正なJSONです');
    }

    const { articles } = payload;
    if (!articles || articles.length === 0) {
      return new Response(JSON.stringify({ success: true, message: '処理する記事がありません' }), {
        headers: corsHeaders
      });
    }

    // Supabaseに最初から内蔵されているネイティブAIを呼び出す！
    // （※VSCode上で Supabase の下に赤い波線が出るかもしれませんが、無視して大丈夫です）
    // @ts-ignore
    const session = new Supabase.ai.Session('gte-small');

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const processedUrls: string[] = [];

    for (const article of articles) {
      if (!article.title) continue;

      try {
        // ネイティブAIで高速にベクトル化
        const embeddingResult = await session.run(article.title, {
          mean_pool: true,
          normalize: true
        });
        // 結果をデータベースが保存できる形式（配列）に変換
        const embeddingArray = Array.from(embeddingResult);

        const { error } = await supabaseAdmin.from('articles').upsert(
          {
            url: article.url,
            title: article.title,
            site_name: article.siteName,
            thumbnail_url: article.thumbnailUrl,
            published_at: new Date(article.publishedAt).toISOString(),
            embedding: embeddingArray
          },
          { onConflict: 'url' }
        );

        if (error) console.error(`DBエラー (${article.url}):`, error.message);
        else processedUrls.push(article.url);
      } catch (e: any) {
        console.error(`ベクトル化エラー (${article.url}):`, e.message);
      }
    }

    return new Response(JSON.stringify({ success: true, processedCount: processedUrls.length }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error('全体エラー:', error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400
    });
  }
});
