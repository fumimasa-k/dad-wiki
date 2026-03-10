import Link from "next/link";
import { notFound } from "next/navigation";
import Tag from "@/components/Tag";
import { getQuestById } from "@/lib/quests";

export default async function QuestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const quest = getQuestById(id);

  if (!quest) return notFound();

  return (
    <div className="grid" style={{ gap: 16 }}>
      <div className="card">
        <div className="muted" style={{ fontSize: 12 }}>
          <Link href="/quests">← クエスト一覧</Link>
        </div>
        <h1 className="h1">{quest.name}</h1>

        <div className="muted">
          <Tag>{quest.id}</Tag>
          <Tag>NPC: {quest.giver}</Tag>
          <Tag>最終確認: {quest.lastVerified ?? "—"}</Tag>
          {quest.source ? <Tag>根拠: {quest.source}</Tag> : null}
        </div>

        <hr className="sep" />

        <div className="grid grid-2">
          <div>
            <div className="h2">関連マップ</div>
            <ul>
              {quest.maps.map((m) => (
                <li key={m}>
                  <Link href={`/maps/${m}`}>{m}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="h2">目的</div>
            <ul>
              {quest.objectives.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="sep" />

        <div className="grid grid-2">
          <div>
            <div className="h2">前提</div>
            {quest.requirements.length ? (
              <ul>{quest.requirements.map((x) => <li key={x}>{x}</li>)}</ul>
            ) : (
              <div className="muted">なし</div>
            )}
          </div>

          <div>
            <div className="h2">必要アイテム</div>
            {quest.items.length ? (
              <ul>{quest.items.map((x) => <li key={x}>{x}</li>)}</ul>
            ) : (
              <div className="muted">なし</div>
            )}
          </div>
        </div>

        <hr className="sep" />

        <div className="h2">手順</div>
        <ol>
          {quest.steps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>

        <hr className="sep" />

        <div className="h2">報酬</div>
        {quest.rewards.length ? (
          <ul>{quest.rewards.map((x) => <li key={x}>{x}</li>)}</ul>
        ) : (
          <div className="muted">なし</div>
        )}

        {quest.notes ? (
          <>
            <hr className="sep" />
            <div className="h2">メモ</div>
            <p className="muted">{quest.notes}</p>
          </>
        ) : null}

        {(quest.patchChangedIn ?? []).length ? (
          <>
            <hr className="sep" />
            <div className="h2">変更が入ったパッチ</div>
            <ul>
              {(quest.patchChangedIn ?? []).map((p) => (
                <li key={p}>
                  <Link href={`/patch-notes/${p}`}>{p}</Link>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </div>
    </div>
  );
}