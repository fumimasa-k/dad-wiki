"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Tag from "@/components/Tag";
import type { MapInfo } from "@/lib/maps";
import AdSense from "@/components/AdSense";

type Point = { x: number; y: number };

const MIN_SCALE = 0.6;
const MAX_SCALE = 4;
const ZOOM_STEP = 0.12;

export default function MapDetailClient({ map }: { map: MapInfo }) {
    const [selectedFloorId, setSelectedFloorId] = useState(map.floors[0]?.id ?? "");
    const [scale, setScale] = useState(1);
    const [translate, setTranslate] = useState<Point>({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);

    const frameRef = useRef<HTMLDivElement | null>(null);
    const dragStartRef = useRef<Point>({ x: 0, y: 0 });
    const dragOriginRef = useRef<Point>({ x: 0, y: 0 });

    const selectedFloor = useMemo(() => {
        return map.floors.find((f) => f.id === selectedFloorId) ?? map.floors[0];
    }, [map.floors, selectedFloorId]);
    function clampScale(next: number) {
        return Math.min(MAX_SCALE, Math.max(MIN_SCALE, Number(next.toFixed(3))));
    }

    function handleWheel(e: React.WheelEvent<HTMLDivElement>) {
        e.preventDefault();

        const frame = frameRef.current;
        if (!frame) return;

        const rect = frame.getBoundingClientRect();

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const nextScale = clampScale(scale + (e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP));
        if (nextScale === scale) return;

        const scaleRatio = nextScale / scale;

        const nextTranslateX = mouseX - (mouseX - translate.x) * scaleRatio;
        const nextTranslateY = mouseY - (mouseY - translate.y) * scaleRatio;

        setScale(nextScale);
        setTranslate({
            x: nextTranslateX,
            y: nextTranslateY,
        });
    }

    function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
        if (e.button !== 0) return;

        setIsDragging(true);
        dragStartRef.current = { x: e.clientX, y: e.clientY };
        dragOriginRef.current = { ...translate };
        e.currentTarget.setPointerCapture(e.pointerId);
    }

    function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
        if (!isDragging) return;

        const dx = e.clientX - dragStartRef.current.x;
        const dy = e.clientY - dragStartRef.current.y;

        setTranslate({
            x: dragOriginRef.current.x + dx,
            y: dragOriginRef.current.y + dy,
        });
    }

    function finishDragging(e?: React.PointerEvent<HTMLDivElement>) {
        if (e) {
            try {
                e.currentTarget.releasePointerCapture(e.pointerId);
            } catch { }
        }
        setIsDragging(false);
    }

    function zoomByButton(direction: "in" | "out") {
        const frame = frameRef.current;
        if (!frame) return;

        const rect = frame.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const nextScale = clampScale(scale + (direction === "in" ? ZOOM_STEP : -ZOOM_STEP));
        if (nextScale === scale) return;

        const scaleRatio = nextScale / scale;

        const nextTranslateX = centerX - (centerX - translate.x) * scaleRatio;
        const nextTranslateY = centerY - (centerY - translate.y) * scaleRatio;

        setScale(nextScale);
        setTranslate({
            x: nextTranslateX,
            y: nextTranslateY,
        });
    }

    function resetView() {
        setScale(1);
        setTranslate({ x: 0, y: 0 });
    }

    if (!selectedFloor) {
        return <div className="card">階層データがありません。</div>;
    }

    return (
        <div className="mapPageRoot">
            <div className="card mapPageHeader">
                <h1 className="h1">{map.name}</h1>
                <div className="muted">
                    <Tag>slug: {map.slug}</Tag>
                    <Tag>最終確認: {map.lastVerified ?? "—"}</Tag>
                    <Tag>現在表示: {selectedFloor.name}</Tag>
                    <Tag>ズーム: {Math.round(scale * 100)}%</Tag>
                </div>
                {map.description ? <p className="muted">{map.description}</p> : null}
            </div>

            <div className="card mapLayout mapPageMain">
                <aside className="floorSidebar">
                    <div className="floorSidebarTitle">階層選択</div>

                    <div className="floorButtonList">
                        {map.floors.map((floor) => {
                            const active = floor.id === selectedFloor.id;

                            return (
                                <button
                                    key={floor.id}
                                    onClick={() => setSelectedFloorId(floor.id)}
                                    className={`floorButton ${active ? "active" : ""}`}
                                >
                                    {floor.name}
                                </button>
                            );
                        })}
                    </div>

                    <div className="mapZoomControls">
                        <button className="zoomButton" onClick={() => zoomByButton("out")}>
                            −
                        </button>
                        <button className="zoomButton" onClick={resetView}>
                            100%
                        </button>
                        <button className="zoomButton" onClick={() => zoomByButton("in")}>
                            ＋
                        </button>
                    </div>
                </aside>

                <section className="mapViewerSection">
                    <div className="mapViewerToolbar">
                        <span className="muted">ホイールで拡大縮小 / ドラッグで移動</span>
                    </div>

                    <div
                        ref={frameRef}
                        className={`mapViewerFrame ${isDragging ? "dragging" : ""}`}
                        onWheel={handleWheel}
                        onPointerDown={handlePointerDown}
                        onPointerMove={handlePointerMove}
                        onPointerUp={finishDragging}
                        onPointerLeave={finishDragging}
                        onPointerCancel={finishDragging}
                    >
                        <div
                            className="mapZoomLayer"
                            style={{
                                transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
                            }}
                        >
                            <div className="mapImageStage">
                                <Image
                                    src={selectedFloor.image}
                                    alt={`${map.name} ${selectedFloor.name}`}
                                    fill
                                    className="mapViewerImage"
                                    priority
                                    draggable={false}
                                />

                                {(selectedFloor.points ?? []).map((p) => (
                                    <div
                                        key={p.id}
                                        title={`${p.name}${p.note ? " - " + p.note : ""}`}
                                        style={{
                                            position: "absolute",
                                            left: `${p.x * 100}%`,
                                            top: `${p.y * 100}%`,
                                            transform: "translate(-50%, -50%)",
                                            width: 12,
                                            height: 12,
                                            borderRadius: 999,
                                            background: "var(--accent)",
                                            boxShadow: "0 0 0 6px rgba(139,211,255,0.18)",
                                            border: "1px solid rgba(255,255,255,0.35)",
                                            zIndex: 2,
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <AdSense
                adSlot="1111111111"
                className="adBlock adSpacerBottom"
            />
        </div>
    );
}