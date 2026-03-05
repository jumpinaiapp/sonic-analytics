import "./globals.css";   // ← 加這行

export const metadata = {
  title: "Jump In Analytics",
  description: "以 JMP 完成統計代寫與資料產品落地",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}