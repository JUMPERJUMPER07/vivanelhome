import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Capa TikTok VivanelHOME";
export const size = {
  width: 1080,
  height: 1920,
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
            "linear-gradient(180deg, #fff1e8 0%, #ffffff 45%, #ffe3d7 100%)",
          padding: 48,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at top left, rgba(255,96,0,0.18), transparent 25%), radial-gradient(circle at bottom right, rgba(230,57,70,0.18), transparent 28%)",
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
            borderRadius: 44,
            background: "linear-gradient(160deg, #ff7a18 0%, #ff6000 40%, #e63946 100%)",
            color: "#ffffff",
            padding: "54px 46px",
            boxShadow: "0 24px 60px rgba(230,57,70,0.18)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "flex-start",
              gap: 10,
              background: "#ffffff",
              borderRadius: 999,
              padding: "12px 18px",
            }}
          >
            <span style={{ color: "#ff6000", fontSize: 40, fontWeight: 900 }}>
              Vivanel
            </span>
            <span
              style={{
                background: "#e63946",
                color: "#ffffff",
                borderRadius: 18,
                padding: "8px 14px",
                fontSize: 34,
                fontWeight: 900,
              }}
            >
              HOME
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <div
              style={{
                alignSelf: "flex-start",
                background: "rgba(255,255,255,0.14)",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.18)",
                padding: "12px 20px",
                fontSize: 26,
                fontWeight: 700,
              }}
            >
              Ofertas para casa, cozinha e organizacao
            </div>
            <div style={{ fontSize: 88, lineHeight: 1.03, fontWeight: 900 }}>
              VivanelHOME para sua casa
            </div>
            <div style={{ fontSize: 34, lineHeight: 1.35, color: "rgba(255,255,255,0.94)" }}>
              Descontos, dicas uteis e economia em um visual leve, confiavel e feito para converter.
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {["Ofertas incriveis todos os dias", "Produtos uteis e bonitos", "Economia com praticidade"].map(
              (item) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    background: "rgba(255,255,255,0.14)",
                    borderRadius: 28,
                    border: "1px solid rgba(255,255,255,0.18)",
                    padding: "18px 22px",
                    fontSize: 28,
                    fontWeight: 800,
                  }}
                >
                  {item}
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
