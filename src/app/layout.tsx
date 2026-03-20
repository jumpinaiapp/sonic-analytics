import type { Metadata } from "next";
import { Noto_Sans_TC } from "next/font/google";
import "./globals.css";

// 引入思源黑體 (Noto Sans TC) 以提升繁體中文閱讀體驗
const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  // 1. 網頁標題：將 "JMP" 移到最前方，最大化該關鍵字的搜尋權重
  title: "JMP 匠映分析 | 專業 JSL 代寫、統計建模與自動化顧問服務",
  
  // 2. 網頁描述：維持您精確的客群鎖定
  description: "匠映分析專業提供 JMP 腳本 (JSL) 代寫、MSA 量測系統分析、DOE 實驗設計與自動化報表開發。協助半導體與製造業將數據轉化為決策建議，實現智慧經營與自動化流程。",
  
  // 3. 關鍵字：補上最核心的短尾與長尾關鍵字組合
  keywords: ["JMP", "JMP 匠映", "JMP代寫", "JSL腳本", "MSA分析", "DOE實驗設計", "統計自動化", "匠映分析", "Jump In Analytics", "JMP顧問", "JSL Automation"],

  // 4. 標準網址 (Canonical)：告訴 Google 這是官方唯一的正統網址
  alternates: {
    canonical: "https://www.jmpin.com.tw",
  },

  // 5. Open Graph：優化 LINE, FB, LinkedIn 分享外觀
  openGraph: {
    title: "JMP 匠映分析 - 數據驅動決策的專家",
    description: "專業 JMP (JSL) 統計代寫、自動化報表與製造業數據顧問服務",
    url: "https://www.jmpin.com.tw",
    siteName: "匠映分析 | Jump In Analytics",
    locale: "zh_TW",
    type: "website",
    images: [
      {
        url: "/og-image.jpg", // 請確保 public 資料夾放有一張 1200x630 的圖片
        width: 1200,
        height: 630,
        alt: "JMP 匠映分析 專業統計服務與 JSL 自動化",
      },
    ],
  },

  // 6. Twitter (X) 卡片：若有在社群曝光會有更好的呈現
  twitter: {
    card: "summary_large_image",
    title: "JMP 匠映分析 | JSL 代寫與自動化",
    description: "協助企業將 JMP 數據轉化為即時決策建議",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-Hant" className="scroll-smooth">
      {/* 在 body 套用思源黑體與您原本設定的 Tailwind 樣式 */}
      <body className={`${notoSansTC.className} min-h-screen bg-background text-foreground antialiased selection:bg-blue-100 dark:selection:bg-blue-900`}>
        {children}
      </body>
    </html>
  );
}