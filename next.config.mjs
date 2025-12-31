/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true // 這行可以保留，不影響部署
  },
  
  // 1. 改成 'export' 以符合 Cloudflare Pages 需求
  output: 'export',

  // 2. 必須加入這段，因為靜態輸出不支援 Next.js 預設的圖片伺服器
  images: {
    unoptimized: true,
  },
};

export default nextConfig;