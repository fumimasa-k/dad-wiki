"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Tag from "@/components/Tag";
import type { MapInfo } from "@/lib/maps";

export default function MapDetailClient({ map }: { map: MapInfo }) {
  const [selectedFloorId, setSelectedFloorId] = useState(map.floors[0]?.id ?? "");

  const selectedFloor = useMemo(() => {
    return map.floors.find((f) => f.id === selectedFloorId) ?? map.floors[0];
  }, [map.floors, selectedFloorId]);

  if (!selectedFloor) {
    return <div className="card">階層データがありません。</div>;
  }

  return (
    <div className="grid" style={{ gap: 16 }}>
      <div className="card">
        <h1 className="h1">{map.name}</h1>
        <div className="muted">
          <Tag>slug: {map.slug}</Tag>
          <Tag>最終確認: {map.lastVerified ?? "—"}</Tag>
        </div>
        {map.description ? <p className="muted">{map.description}</p> : null}
      </div>

      <div className="card">
        <div className="h2">階層選択</div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
          {map.floors.map((floor) => {
            const active = floor.id === selectedFloor.id;

            return (
              <button
                key={floor.id}
                onClick={() => setSelectedFloorId(floor.id)}
                style={{
                  padding: "10px 14px",
                  borderRadius: 12,
                  border: active ? "1px solid var(--accent)" : "1px solid var(--border)",
                  background: active ? "rgba(139,211,255,0.12)" : "rgba(255,255,255,0.04)",
                  color: "var(--text)",
                  cursor: "pointer"
                }}
              >
                {floor.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="card">
        <div className="h2">マップ画像</div>
        <div className="muted" style={{ marginBottom: 12 }}>
          現在表示: {selectedFloor.name}
        </div>

        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "1 / 1",
            borderRadius: 16,
            overflow: "hidden",
            border: "1px solid var(--border)",
            background: "#0a0d14"
          }}
        >
          <Image
            src={selectedFloor.image}
            alt={`${map.name} ${selectedFloor.name}`}
            fill
            style={{ objectFit: "contain" }}
            priority
          />

          {(selectedFloor.points ?? []).map((p) => (
            <div
              key={p.id}
              title={`${p.name}${p.note ? " - " + p.note : ""}`}
              style={{
                position: "absolute",
                left: `${p.x * 100}%`,
                top: `${p.y * 100}%`,
                transform: "translate(-50%, -50%)",
                width: 12,
                height: 12,
                borderRadius: 999,
                background: "var(--accent)",
                boxShadow: "0 0 0 6px rgba(139,211,255,0.18)",
                border: "1px solid rgba(255,255,255,0.35)"
              }}
            />
          ))}
        </div>

        {(selectedFloor.points ?? []).length > 0 && (
          <>
            <hr className="sep" />
            <div className="h2">地点一覧</div>
            <ul>
              {(selectedFloor.points ?? []).map((p) => (
                <li key={p.id}>
                  <b>{p.name}</b>
                  {p.note ? <span className="muted"> — {p.note}</span> : null}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}