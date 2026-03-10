"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import SearchBox from "@/components/SearchBox";
import Tag from "@/components/Tag";
import questsData from "@/data/quests.json";

type Quest = (typeof questsData)[number];

export default function QuestList() {
    const quests = questsData as Quest[];

    const [q, setQ] = useState("");
    const [giver, setGiver] = useState<string>("all");
    const [objective, setObjective] = useState<string>("all");
    const [map, setMap] = useState<string>("all");

    const options = useMemo(() => {
        const g = new Set<string>();
        const o = new Set<string>();
        const m = new Set<string>();
        quests.forEach((x) => {
            g.add(x.giver);
            x.objectives.forEach((t) => o.add(t));
            x.maps.forEach((t) => m.add(t));
        });
        return {
            givers: ["all", ...Array.from(g).sort()],
            objectives: ["all", ...Array.from(o).sort()],
            maps: ["all", ...Array.from(m).sort()]
        };
    }, [quests]);

    const filtered = useMemo(() => {
        const s = q.trim().toLowerCase();
        return quests.filter((x) => {
            if (giver !== "all" && x.giver !== giver) return false;
            if (objective !== "all" && !x.objectives.includes(objective)) return false;
            if (map !== "all" && !x.maps.includes(map)) return false;

            if (!s) return true;

            const hay = [
                x.id,
                x.name,
                x.giver,
                ...(x.maps ?? []),
                ...(x.objectives ?? []),
                ...(x.items ?? []),
                ...(x.rewards ?? []),
                ...(x.steps ?? []),
                x.notes ?? ""
            ]
                .join(" ")
                .toLowerCase();

            return hay.includes(s);
        });
    }, [quests, q, giver, objective, map]);

    return (
        <div className="grid" style={{ gap: 16 }}>
            <div className="card">
                <h1 className="h1">クエスト</h1>
                <p className="muted">検索・絞り込み対応。データは <span className="kbd">data/quests.json</span> に追加するだけ。</p>

                <div className="grid" style={{ gap: 10, marginTop: 12 }}>
                    <SearchBox value={q} onChange={setQ} placeholder="クエスト名 / NPC / アイテム / 手順…を検索" />

                    <div className="grid grid-2">
                        <select value={giver} onChange={(e) => setGiver(e.target.value)} style={selectStyle}>
                            {options.givers.map((v) => (
                                <option value={v} key={v}>
                                    NPC: {v}
                                </option>
                            ))}
                        </select>

                        <select value={objective} onChange={(e) => setObjective(e.target.value)} style={selectStyle}>
                            {options.objectives.map((v) => (
                                <option value={v} key={v}>
                                    目的: {v}
                                </option>
                            ))}
                        </select>

                        <select value={map} onChange={(e) => setMap(e.target.value)} style={selectStyle}>
                            {options.maps.map((v) => (
                                <option value={v} key={v}>
                                    マップ: {v}
                                </option>
                            ))}
                        </select>

                        <div className="muted" style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                            ヒット: {filtered.length} 件
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid" style={{ gap: 12 }}>
                {filtered.map((x) => (
                    <div className="card" key={x.id}>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                            <Link href={`/quests/${x.id}`} style={{ fontWeight: 800 }}>
                                {x.name}
                            </Link>
                            <span className="muted" style={{ fontSize: 12 }}>
                                {x.id}
                            </span>
                        </div>

                        <div className="muted" style={{ marginTop: 6 }}>
                            <Tag>NPC: {x.giver}</Tag>
                            {(x.objectives ?? []).map((t) => (
                                <Tag key={t}>{t}</Tag>
                            ))}
                            {(x.maps ?? []).map((t) => (
                                <Tag key={t}>map:{t}</Tag>
                            ))}
                        </div>

                        <div className="muted" style={{ fontSize: 12, marginTop: 8 }}>
                            最終確認: {x.lastVerified ?? "—"} / 根拠: {x.source ?? "—"}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const selectStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid var(--border)",
    background: "rgba(255,255,255,0.04)",
    color: "var(--text)",
    outline: "none"
};