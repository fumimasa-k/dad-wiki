import Link from "next/link";
import Tag from "@/components/Tag";
import { getAllPatchNotesMeta } from "@/lib/patchNotes";

export const metadata = { title: "パッチノート | DaD Wiki" };

export default function PatchNotesPage() {
    const list = getAllPatchNotesMeta();

    return (
        <div className="grid" style={{ gap: 16 }}>
            <div className="card">
                <h1 className="h1">パッチノート</h1>
                <p className="muted">
                    <span className="kbd">content/patch-notes</span> に Markdown を追加するだけで増えます。
                </p>
            </div>

            <div className="grid" style={{ gap: 12 }}>
                {list.map((p) => (
                    <div className="card" key={p.slug}>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                            <Link href={`/patch-notes/${p.slug}`} style={{ fontWeight: 800 }}>
                                {p.title}
                            </Link>
                            <span className="muted" style={{ fontSize: 12 }}>
                                {p.date}
                            </span>
                        </div>

                        <div style={{ marginTop: 8 }}>
                            {(p.tags ?? []).map((t) => (
                                <Tag key={t}>{t}</Tag>
                            ))}
                        </div>

                        {p.summary ? <p className="muted">{p.summary}</p> : null}
                    </div>
                ))}
            </div>
        </div>
    );
}