import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  // 1. 網頁標題：精確鎖定 JMP / JSL 核心關鍵字
  title: "匠映分析 | JMP (JSL) 代寫與統計自動化顧問服務",
  
  // 2. 網頁描述：增加吸引力，鎖定半導體與製造業客群
  description: "專業提供 JMP 腳本 (JSL) 代寫、MSA 量測系統分析、DOE 實驗設計與自動化報表開發。協助半導體與製造業將數據轉化為決策建議，實現智慧經營與自動化流程。",
  
  // 3. 關鍵字：涵蓋所有潛在搜尋詞
  keywords: ["JMP代寫", "JSL腳本", "MSA分析", "DOE實驗設計", "統計自動化", "匠映分析", "Jump In Analytics", "JMP顧問", "JSL Automation"],

  // 4. 標準網址 (Canonical)：告訴 Google 這是官方唯一的正統網址
  alternates: {
    canonical: "https://www.jmpin.com.tw",
  },

  // 5. Open Graph：優化 LINE, FB, LinkedIn 分享外觀
  openGraph: {
    title: "匠映分析 - 數據驅動決策的專家",
    description: "專業 JMP (JSL) 統計代寫、自動化報表與製造業數據顧問服務",
    url: "https://www.jmpin.com.tw",
    siteName: "匠映分析 | Jump In Analytics",
    locale: "zh_TW",
    type: "website",
    images: [
      {
        url: "/og-image.jpg", // 請在 public 資料夾放一張 1200x630 的圖片
        width: 1200,
        height: 630,
        alt: "匠映分析 專業統計服務與 JSL 自動化",
      },
    ],
  },

  // 6. Twitter (X) 卡片：若有在社群曝光會有更好的呈現
  twitter: {
    card: "summary_large_image",
    title: "匠映分析 | JMP (JSL) 代寫與自動化",
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
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-blue-100 dark:selection:bg-blue-900">
        {children}
      </body>
    </html>
  );
}