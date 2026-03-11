import Image from "next/image";
import { notFound } from "next/navigation";
import { getMapBySlug } from "@/lib/maps";
import Tag from "@/components/Tag";

export default async function MapDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const map = getMapBySlug(slug);

  if (!map) return notFound();

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
        <div className="h2">マップ画像（地点プロット例）</div>
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
         <Image src={map.image} alt={map.name} fill style={{ objectFit: "contain" }} priority />
          {(map.points ?? []).map((p) => (
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
                border: "1px solid rgba(255,255,255,0.35)",
              }}
            />
          ))}
        </div>

        {(map.points ?? []).length ? (
          <>
            <hr className="sep" />
            <div className="h2">地点一覧</div>
            <ul>
              {(map.points ?? []).map((p) => (
                <li key={p.id}>
                  <b>{p.name}</b>
                  {p.note ? <span className="muted"> — {p.note}</span> : null}
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </div>
    </div>
  );
}