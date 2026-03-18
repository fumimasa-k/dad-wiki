import fs from "node:fs";
import path from "node:path";
import Papa from "papaparse";
import npcList from "@/data/quests/npcs.json";

export type ItemInfo = {
    name: string;
    image: string;
    count: number;
};

export type Objective = {
    label: string;
    current: number;
    target: number;
    done: boolean;
};

export type QuestInfo = {
    id: string;
    title: string;
    description?: string;
    type: string;
    repeatable?: boolean;
    rewards?: ItemInfo[];
    requiredItems?: ItemInfo[];
    objectives?: Objective[];
    notes?: string[];
};

export type NpcQuestGroup = {
    slug: string;
    name: string;
    image: string;
    description: string;
    quests: QuestInfo[];
};

type CsvQuestRow = {
    id: string;
    title: string;
    description?: string;
    type?: string;
    repeatable?: string;
    rewards?: string;
    requiredItems?: string;
    objectives?: string;
    notes?: string;
};

type NpcMeta = {
    slug: string;
    name: string;
    image: string;
    description?: string;
};

const QUESTS_DIR = path.join(process.cwd(), "data", "quests");

function parseBoolean(value?: string): boolean {
    return String(value).trim().toLowerCase() === "true";
}

function parseItems(value?: string): ItemInfo[] {
    if (!value?.trim()) return [];

    return value
        .split("|")
        .map((part) => part.trim())
        .filter(Boolean)
        .map((part) => {
            const [name = "", image = "", count = "1"] = part.split(":");
            return {
                name: name.trim(),
                image: image.trim(),
                count: Number(count) || 1,
            };
        });
}

function parseObjectives(value?: string): Objective[] {
    if (!value?.trim()) return [];

    return value
        .split("|")
        .map((part) => part.trim())
        .filter(Boolean)
        .map((part) => {
            const [label = "", current = "0", target = "0", done = "false"] = part.split(":");
            return {
                label: label.trim(),
                current: Number(current) || 0,
                target: Number(target) || 0,
                done: String(done).trim().toLowerCase() === "true",
            };
        });
}

function parseNotes(value?: string): string[] {
    if (!value?.trim()) return [];
    return value
        .split("|")
        .map((part) => part.trim())
        .filter(Boolean);
}

function readNpcCsv(slug: string): QuestInfo[] {
    const filePath = path.join(QUESTS_DIR, `${slug}.csv`);
    if (!fs.existsSync(filePath)) return [];

    const csvText = fs.readFileSync(filePath, "utf-8");
    const parsed = Papa.parse<CsvQuestRow>(csvText, {
        header: true,
        skipEmptyLines: true,
    });

    return parsed.data.map((row) => ({
        id: row.id,
        title: row.title,
        description: row.description?.trim() || "",
        type: row.type?.trim() || "",
        repeatable: parseBoolean(row.repeatable),
        rewards: parseItems(row.rewards),
        requiredItems: parseItems(row.requiredItems),
        objectives: parseObjectives(row.objectives),
        notes: parseNotes(row.notes),
    }));
}

export function getAllNpcQuestGroups(): NpcQuestGroup[] {
    const npcs = npcList as NpcMeta[];

    return npcs.map((npc) => ({
        slug: npc.slug,
        name: npc.name,
        image: npc.image,
        description: npc.description ?? `${npc.name}のクエスト一覧。`,
        quests: readNpcCsv(npc.slug),
    }));
}

export function getNpcQuestGroupBySlug(slug: string): NpcQuestGroup | undefined {
    return getAllNpcQuestGroups().find((npc) => npc.slug === slug);
}