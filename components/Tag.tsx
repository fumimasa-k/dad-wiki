export default function Tag({ children }: { children: React.ReactNode }) {
    return (
        <span
            style={{
                display: "inline-block",
                padding: "2px 10px",
                borderRadius: 999,
                border: "1px solid var(--border)",
                background: "rgba(255,255,255,0.04)",
                color: "var(--muted)",
                fontSize: 12,
                marginRight: 6
            }}
        >
            {children}
        </span>
    );
}