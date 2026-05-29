import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ request }) => {
  try {
    const { url } = await request.json();

    if (!url) {
      return json({ error: 'URLが指定されていません' }, { status: 400 });
    }

    // Wayback Machineの Save Page Now API を叩く
    // ※保存には数秒〜数十秒かかるため、結果を待たずに（非同期のまま）フロントへ返事をします
    fetch(`https://web.archive.org/save/${url}`, {
      method: 'GET', // Save APIはGETリクエストで動作します
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }).catch((err) => {
      // 失敗してもアプリ自体の動作には影響させない
      console.error('Wayback Machineへの保存依頼に失敗しました:', err);
    });

    // 依頼だけ投げたら、フロントエンドには即座に「成功」を返す（UIを止めないため）
    return json({ success: true, message: 'アーカイブ依頼を送信しました' });
  } catch (error) {
    return json({ error: 'サーバーエラーが発生しました' }, { status: 500 });
  }
};
