import maps from "@/data/maps.json";

export type MapPoint = {
	id: string;
	name: string;
	note?: string;
	x: number;
	y: number;
};

export type MapFloor = {
	id: string;
	name: string;
	image: string;
	points?: MapPoint[];
};

export type MapInfo = {
	slug: string;
	name: string;
	coverImage?: string;
	description?: string;
	lastVerified?: string;
	floors: MapFloor[];
};

export function getAllMaps(): MapInfo[] {
	return maps as MapInfo[];
}

export function getMapBySlug(slug: string): MapInfo | undefined {
	return (maps as MapInfo[]).find((m) => m.slug === slug);
}