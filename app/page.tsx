import Image from "next/image";
import Link from "next/link";
import { getAllPatchNotesMeta } from "@/lib/patchNotes";
import { getAllMaps } from "@/lib/maps";

export default function HomePage() {
    const maps = getAllMaps().slice(0, 4);
    const notes = getAllPatchNotesMeta();

    return (
        <div className="grid" style={{ gap: 16 }}>
            <div className="card">
                <h1 className="h1">Dark and Darker 攻略サイト</h1>
                <p className="muted">
                    マップ、パッチノート、クエストなどを整理する日本語攻略サイトです。
                </p>
            </div>

            <div className="card">
                <div className="h2" style={{ marginBottom: 14 }}>
                    マップ選択
                </div>

                <div className="mapCoverGrid">
                    {maps.map((map) => (
                        <Link
                            key={map.slug}
                            href={`/maps/${map.slug}`}
                            className="mapCoverCard"
                        >
                            <div className="mapCoverImageWrap">
                                {map.coverImage ? (
                                    <Image
                                        src={map.coverImage}
                                        alt={map.name}
                                        fill
                                        className="mapCoverImage"
                                    />
                                ) : (
                                    <div className="mapCoverFallback">{map.name}</div>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="card">
                <div className="h2">最新パッチノート</div>
                <ul>
                    {notes.slice(0, 5).map((p) => (
                        <li key={p.slug}>
                            <Link href={`/patch-notes/${p.slug}`}>{p.title}</Link>{" "}
                            <span className="muted" style={{ fontSize: 12 }}>
                                （{p.date}）
                            </span>
                        </li>
                    ))}
                </ul>
                <hr className="sep" />
                <Link href="/patch-notes">パッチノート一覧へ →</Link>
            </div>
        </div>
    );
}