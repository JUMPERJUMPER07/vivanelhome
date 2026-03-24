import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Capa Instagram VivanelHOME";
export const size = {
  width: 1600,
  height: 900,
};
export const contentType = "image/png";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background:
            "linear-gradient(135deg, #fff1e8 0%, #ffffff 42%, #ffe3d7 100%)",
          padding: 56,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at top left, rgba(255,96,0,0.20), transparent 28%), radial-gradient(circle at bottom right, rgba(230,57,70,0.16), transparent 30%)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            borderRadius: 42,
            background: "linear-gradient(135deg, #ff7a18 0%, #ff6000 35%, #e63946 100%)",
            padding: "48px 54px",
            color: "#ffffff",
            boxShadow: "0 24px 60px rgba(230,57,70,0.18)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: "rgba(255,255,255,0.15)",
                borderRadius: 999,
                padding: "10px 18px",
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              VivanelHOME para sua casa
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: "#ffffff",
                borderRadius: 999,
                padding: "12px 18px",
              }}
            >
              <span style={{ color: "#ff6000", fontSize: 42, fontWeight: 900 }}>
                Vivanel
              </span>
              <span
                style={{
                  background: "#e63946",
                  color: "#ffffff",
                  borderRadius: 18,
                  padding: "8px 14px",
                  fontSize: 36,
                  fontWeight: 900,
                }}
              >
                HOME
              </span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", maxWidth: 860 }}>
            <div style={{ fontSize: 92, lineHeight: 1.02, fontWeight: 900 }}>
              VivanelHOME para sua casa
            </div>
            <div style={{ marginTop: 24, fontSize: 36, lineHeight: 1.35, color: "rgba(255,255,255,0.92)" }}>
              Ofertas incriveis todos os dias com descontos, dicas uteis e economia para cozinha, casa e organizacao.
            </div>
          </div>

          <div style={{ display: "flex", gap: 18 }}>
            {["Descontos", "Dicas uteis", "Economize"].map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "center",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.14)",
                  border: "1px solid rgba(255,255,255,0.20)",
                  padding: "14px 24px",
                  fontSize: 26,
                  fontWeight: 800,
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
