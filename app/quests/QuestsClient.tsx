"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { NpcQuestGroup } from "@/lib/quests";

export default function QuestsClient({
    npcGroups,
}: {
    npcGroups: NpcQuestGroup[];
}) {
    const firstNpcWithQuest =
        npcGroups.find((npc) => npc.quests.length > 0) ?? npcGroups[0];

    const [selectedNpcSlug, setSelectedNpcSlug] = useState(firstNpcWithQuest?.slug ?? "");
    const [selectedQuestId, setSelectedQuestId] = useState(
        firstNpcWithQuest?.quests?.[0]?.id ?? ""
    );

    const selectedNpc = useMemo(() => {
        return npcGroups.find((npc) => npc.slug === selectedNpcSlug) ?? firstNpcWithQuest;
    }, [npcGroups, selectedNpcSlug, firstNpcWithQuest]);

    const selectedQuest = useMemo(() => {
        if (!selectedNpc) return undefined;
        if (!Array.isArray(selectedNpc.quests) || selectedNpc.quests.length === 0) return undefined;
        return selectedNpc.quests.find((q) => q.id === selectedQuestId) ?? selectedNpc.quests[0];
    }, [selectedNpc, selectedQuestId]);

    function handleSelectNpcBySlug(slug: string) {
        const npc = npcGroups.find((x) => x.slug === slug);
        if (!npc) return;
        setSelectedNpcSlug(npc.slug);
        setSelectedQuestId(npc.quests?.[0]?.id ?? "");
    }

    if (!npcGroups.length) {
        return (
            <div className="grid" style={{ gap: 16 }}>
                <div className="card">
                    <h1 className="h1">クエスト</h1>
                    <p className="muted">クエストデータがありません。</p>
                </div>
            </div>
        );
    }

    if (!selectedNpc) {
        return (
            <div className="grid" style={{ gap: 16 }}>
                <div className="card">
                    <h1 className="h1">クエスト</h1>
                    <p className="muted">NPCデータが見つかりません。</p>
                </div>
            </div>
        );
    }

    const questDescription =
        selectedQuest?.description ?? selectedNpc.description ?? "";

    return (
        <div className="grid" style={{ gap: 16 }}>
            {/*<div className="card">*/}
            {/*    <h1 className="h1">現在のクエストリスト</h1>*/}
            {/*</div>*/}

            <div className="card questNpcSelectBar">
                <label htmlFor="npc-select" className="questNpcSelectLabel">
                    NPC選択
                </label>
                <select
                    id="npc-select"
                    className="questNpcSelect"
                    value={selectedNpc.slug}
                    onChange={(e) => handleSelectNpcBySlug(e.target.value)}
                >
                    {npcGroups.map((npc) => (
                        <option key={npc.slug} value={npc.slug}>
                            {npc.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="card questBoard">
                <aside className="questSidebar">
                    <div className="questSidebarCurrentNpc">{selectedNpc.name}</div>

                    <div className="questList">
                        {selectedNpc.quests.length > 0 ? (
                            selectedNpc.quests.map((quest) => (
                                <button
                                    key={quest.id}
                                    className={`questListItem ${selectedQuest?.id === quest.id ? "active" : ""}`}
                                    onClick={() => setSelectedQuestId(quest.id)}
                                >
                                    <span className="questListItemTitle">{quest.title}</span>
                                    <span className="questListItemMeta">
                                        {quest.repeatable ? "∞" : ""}
                                    </span>
                                </button>
                            ))
                        ) : (
                            <div className="muted" style={{ padding: "12px 14px" }}>
                                クエスト未登録
                            </div>
                        )}
                    </div>
                </aside>

                <section className="questDetailPane">
                    <div className="questDetailTop">
                        <div className="questNpcCard">
                            <div className="questNpcImageWrap">
                                <Image
                                    src={selectedNpc.image}
                                    alt={selectedNpc.name}
                                    fill
                                    className="questNpcImage"
                                />
                            </div>
                        </div>

                        <div className="questDescription">
                            <h2 className="questDetailTitle">
                                {selectedQuest?.title ?? selectedNpc.name}
                            </h2>
                            <p>{questDescription}</p>
                        </div>
                    </div>

                    {!selectedQuest ? (
                        <div className="questSection">
                            <div className="questSectionTitle">詳細</div>
                            <p className="muted">このNPCのクエストはまだ登録されていません。</p>
                        </div>
                    ) : (
                        <>
                            {(selectedQuest.rewards?.length ?? 0) > 0 ? (
                                <div className="questSection">
                                    <div className="questSectionTitle">報酬</div>
                                    <div className="questItemGrid">
                                        {selectedQuest.rewards?.map((item) => (
                                            <div key={`${item.name}-${item.count}`} className="questItemCard">
                                                <div className="questItemImageWrap">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fill
                                                        className="questItemImage"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : null}

                            {(selectedQuest.requiredItems?.length ?? 0) > 0 ? (
                                <div className="questSection">
                                    <div className="questSectionTitle">必要アイテム</div>
                                    <div className="questItemGrid">
                                        {selectedQuest.requiredItems?.map((item) => (
                                            <div key={`${item.name}-${item.count}`} className="questItemCard">
                                                <div className="questItemImageWrap">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fill
                                                        className="questItemImage"
                                                    />
                                                </div>
                                                <div className="questItemName">{item.name}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : null}

                            {(selectedQuest.objectives?.length ?? 0) > 0 ? (
                                <div className="questSection">
                                    <div className="questSectionTitle">進行条件</div>
                                    <div className="questObjectives">
                                        {selectedQuest.objectives?.map((obj) => (
                                            <div key={obj.label} className="questObjectiveRow">
                                                <div className="questObjectiveLabel">{obj.label}</div>
                                                <div className="questObjectiveProgress">
                                                    {obj.current} / {obj.target}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : null}

                            {(selectedQuest.notes?.length ?? 0) > 0 ? (
                                <div className="questSection">
                                    <div className="questSectionTitle">備考</div>
                                    <ul className="questNotes">
                                        {selectedQuest.notes?.map((note) => (
                                            <li key={note}>{note}</li>
                                        ))}
                                    </ul>
                                </div>
                            ) : null}
                        </>
                    )}
                </section>
            </div>
        </div>
    );
}