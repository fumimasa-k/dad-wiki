import items from "@/data/items/items.json";

export type ItemMaster = {
	name: string;
	image: string;
};

export type ItemMasterMap = Record<string, ItemMaster>;

export function getItemMaster(): ItemMasterMap {
	return items as ItemMasterMap;
}