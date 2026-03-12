import Image from "next/image";
import Link from "next/link";
import quests from "@/data/quests.json";

export default function QuestPage() {
    return (
        <div className="grid" style={{ gap: 16 }}>
            <div className="card">
                <h1 className="h1">クエスト</h1>
                <p className="muted">NPCごとのクエスト一覧</p>
            </div>

            <div className="card">
                <div className="questGrid">
                    {quests.map((q) => (
                        <Link
                            key={q.slug}
                            href={`/quests/${q.slug}`}
                            className="questCard"
                        >
                            <Image
                                src={q.image}
                                alt={q.name}
                                fill
                                className="questImage"
                            />

                            <div className="questOverlay">
                                <div className="questTitle">{q.name}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}