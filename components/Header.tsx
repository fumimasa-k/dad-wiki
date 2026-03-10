import Link from "next/link";

export default function Header() {
    return (
        <div style={{ borderBottom: "1px solid var(--border)", background: "rgba(11,13,18,0.6)", backdropFilter: "blur(8px)" }}>
            <div className="container" style={{ display: "flex", gap: 16, alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
                    <Link href="/" style={{ fontWeight: 800, fontSize: 16 }}>
                        DaD Wiki
                    </Link>
                    <span className="muted" style={{ fontSize: 12 }}>日本語版</span>
                </div>

                <nav style={{ display: "flex", gap: 14, fontSize: 14 }}>
                    <Link href="/maps">マップ</Link>
{/*
                    <Link href="/quests">クエスト</Link>
*/}
                    <Link href="/patch-notes">パッチノート</Link>
                </nav>
            </div>
        </div>
    );
}