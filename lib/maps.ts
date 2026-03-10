import maps from "@/data/maps.json";

export type MapPoint = { id: string; name: string; note?: string; x: number; y: number };
export type MapInfo = {
	slug: string;
	name: string;
	image: string;
	description?: string;
	lastVerified?: string;
	points?: MapPoint[];
};

export function getAllMaps(): MapInfo[] {
	return maps as MapInfo[];
}

export function getMapBySlug(slug: string): MapInfo | undefined {
	return (maps as MapInfo[]).find((m) => m.slug === slug);
}