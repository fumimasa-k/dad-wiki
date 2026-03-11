import { notFound } from "next/navigation";
import { getMapBySlug } from "@/lib/maps";
import MapDetailClient from "./MapDetailClient";

export default async function MapDetailPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const map = getMapBySlug(slug);

	if (!map) return notFound();

	return <MapDetailClient map={map} />;
}