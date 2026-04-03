import Image from "next/image";
import Link from "next/link";
import AdSense from "@/components/AdSense";
import { getAllPatchNotesMeta } from "@/lib/patchNotes";

export default function HomePage() {
    const notes = getAllPatchNotesMeta();

    return (
        <div className="grid" style={{ gap: 16 }}>
            <div className="card">
                <h1 className="h1">Dark and Darker 攻略サイト</h1>
                <p className="muted">
                    マップ、クエスト、パッチノートなどを整理する日本語攻略サイトです。
                </p>
            </div>

            {/* メニュー */}
            <div className="card">
                <div className="h2">コンテンツ</div>

                <div className="homeMenuGrid">

                    <Link href="/maps" className="homeMenuCard">
                        <Image
                            src="/ui/maps.jpg"
                            alt="マップ"
                            fill
                            className="homeMenuImage"
                        />
                        <div className="homeMenuOverlay">
                            <div className="homeMenuTitle">マップ</div>
                        </div>
                    </Link>

                    <Link href="/quests" className="homeMenuCard">
                        <Image
                            src="/ui/quests.jpg"
                            alt="クエスト"
                            fill
                            className="homeMenuImage"
                        />
                        <div className="homeMenuOverlay">
                            <div className="homeMenuTitle">クエスト</div>
                        </div>
                    </Link>

                </div>
            </div>

            {/* パッチノート */}
            <div className="card">
                <div className="h2">最新パッチノート</div>

                <ul>
                    {notes.slice(0, 5).map((p) => (
                        <li key={p.slug}>
                            <Link href={`/patch-notes/${p.slug}`}>
                                {p.title}
                            </Link>{" "}
                            <span className="muted" style={{ fontSize: 12 }}>
                                （{p.date}）
                            </span>
                        </li>
                    ))}
                </ul>

                <hr className="sep" />

                <Link href="/patch-notes">
                    パッチノート一覧 →
                </Link>
            </div>

            <AdSense
                adSlot="1111111111"
                className="adBlock adSpacerBottom"
            />

        </div>
    );
}