import quests from "@/data/quests.json";

export type Quest = {
	id: string;
	name: string;
	giver: string;
	maps: string[];
	objectives: string[];
	requirements: string[];
	items: string[];
	rewards: string[];
	steps: string[];
	notes?: string;
	source?: string;
	lastVerified?: string;
	patchChangedIn?: string[];
};

export function getAllQuests(): Quest[] {
	return quests as Quest[];
}

export function getQuestById(id: string): Quest | undefined {
	return (quests as Quest[]).find((q) => q.id === id);
}