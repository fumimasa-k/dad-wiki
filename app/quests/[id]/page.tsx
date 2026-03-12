import Image from "next/image";
import { notFound } from "next/navigation";
import { getQuestBySlug } from "@/lib/quests";

export default async function QuestDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const quest = getQuestBySlug(id);

    if (!quest) return notFound();

    return (
        <div className="grid" style={{ gap: 16 }}>
            <div className="card">
                <h1 className="h1">{quest.name}</h1>
                <p className="muted">NPCクエストページの雛形です。</p>
            </div>

            <div className="card">
                <div
                    style={{
                        position: "relative",
                        width: "100%",
                        maxWidth: 420,
                        aspectRatio: "1 / 1",
                    }}
                >
                    <Image
                        src={quest.image}
                        alt={quest.name}
                        fill
                        style={{ objectFit: "cover", borderRadius: 16 }}
                    />
                </div>
            </div>
        </div>
    );
}