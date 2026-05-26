import { supabase } from '$lib/supabaseClient';
import type { User } from '@supabase/supabase-js';

class AuthState {
  // ログイン中のユーザー情報（未ログインならnull）
  user = $state<User | null>(null);
  isInitialized = $state(false);

  init() {
    // 初回のセッション取得
    supabase.auth.getSession().then(({ data: { session } }) => {
      this.user = session?.user ?? null;
      this.isInitialized = true;
    });

    // ログイン・ログアウトなどの状態変化を監視して自動アップデート
    supabase.auth.onAuthStateChange((_event, session) => {
      this.user = session?.user ?? null;
    });
  }
}

// どこからでもインポートして使えるようにインスタンス化してエクスポート
export const authManager = new AuthState();
