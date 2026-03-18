import fs from "fs";
import path from "path";
import Papa from "papaparse";
import npcList from "@/data/quests/npcs.json";
import { getItemMaster } from "@/lib/items";

export type ItemInfo = {
    id: string;
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
    rewards: ItemInfo[];
    requiredItems: ItemInfo[];
    objectives: Objective[];
    notes: string[];
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
    requiredItems?: string;
    rewards?: string;
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
    return String(value ?? "").trim().toLowerCase() === "true";
}

function parseItems(value?: string): ItemInfo[] {
    if (!value?.trim()) return [];

    const itemMaster = getItemMaster();

    return value
        .split("|")
        .map((part) => part.trim())
        .filter(Boolean)
        .map((part) => {
            const [itemIdRaw = "", countRaw = "1"] = part.split("*");
            const itemId = itemIdRaw.trim();
            const count = Number(countRaw) || 1;

            const master = itemMaster[itemId];

            return {
                id: itemId,
                name: master?.name ?? itemId,
                image: master?.image ?? "",
                count,
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

    return parsed.data
        .filter((row) => row.id && row.title)
        .map((row) => ({
            id: row.id,
            title: row.title,
            description: row.description?.trim() || "",
            type: row.type?.trim() || "",
            repeatable: parseBoolean(row.repeatable),
            requiredItems: parseItems(row.requiredItems),
            rewards: parseItems(row.rewards),
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