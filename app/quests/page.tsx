import { getAllNpcQuestGroups } from "@/lib/quests";
import QuestsClient from "./QuestsClient";

export default function QuestsPage() {
	const npcGroups = getAllNpcQuestGroups();
	return <QuestsClient npcGroups={npcGroups} />;
}