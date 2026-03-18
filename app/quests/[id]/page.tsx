import Image from "next/image";
import { notFound } from "next/navigation";
import { getNpcQuestGroupBySlug } from "@/lib/quests";

export default async function QuestDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const npc = getNpcQuestGroupBySlug(id);

    if (!npc) return notFound();

    return (
        <div className="grid" style={{ gap: 16 }}>
            <div className="card">
                <h1 className="h1">{npc.name}</h1>
                <p className="muted">NPCクエスト詳細ページの雛形です。</p>
            </div>

            <div className="card">
                <div
                    style={{
                        position: "relative",
                        width: "100%",
                        maxWidth: 240,
                        aspectRatio: "1 / 1",
                    }}
                >
                    <Image
                        src={npc.image}
                        alt={npc.name}
                        fill
                        style={{ objectFit: "cover", borderRadius: 16 }}
                    />
                </div>
            </div>
        </div>
    );
}