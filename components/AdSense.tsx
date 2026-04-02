"use client";

import { useEffect } from "react";

declare global {
    interface Window {
        adsbygoogle?: unknown[];
    }
}

type AdSenseProps = {
    adSlot: string;
    adFormat?: "auto" | "fluid" | "rectangle" | "horizontal" | "vertical";
    className?: string;
    style?: React.CSSProperties;
    fullWidthResponsive?: boolean;
};

export default function AdSense({
    adSlot,
    adFormat = "auto",
    className,
    style,
    fullWidthResponsive = true,
}: AdSenseProps) {
    useEffect(() => {
        try {
            if (typeof window !== "undefined") {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch {
            // AdSense script未読込や再描画時の例外を無視
        }
    }, []);

    return (
        <div className={className} style={{ overflow: "hidden", ...style }}>
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