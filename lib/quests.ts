import quests from "@/data/quests.json";

export type QuestNpc = {
	slug: string;
	name: string;
	image: string;
};

export function getAllQuests(): QuestNpc[] {
	return quests as QuestNpc[];
}

export function getQuestBySlug(slug: string): QuestNpc | undefined {
	return (quests as QuestNpc[]).find((q) => q.slug === slug);
}