import Image from "next/image";
import Link from "next/link";
import { getAllMaps } from "@/lib/maps";

export default function MapsPage() {
    const maps = getAllMaps();

    return (
        <div className="grid" style={{ gap: 16 }}>
            <div className="card">
                <h1 className="h1">マップ</h1>
                <p className="muted">各マップの詳細ページ</p>
            </div>

            <div className="card">
                <div className="mapGrid">
                    {maps.map((map) => (
                        <Link key={map.slug} href={`/maps/${map.slug}`} className="mapCard">

                            {map.coverImage ? (
                                <Image
                                    src={map.coverImage}
                                    alt={map.name}
                                    fill
                                    className="mapImage"
                                />
                            ) : (
                                <div className="mapFallback">{map.name}</div>
                            )}

                            <div className="mapOverlay">
                                <div className="mapTitle">{map.name}</div>
                            </div>

                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}