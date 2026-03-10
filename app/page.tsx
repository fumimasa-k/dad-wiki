import Link from "next/link";
import { getAllQuests } from "@/lib/quests";
import { getAllPatchNotesMeta } from "@/lib/patchNotes";
import { getAllMaps } from "@/lib/maps";

export default function HomePage() {
    const quests = getAllQuests();
    const notes = getAllPatchNotesMeta();
    const maps = getAllMaps();

    return (
        <div className="grid" style={{ gap: 16 }}>
            <div className="card">
                <h1 className="h1">Dark and Darker 日本語版 攻略サイト</h1>
                <p className="muted">
                    マップ / クエスト / パッチノートを今後追加・更新予定です。
                    <br />
		{/*
                    追加は <span className="kbd">data/</span>（JSON）と <span className="kbd">content/</span>（Markdown）に入れるだけ。
		*/}
                </p>
            </div>

            <div className="grid grid-2">
                <div className="card">
                    <div className="h2">マップ</div>
                    <div className="muted">登録数: {maps.length}</div>
                    <hr className="sep" />
                    <ul>
                        {maps.slice(0, 5).map((m) => (
                            <li key={m.slug}>
                                <Link href={`/maps/${m.slug}`}>{m.name}</Link>
                            </li>
                        ))}
                    </ul>
                    <hr className="sep" />
                    <Link href="/maps">一覧へ →</Link>
                </div>
{/*
                <div className="card">
                    <div className="h2">クエスト</div>
                    <div className="muted">登録数: {quests.length}</div>
                    <hr className="sep" />
                    <ul>
                        {quests.slice(0, 5).map((q) => (
                            <li key={q.id}>
                                <Link href={`/quests/${q.id}`}>{q.name}</Link>
                            </li>
                        ))}
                    </ul>
                    <hr className="sep" />
                    <Link href="/quests">一覧へ →</Link>
                </div>
*/}
            </div>

            <div className="card">
                <div className="h2">パッチノート</div>
                <div className="muted">記事数: {notes.length}</div>
                <hr className="sep" />
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
                <Link href="/patch-notes">一覧へ →</Link>
            </div>
        </div>
    );
}