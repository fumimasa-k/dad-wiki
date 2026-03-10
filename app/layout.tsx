import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
    title: "Dark and Darker 日本語版 攻略サイト",
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