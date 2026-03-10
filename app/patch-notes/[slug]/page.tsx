import Link from "next/link";
import { notFound } from "next/navigation";
import Tag from "@/components/Tag";
import { getPatchNoteBySlug } from "@/lib/patchNotes";
import { markdownToHtml } from "@/lib/markdown";
import { getAllPatchNotesMeta } from "@/lib/patchNotes";

export function generateStaticParams() {
  return getAllPatchNotesMeta().map((p) => ({ slug: p.slug }));
}

export default async function PatchNoteDetailPage({ params }: { params: { slug: string } }) {
    const note = getPatchNoteBySlug(params.slug);
    if (!note) return notFound();

    const html = await markdownToHtml(note.content);

    return (
        <div className="grid" style={{ gap: 16 }}>
            <div className="card">
                <div className="muted" style={{ fontSize: 12 }}>
                    <Link href="/patch-notes">← パッチノート一覧</Link>
                </div>

                <h1 className="h1">{note.title}</h1>
                <div className="muted">
                    <Tag>slug: {note.slug}</Tag>
                    <Tag>date: {note.date}</Tag>
                    {(note.tags ?? []).map((t) => (
                        <Tag key={t}>{t}</Tag>
                    ))}
                </div>

                {note.summary ? (
                    <>
                        <hr className="sep" />
                        <p className="muted">{note.summary}</p>
                    </>
                ) : null}
            </div>

            <div className="card markdown">
                <div dangerouslySetInnerHTML={{ __html: html }} />
            </div>
        </div>
    );
}