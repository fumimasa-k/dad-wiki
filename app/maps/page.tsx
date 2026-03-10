import Link from "next/link";
import { getAllMaps } from "@/lib/maps";

export const metadata = { title: "マップ一覧 | DaD Wiki" };

export default function MapsPage() {
    const maps = getAllMaps();

    return (
        <div className="grid" style={{ gap: 16 }}>
            <div className="card">
                <h1 className="h1">マップ</h1>
                <p className="muted">画像 + 地点データ（座標）で管理する想定です。</p>
            </div>

            <div className="grid" style={{ gap: 12 }}>
                {maps.map((m) => (
                    <div className="card" key={m.slug}>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                            <div>
                                <Link href={`/maps/${m.slug}`} style={{ fontWeight: 700 }}>
                                    {m.name}
                                </Link>
                                <div className="muted" style={{ fontSize: 12 }}>
                                    最終確認: {m.lastVerified ?? "—"}
                                </div>
                            </div>
                            <div className="muted" style={{ fontSize: 12 }}>
                                slug: {m.slug}
                            </div>
                        </div>
                        {m.description ? <p className="muted">{m.description}</p> : null}
                    </div>
                ))}
            </div>
        </div>
    );
}