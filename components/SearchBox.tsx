"use client";

export default function SearchBox({
    value,
    onChange,
    placeholder = "検索…"
}: {
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
}) {
    return (
        <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 12,
                border: "1px solid var(--border)",
                background: "rgba(255,255,255,0.04)",
                color: "var(--text)",
                outline: "none"
            }}
        />
    );
}