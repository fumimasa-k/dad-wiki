import "./globals.css";
import Header from "@/components/Header";
import Script from "next/script";

export const metadata = {
    title: "Dark and Darker 攻略サイト",
    description: "マップ/クエスト/パッチノートを整理する攻略サイト"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ja">
            <body>
                <Header />
                <div className="container">{children}</div>
            </body>
        </html>
    );
}