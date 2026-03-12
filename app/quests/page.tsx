import Image from "next/image";
import Link from "next/link";
import quests from "@/data/quests.json";

type QuestNpc = {
    slug: string;
    name: string;
    image: string;
};

export default function QuestsPage() {
    const npcQuests = quests as QuestNpc[];

    return (
        <div className="grid" style={{ gap: 16 }}>
            <div className="card">
                <h1 className="h1">クエスト</h1>
                <p className="muted">NPCごとのクエストページ</p>
            </div>

            <div className="card">
                <div className="questGrid">
                    {npcQuests.map((q) => (
                        <Link key={q.slug} href={`/quests/${q.slug}`} className="questCard">
                            <div style={{ position: "relative", width: "100%", height: "100%" }}>
                                <Image
                                    src={q.image}
                                    alt={q.name}
                                    fill
                                    className="questImage"
                                />
                            </div>

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