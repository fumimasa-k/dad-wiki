import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
    title: "Dark and Darker 攻略サイト（雛形）",
    description: "マップ/クエスト/パッチノートを整理する攻略サイトの雛形"
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