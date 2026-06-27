import { cookies } from 'next/headers';
import { parseLang, LANG_COOKIE, type Lang } from './lang';

export async function getServerLang(): Promise<Lang> {
  const cookieStore = await cookies();
  return parseLang(cookieStore.get(LANG_COOKIE)?.value);
}
