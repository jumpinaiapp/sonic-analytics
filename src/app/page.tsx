"use client";

import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import {
  BarChart3,
  Code2,
  LineChart,
  Mail,
  Rocket,
  CheckCircle2,
  Brain,
  Box,
  Activity,
} from "lucide-react";

// ----------------------------------
// Data Configuration
// ----------------------------------

type Product = {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  bullets: string[];
  tags: string[];
  cta: string;
  url?: string;
};

const PRODUCTS: Product[] = [
  {
    id: "p1",
    title: "JMP (JSL) 代寫",
    subtitle: "平台自動化與報告產出",
    icon: <Code2 className="w-5 h-5" />,
    bullets: [
      "JSL 腳本 / 應用程式（Application Builder）",
      "資料表處理、欄位屬性、公式（Column Formula）",
      "批次報告：PDF / RTF / HTML 輸出",
    ],
    tags: ["JSL", "代寫"],
    cta: "了解代寫流程",
    url: "/reports/JSLwirt.html",
  },
  {
    id: "p2",
    title: "JMP 互動視覺化",
    subtitle: "Graph Builder / Control Chart",
    icon: <BarChart3 className="w-5 h-5" />,
    bullets: [
      "Graph Builder 儀表板",
      "Control Chart Builder / SPC",
      "Profiler / Local Data Filter",
    ],
    tags: ["視覺化", "SPC"],
    cta: "查看展示",
    url: "/reports/GraphBuilder.html",
  },
  {
    id: "p3",
    title: "量測系統分析 MSA",
    subtitle: "GR&R / 偏差 / 穩定性",
    icon: <Activity className="w-5 h-5" />,
    bullets: ["MSA 平台操作與解讀", "JSL 一鍵重跑與匯出", "與製程 SPC 串接"],
    tags: ["MSA"],
    cta: "索取範例報告",
    url: "/reports/MSA.html",
  },
  {
    id: "p4",
    title: "JMP 預測建模 (Pro)",
    subtitle: "建模到解釋",
    icon: <Brain className="w-5 h-5" />,
    bullets: [
      "Decision Tree / Boosting / Neural",
      "交叉驗證、評估、Profiler",
      "模型部署腳本化",
    ],
    tags: ["建模"],
    cta: "預約技術諮詢",
    url: "/reports/model.html",
  },
  {
    id: "p5",
    title: "資料連線與自動化流程",
    subtitle: "Query → 清理 → 報告",
    icon: <Box className="w-5 h-5" />,
    bullets: [
      "JMP Query Builder / ODBC",
      "批次排程（Windows 排程 + JSL Batch）",
      "Add-in / Project 封裝",
    ],
    tags: ["JSL", "工程"],
    cta: "討論需求",
    url: "/reports/Auto.html",
  },
  {
    id: "p6",
    title: "JMP 教育訓練與顧問",
    subtitle: "量身打造課綱",
    icon: <Rocket className="w-5 h-5" />,
    bullets: [
      "JMP 基礎到進階（Graph / DOE / MSA / SPC）",
      "JSL 腳本實作與最佳化",
      "專題導向教學與內訓認證",
    ],
    tags: ["顧問/訓練"],
    cta: "取得課綱",
    url: "/reports/training.html",
  },
];

const TECH_STACK = [
  "JMP", "JSL", "Graph Builder", "Control Chart Builder", "DOE", "MSA", "SPC", "Prediction Profiler", "Fit Model", "Partition", "Bootstrap", "Application Builder", "Add-in", "JMP Query", "Data Table", "Column Formula", "Project", "Scripting Index",
] as const;

const STEPS = [
  { title: "需求釐清", desc: "30–60 分鐘會談，界定資料、目標與交付物格式。" },
  { title: "規劃提案", desc: "送出時程、里程碑、預算與風險控管，雙方確認。" },
  { title: "開發驗證", desc: "每週短衝 (sprint) 回報，提供可運行的中間成果。" },
  { title: "交付與移轉", desc: "提供文件、原始碼、測試與部署指引，完成驗收。" },
] as const;

const FAQ = [
  { q: "是否能簽保密協定 (NDA)？", a: "可以。我們常態性配合客戶的 NDA 與資訊安全規範。" },
  { q: "費用如何估算？", a: "以需求複雜度與功能數估算，提供固定報價或其長期合作模式。" },
  { q: "交付物包含什麼？", a: "包含可執行的程式碼、說明文件與示範報告，必要時附部署腳本。" },
  { q: "還需其他套件費用嗎？", a: "完全依靠 JMP 自身統計功能為主，輔助用 Python 功能皆使用免費套件。" },
] as const;

const TAGS = ["JSL", "視覺化", "MSA", "DOE", "SPC", "建模", "顧問/訓練"] as const;

// ----------------------------------
// Sub-Components
// ----------------------------------

const Section = ({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) => (
  <section id={id} className="scroll-mt-24 py-16 md:py-24">
    <div className="max-w-6xl mx-auto px-4">
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
        {subtitle && <p className="text-muted-foreground mt-2">{subtitle}</p>}
      </div>
      {children}
    </div>
  </section>
);

function ProductGrid({ items }: { items: Product[] }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((p) => (
        <Card key={p.id} className="rounded-2xl hover:shadow-xl transition-shadow flex flex-col dark:bg-slate-900 dark:border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {p.icon} {p.title}
            </CardTitle>
            <CardDescription>{p.subtitle}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <ul className="text-sm space-y-2 text-muted-foreground list-disc pl-5">
              {p.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.tags?.map((t) => (
                <Badge key={t} variant="outline" className="dark:border-slate-700 dark:text-slate-300">
                  {t}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 pt-4 border-t dark:border-slate-800">
            {p.url ? (
               <a href={p.url} target="_blank" rel="noopener noreferrer" className="w-full">
                 <Button className="w-full bg-[#003366] hover:bg-[#002244] text-white font-bold border-none dark:bg-blue-600 dark:hover:bg-blue-700">
                   {p.cta}
                 </Button>
               </a>
             ) : (
               <Button variant="outline" size="sm" className="w-full dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
                 {p.cta}
               </Button>
             )}
            <a href="#contact" aria-label={`詢問 ${p.title}`} className="w-full">
              <Button size="sm" variant="outline" className="w-full dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">詢問此項</Button>
            </a>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

// ----------------------------------
// Main Site Component
// ----------------------------------

export default function Site() {
  const [keyword, setKeyword] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all");

  // ----------------------------------------------------------------
  // 自動偵測深色模式 (Dark Mode Detection)
  // ----------------------------------------------------------------
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = () => {
      if (mediaQuery.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };
    // 初始化與監聽
    handleThemeChange();
    mediaQuery.addEventListener('change', handleThemeChange);
    return () => mediaQuery.removeEventListener('change', handleThemeChange);
  }, []);

  const tag = activeTab === "all" ? null : activeTab;

  const filtered = useMemo(() => {
    const kw = keyword.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      const matchKw =
        !kw ||
        [p.title, p.subtitle, ...p.bullets, ...(p.tags || [])]
          .join(" ")
          .toLowerCase()
          .includes(kw);
      const matchTag = !tag || p.tags?.includes(tag as any);
      return matchKw && matchTag;
    });
  }, [keyword, tag]);

  return (
    // 外層加入 dark:bg-slate-950 dark:text-slate-50 確保全站黑底白字
    <div className="min-h-screen bg-background text-foreground relative dark:bg-slate-950 dark:text-slate-50 transition-colors duration-300">
      
      <a href="#home" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 dark:text-white">
        跳到主要內容
      </a>

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur bg-background/70 border-b dark:bg-slate-950/70 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="#home" className="font-extrabold tracking-tight text-lg md:text-xl" aria-label="匠映分析 首頁">
            <span className="mr-2 text-[#003366] dark:text-blue-400">匠映分析</span>
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Jump in Future</span>
          </a>
          <nav className="hidden md:flex gap-6 text-sm font-medium" aria-label="主導覽">
            <a href="#about" className="hover:text-[#003366] dark:hover:text-blue-400 transition-colors">公司介紹</a>
            <a href="#products" className="hover:text-[#003366] dark:hover:text-blue-400 transition-colors">產品服務</a>
            <a href="#cases" className="hover:text-[#003366] dark:hover:text-blue-400 transition-colors">案例展示</a>
            <a href="#contact" className="hover:text-[#003366] dark:hover:text-blue-400 transition-colors">聯絡我們</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href="#contact" className="hidden sm:inline-flex">
              <Button size="sm" className="bg-[#003366] text-white dark:bg-blue-600 dark:hover:bg-blue-700">
                <Mail className="w-4 h-4 mr-2" />
                快速洽談
              </Button>
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden bg-slate-50/50 dark:bg-slate-950/50">
        <div className="max-w-6xl mx-auto px-4 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              用 <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">JMP & Python</span> <br />打造可落地的統計解決方案
            </h1>
            <p className="text-muted-foreground mt-4 text-lg">
              資料清理、統計建模、互動儀表板與自動化報告，一站式代寫與顧問服務。
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#products">
                <Button size="lg" className="bg-[#003366] text-white dark:bg-blue-600 dark:hover:bg-blue-700">
                  <Rocket className="w-5 h-5 mr-2" />
                  查看產品/服務
                </Button>
              </a>
              <a href="#contact">
                <Button variant="outline" size="lg" className="border-[#003366] text-[#003366] dark:border-blue-400 dark:text-blue-400 dark:hover:bg-slate-900">
                  取得報價
                </Button>
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {TECH_STACK.map((s) => (
                <Badge key={s} variant="secondary" className="rounded-full bg-white border shadow-sm dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200">
                  {s}
                </Badge>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="rounded-2xl shadow-xl border-t-4 border-t-[#003366] dark:bg-slate-900 dark:border-slate-800 dark:border-t-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="w-5 h-5 text-[#003366] dark:text-blue-400" /> 即時範例：自動化分析
                </CardTitle>
                <CardDescription>模組化流程確保數據正確性</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center mb-4">
                  <div>
                    <div className="text-xl font-bold text-[#003366] dark:text-blue-400">SQL</div>
                    <div className="text-[10px] text-muted-foreground">自動讀取</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-[#003366] dark:text-blue-400">JSL</div>
                    <div className="text-[10px] text-muted-foreground">統計建模</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-[#003366] dark:text-blue-400">HTML</div>
                    <div className="text-[10px] text-muted-foreground">互動報告</div>
                  </div>
                </div>
                <Separator className="my-4 dark:bg-slate-700" />
                <ul className="text-sm space-y-2">
                  {["可延展：原生功能串接", "可維護：模組化程式碼", "可交付：一鍵自動化"].map((txt, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" /> {txt}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <Section id="about" title="公司介紹" subtitle="專注於統計分析與資料工程的實作團隊">
        <div className="grid md:grid-cols-3 gap-6">
          {[
             { title: "專業技術", desc: "以科學方法為基礎，透過 JMP 生態系將模型導入生產流程。", icon: <Code2 /> },
             { title: "業務範圍", desc: "資料清理、統計建模、A/B 測試、MSA、儀表板與自動化報告。", icon: <BarChart3 /> },
             { title: "產業經驗", desc: "熟悉半導體與製造業品質工程 (SPC、DOE)，兼顧效能與落地。", icon: <LineChart /> },
          ].map((item, i) => (
            <Card key={i} className="rounded-2xl border-none shadow-sm bg-slate-50 dark:bg-slate-900/50 dark:border dark:border-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#003366] dark:text-blue-400">
                  {item.icon} {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-6 text-muted-foreground">
                {item.desc}
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Products & services */}
      <Section id="products" title="產品與服務" subtitle="以需求為導向的模組化交付">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v)} className="w-full">
          <TabsList className="flex flex-wrap bg-slate-100 dark:bg-slate-900 p-1">
            <TabsTrigger value="all" onClick={() => setActiveTab("all")} className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800">全部</TabsTrigger>
            {TAGS.map((t) => (
              <TabsTrigger key={t} value={t} onClick={() => setActiveTab(t)} className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800">{t}</TabsTrigger>
            ))}
          </TabsList>
          <div className="mt-4 flex items-center gap-2">
            <Input
              placeholder="關鍵字過濾：例如 MSA、DOE、Graph Builder…"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="dark:bg-slate-900 dark:border-slate-700"
            />
          </div>
          <TabsContent value={activeTab} className="mt-6">
            <ProductGrid items={filtered} />
          </TabsContent>
        </Tabs>
      </Section>

      {/* Cases */}
      <Section id="cases" title="成功案例" subtitle="以可衡量的結果說話">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "製程 UPH 提升 6.8%", sub: "半導體封裝 DOE + 模擬 + 機器學習", desc: "使用標準統計手法找到區域最佳參數解，透過自動化分析報表監控結果。" },
            { title: "減少重複性工作", sub: "作業流程一鍵化", desc: "完全消除手動資料整理與分析，完整客製化符合企業需求。" },
            { title: "檢測時間縮短 40%", sub: "自動化報告 | Machine Log", desc: "將人工彙整流程改為 API 與批次任務，報表生成由 2 小時降至 7 分鐘。" }
          ].map((c, i) => (
            <Card key={i} className="rounded-2xl border-l-4 border-l-[#003366] dark:bg-slate-900 dark:border-slate-800 dark:border-l-blue-500">
              <CardHeader>
                <CardTitle className="text-xl">{c.title}</CardTitle>
                <CardDescription className="text-[#003366] dark:text-blue-400 font-medium">{c.sub}</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {c.desc}
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Process */}
      <Section id="process" title="合作流程" subtitle="透明里程碑，敏捷交付">
        <div className="grid md:grid-cols-4 gap-6">
          {STEPS.map((s, i) => (
            <Card key={i} className="rounded-2xl dark:bg-slate-900 dark:border-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="secondary" className="rounded-full dark:bg-slate-800 dark:text-slate-200">{i + 1}</Badge>
                  {s.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{s.desc}</CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section
        id="contact"
        title="聯絡我們"
        subtitle="目前採 LINE 一對一洽談，如需服務請加好友並留言您的需求"
      >
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* 左側：LINE 卡片 */}
          <Card className="rounded-2xl border-2 border-[#003366]/10 dark:bg-slate-900 dark:border-slate-700">
            <CardHeader>
              <CardTitle>透過 LINE 聯絡匠映分析</CardTitle>
              <CardDescription>加入好友後，請簡單說明您的產業、需求與時程</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                建議先提供：目前使用工具（JMP / Excel / 其他）、資料類型（製程、量測、實驗）、以及希望解決的問題，我們會回覆合適的做法與合作模式。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <a
                  href="https://lin.ee/ngYdJbH"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="透過 LINE 聯絡匠映分析"
                >
                  <img
                    src="https://scdn.line-apps.com/n/line_add_friends/btn/zh-Hant.png"
                    alt="加入匠映分析 LINE 好友"
                    height={36}
                    className="h-[36px] w-auto"
                  />
                </a>
                <img
                  src="/reports/M_gainfriends_2dbarcodes_GW.png"
                  alt="匠映分析 LINE QR Code"
                  className="w-32 h-32 border rounded-md dark:border-slate-600"
                />
              </div>
            </CardContent>
          </Card>

          {/* 右側：FAQ */}
          <div className="space-y-6">
            <Card className="rounded-2xl dark:bg-slate-900 dark:border-slate-800">
              <CardHeader>
                <CardTitle>常見問題</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {FAQ.map((f, i) => (
                    <AccordionItem value={`item-${i}`} key={i} className="dark:border-slate-800">
                      <AccordionTrigger className="text-left dark:text-slate-200">{f.q}</AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground">
                        {f.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t py-12 bg-slate-50 dark:bg-slate-950 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <div className="font-bold text-[#003366] dark:text-blue-400">匠映分析</div>
            <div className="text-xs text-muted-foreground uppercase">Jump in Future</div>
          </div>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} 匠映分析. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}