export const ENV = {
  api_base_path: process.env.NEXT_PUBLIC_API || 'http://localhost:8000',
  website_base_path: process.env.NEXT_PUBLIC_WEBSITE || 'http://localhost:3000',
  supa_url:process.env.NEXT_PUBLIC_URL_SUPA,
  supa_anon:process.env.NEXT_PUBLIC_ANON_SUPA
};
