"use client";

import { useEffect } from "react";

declare global {
    interface Window {
        adsbygoogle?: unknown[];
    }
}

type AdSenseProps = {
    adSlot: string;
    adFormat?: "auto" | "rectangle" | "horizontal" | "vertical";
    fullWidthResponsive?: boolean;
    className?: string;
    style?: React.CSSProperties;
};

export default function AdSense({
    adSlot,
    adFormat = "auto",
    fullWidthResponsive = true,
    className,
    style,
}: AdSenseProps) {
    useEffect(() => {
        try {
            if (typeof window !== "undefined") {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch (err) {
            console.error("AdSense error:", err);
        }
    }, []);

    return (
        <div
            className={className}
            style={{
                width: "100%",
                overflow: "hidden",
                ...style,
            }}
        >
            <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-8110073956743613"
                data-ad-slot={adSlot}
                data-ad-format={adFormat}
                data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
            />
        </div>
    );
}