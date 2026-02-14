"use client";
import { useState, useEffect, useRef, CSSProperties } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Page = "envelope" | "card" | "proposal" | "accepted";

interface Petal {
  id: number;
  left: string;
  delay: string;
  duration: string;
  size: string;
  opacity: number;
  rotate: number;
}

interface NoPosition {
  x: number | null;
  y: number | null;
}

// Extend CSSProperties to allow CSS custom properties (--tx, --ty)
interface BurstStyle extends CSSProperties {
  "--tx": string;
  "--ty": string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const petals: Petal[] = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  delay: `${Math.random() * 8}s`,
  duration: `${6 + Math.random() * 6}s`,
  size: `${12 + Math.random() * 16}px`,
  opacity: 0.4 + Math.random() * 0.5,
  rotate: Math.random() * 360,
}));

// ─── Sub-components ──────────────────────────────────────────────────────────

interface FallingPetalProps {
  petal: Petal;
}

function FallingPetal({ petal }: FallingPetalProps) {
  return (
    <div
      style={{
        position: "fixed",
        left: petal.left,
        top: "-30px",
        fontSize: petal.size,
        opacity: petal.opacity,
        animation: `petalFall ${petal.duration} ${petal.delay} infinite linear`,
        transform: `rotate(${petal.rotate}deg)`,
        pointerEvents: "none",
        zIndex: 0,
        userSelect: "none",
      }}
    >
      🌸
    </div>
  );
}

interface HeartBurstProps {
  active: boolean;
}

function HeartBurst({ active }: HeartBurstProps) {
  const hearts: string[] = ["💖", "💕", "💗", "💓", "✨", "🌹", "💞", "💝"];

  return active ? (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 100,
      }}
    >
      {Array.from({ length: 24 }).map((_, i) => {
        const burstStyle: BurstStyle = {
          position: "absolute",
          left: "50%",
          top: "50%",
          fontSize: `${14 + Math.random() * 22}px`,
          animation: `burst 1.4s ${(i * 0.04).toFixed(2)}s ease-out forwards`,
          "--tx": `${(Math.random() - 0.5) * 500}px`,
          "--ty": `${(Math.random() - 0.5) * 500}px`,
        };
        return (
          <div key={i} style={burstStyle}>
            {hearts[i % hearts.length]}
          </div>
        );
      })}
    </div>
  ) : null;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ValentinesCard() {
  const [page, setPage] = useState<Page>("envelope");
  const [burst, setBurst] = useState<boolean>(false);
  const [noPos, setNoPos] = useState<NoPosition>({ x: null, y: null });
  const [noCount, setNoCount] = useState<number>(0);
  const noRef = useRef<HTMLButtonElement>(null);

  const noMessages: string[] = [
    "No",
    "Are you sure? 🥺",
    "Pretty please? 💕",
    "Cmon Mel I know you want it",
    "Just one more chance? 🌹",
    "You can't say no (jk lang)",
  ];

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');

      * { box-sizing: border-box; margin: 0; padding: 0; }

      body {
        background: #fff0f5;
        min-height: 100vh;
        overflow-x: hidden;
      }

      @keyframes petalFall {
        0% { transform: translateY(-30px) rotate(0deg) translateX(0px); opacity: 0; }
        10% { opacity: 0.7; }
        85% { opacity: 0.5; }
        100% { transform: translateY(110vh) rotate(720deg) translateX(60px); opacity: 0; }
      }

      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.08); }
      }

      @keyframes floatHeart {
        0%, 100% { transform: translateY(0px) rotate(-5deg); }
        50% { transform: translateY(-12px) rotate(5deg); }
      }

      @keyframes shimmer {
        0% { background-position: -200% center; }
        100% { background-position: 200% center; }
      }

      @keyframes burst {
        0% { transform: translate(-50%, -50%) translate(0, 0) scale(0); opacity: 1; }
        80% { opacity: 1; }
        100% { transform: translate(-50%, -50%) translate(var(--tx), var(--ty)) scale(1); opacity: 0; }
      }

      @keyframes envelopeOpen {
        0% { transform: scaleY(1); }
        100% { transform: scaleY(0); opacity: 0; }
      }

      @keyframes cardReveal {
        0% { opacity: 0; transform: translateY(60px) scale(0.9); }
        100% { opacity: 1; transform: translateY(0) scale(1); }
      }

      @keyframes glowPulse {
        0%, 100% { box-shadow: 0 0 30px rgba(255, 150, 180, 0.4), 0 0 60px rgba(255, 150, 180, 0.15); }
        50% { box-shadow: 0 0 50px rgba(255, 150, 180, 0.65), 0 0 100px rgba(255, 150, 180, 0.25); }
      }

      @keyframes noBounce {
        0% { transform: scale(1); }
        50% { transform: scale(0.9); }
        100% { transform: scale(1); }
      }

      .envelope-btn {
        background: linear-gradient(135deg, #f472a8, #e0559a);
        color: #fff;
        border: 1px solid rgba(255, 200, 225, 0.5);
        padding: 14px 36px;
        font-family: 'Cormorant Garamond', serif;
        font-size: 18px;
        letter-spacing: 2px;
        cursor: pointer;
        border-radius: 50px;
        transition: all 0.3s ease;
        text-transform: uppercase;
        box-shadow: 0 4px 20px rgba(244, 114, 168, 0.35);
      }

      .envelope-btn:hover {
        background: linear-gradient(135deg, #f78fc0, #e96dae);
        transform: translateY(-2px);
        box-shadow: 0 10px 30px rgba(244, 114, 168, 0.5);
      }

      .yes-btn {
        background: linear-gradient(135deg, #f472a8, #e0559a);
        color: #fff;
        border: 1px solid rgba(255, 200, 225, 0.5);
        padding: 16px 48px;
        font-family: 'Cormorant Garamond', serif;
        font-size: 20px;
        letter-spacing: 3px;
        cursor: pointer;
        border-radius: 50px;
        transition: all 0.3s ease;
        text-transform: uppercase;
        animation: pulse 2s ease-in-out infinite;
        box-shadow: 0 6px 25px rgba(244, 114, 168, 0.45);
      }

      .yes-btn:hover {
        background: linear-gradient(135deg, #f78fc0, #e96dae);
        transform: translateY(-3px) scale(1.05);
        box-shadow: 0 14px 40px rgba(244, 114, 168, 0.6);
        animation: none;
      }

      .no-btn {
        background: transparent;
        color: rgba(230, 120, 165, 0.7);
        border: 1px solid rgba(230, 120, 165, 0.35);
        padding: 12px 30px;
        font-family: 'Cormorant Garamond', serif;
        font-size: 16px;
        letter-spacing: 2px;
        cursor: pointer;
        border-radius: 50px;
        transition: all 0.2s ease;
        text-transform: uppercase;
      }

      .no-btn:hover {
        animation: noBounce 0.2s ease;
      }

      .shimmer-text {
        background: linear-gradient(90deg, #e8609a, #f9b8d4, #d44d8a, #f9c6db, #e8609a);
        background-size: 200% auto;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: shimmer 4s linear infinite;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleNo = (): void => {
    const x = Math.random() * (window.innerWidth - 160);
    const y = Math.random() * (window.innerHeight - 80);
    setNoPos({ x, y });
    setNoCount((c) => Math.min(c + 1, noMessages.length - 1));
  };

  const handleYes = (): void => {
    setBurst(true);
    setTimeout(() => setBurst(false), 2000);
    setPage("accepted");
  };

  const bg: CSSProperties = {
    position: "fixed",
    inset: 0,
    background:
      "radial-gradient(ellipse at 30% 20%, #ffe8f4 0%, #ffc8e2 45%, #ffb0d5 100%)",
    zIndex: -1,
  };

  const sparkleOverlay: CSSProperties = {
    position: "fixed",
    inset: 0,
    backgroundImage:
      "radial-gradient(circle, rgba(255,150,200,0.25) 1px, transparent 1px)",
    backgroundSize: "32px 32px",
    zIndex: -1,
    pointerEvents: "none",
  };

  // Corner positions for decorative borders
  const corners = [
    "top-left",
    "top-right",
    "bottom-left",
    "bottom-right",
  ] as const;
  type Corner = (typeof corners)[number];

  const getCornerStyle = (pos: Corner, borderColor: string): CSSProperties => {
    const isTop = pos.includes("top");
    const isLeft = pos.includes("left");
    return {
      position: "absolute",
      ...(isTop ? { top: "16px" } : { bottom: "16px" }),
      ...(isLeft ? { left: "16px" } : { right: "16px" }),
      width: "40px",
      height: "40px",
      borderTop: isTop ? `1px solid ${borderColor}` : "none",
      borderBottom: !isTop ? `1px solid ${borderColor}` : "none",
      borderLeft: isLeft ? `1px solid ${borderColor}` : "none",
      borderRight: !isLeft ? `1px solid ${borderColor}` : "none",
    };
  };

  // ─── ENVELOPE PAGE ───────────────────────────────────────────────────────────
  if (page === "envelope") {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div style={bg} />
        <div style={sparkleOverlay} />
        {petals.map((p) => (
          <FallingPetal key={p.id} petal={p} />
        ))}

        <div
          style={{
            textAlign: "center",
            animation: "fadeUp 1.2s ease forwards",
            zIndex: 10,
            padding: "20px",
          }}
        >
          <div
            style={{
              fontSize: "80px",
              animation: "floatHeart 3s ease-in-out infinite",
              marginBottom: "32px",
            }}
          >
            💌
          </div>

          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(13px, 2vw, 16px)",
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "rgba(190, 80, 130, 0.8)",
              marginBottom: "16px",
            }}
          >
            I wanna tell you something
          </p>

          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(36px, 7vw, 72px)",
              fontWeight: 400,
              fontStyle: "italic",
              color: "#c2185b",
              marginBottom: "40px",
              lineHeight: 1.2,
            }}
          >
            Happy Valentine's Day
          </h1>

          <button className="envelope-btn" onClick={() => setPage("card")}>
            Open ✦
          </button>
        </div>
      </div>
    );
  }

  // ─── CARD PAGE ───────────────────────────────────────────────────────────────
  if (page === "card") {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 20px",
          position: "relative",
        }}
      >
        <div style={bg} />
        <div style={sparkleOverlay} />
        {petals.map((p) => (
          <FallingPetal key={p.id} petal={p} />
        ))}

        <div
          style={{
            maxWidth: "580px",
            width: "100%",
            background:
              "linear-gradient(160deg, rgba(255,240,248,0.97) 0%, rgba(255,225,242,0.99) 100%)",
            border: "1px solid rgba(240, 130, 180, 0.35)",
            borderRadius: "4px",
            padding: "clamp(32px, 6vw, 60px)",
            animation: "cardReveal 1s ease forwards",
            position: "relative",
            zIndex: 10,
            animationDelay: "0.1s",
            opacity: 0,
          }}
        >
          {corners.map((pos) => (
            <div
              key={pos}
              style={getCornerStyle(pos, "rgba(240, 130, 180, 0.5)")}
            />
          ))}

          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "13px",
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "rgba(200, 80, 140, 0.6)",
              textAlign: "center",
              marginBottom: "28px",
            }}
          >
            I love you ✦ With all my heart
          </p>

          <div
            style={{
              textAlign: "center",
              fontSize: "36px",
              marginBottom: "28px",
              animation: "floatHeart 3s ease-in-out infinite",
            }}
          >
            🌹
          </div>

          <h2
            className="shimmer-text"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(28px, 5vw, 44px)",
              fontWeight: 400,
              fontStyle: "italic",
              textAlign: "center",
              marginBottom: "32px",
              lineHeight: 1.3,
            }}
          >
            My Melly,
          </h2>

          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(16px, 2.5vw, 19px)",
              lineHeight: 1.9,
              color: "rgba(140, 50, 90, 0.85)",
              fontWeight: 300,
              textAlign: "center",
              marginBottom: "40px",
            }}
          >
            <p style={{ marginBottom: "20px" }}>
              I've been trying to figure out how to write this for a while now
              Mel, but I still don't think I have the right words. I just want
              to let you know that I love you with all my heart.
            </p>
            <p style={{ marginBottom: "20px" }}>
              There's something about you Mel. No matter what I do, no matter
              what happens, I always get more and more attracted to you. I
              always think about you, gravitating toward you like some cosmic
              rule I never can break even if I tried. You are, genuinely, my
              singularity.
            </p>
            <p style={{ marginBottom: "20px" }}>
              The longer I get to know you, the more I find myself falling for
              you. You make me calm, you make me comfortable. You make me feel
              like the best version of myself, and I genuinely don't think I'd
              be the person I am today without you in my life.
            </p>
            <p style={{ marginBottom: "20px" }}>
              I love watching Detective Conan with you, I love playing Valorant
              with you, and I love hanging out with you in Deca. I wish it would
              just stay like that forever. We've seen more mysteries than I can
              count, but the only case I've never been able to solve is why
              you're so impossibly easy to love.
            </p>
            <p style={{ marginBottom: "20px" }}>
              I know we've had our ups and downs. We've taken detours, made
              wrong turns, but somehow both of us still ended up here. I know
              we've been hanging out and essentially we are already together,
              but I want more than "essentially." I want the real thing, with
              you, properly. I want to be the boyfriend who actually deserves
              you — and I promise, this time, I'm showing up fully for that.
            </p>{" "}
          </div>

          <div style={{ textAlign: "center", marginBottom: "16px" }}>
            <button
              className="envelope-btn"
              onClick={() => setPage("proposal")}
            >
              Continue... 🌹
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── PROPOSAL PAGE ───────────────────────────────────────────────────────────
  if (page === "proposal") {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 20px",
          position: "relative",
        }}
      >
        <div style={bg} />
        <div style={sparkleOverlay} />
        {petals.map((p) => (
          <FallingPetal key={p.id} petal={p} />
        ))}
        <HeartBurst active={burst} />

        <div
          style={{
            maxWidth: "560px",
            width: "100%",
            background:
              "linear-gradient(160deg, rgba(255,240,248,0.97) 0%, rgba(255,220,240,0.99) 100%)",
            border: "1px solid rgba(240, 130, 180, 0.4)",
            borderRadius: "4px",
            padding: "clamp(32px, 6vw, 60px)",
            textAlign: "center",
            animation: "cardReveal 0.8s ease forwards",
            position: "relative",
            zIndex: 10,
            animationDelay: "0.1s",
            opacity: 0,
          }}
        >
          {corners.map((pos) => (
            <div
              key={pos}
              style={getCornerStyle(pos, "rgba(240, 130, 180, 0.5)")}
            />
          ))}

          <div
            style={{
              fontSize: "56px",
              animation: "floatHeart 2.5s ease-in-out infinite",
              marginBottom: "24px",
            }}
          >
            💍
          </div>

          <h2
            className="shimmer-text"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(30px, 6vw, 52px)",
              fontWeight: 600,
              lineHeight: 1.2,
              marginBottom: "24px",
            }}
          >
            Will you be
            <br />
            my girlfriend?
          </h2>

          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(15px, 2.5vw, 18px)",
              color: "rgba(160, 60, 110, 0.8)",
              lineHeight: 1.8,
              marginBottom: "44px",
              fontStyle: "italic",
            }}
          >
            You've made my heart feel things I never expected. I'd be the
            luckiest person alive if you'd say yes.
          </p>

          <div
            style={{
              display: "flex",
              gap: "20px",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <button className="yes-btn" onClick={handleYes}>
              Yes! 💖
            </button>

            <button
              ref={noRef}
              className="no-btn"
              onClick={handleNo}
              style={
                noPos.x !== null
                  ? {
                      position: "fixed",
                      left: noPos.x ?? undefined,
                      top: noPos.y ?? undefined,
                      zIndex: 200,
                      transition: "all 0.15s ease",
                    }
                  : {}
              }
            >
              {noMessages[noCount]}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── ACCEPTED PAGE ───────────────────────────────────────────────────────────
  if (page === "accepted") {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 20px",
          position: "relative",
        }}
      >
        <div style={bg} />
        <div style={sparkleOverlay} />
        {petals.map((p) => (
          <FallingPetal key={p.id} petal={p} />
        ))}
        <HeartBurst active={true} />

        <div
          style={{
            maxWidth: "540px",
            width: "100%",
            background:
              "linear-gradient(160deg, rgba(255,235,248,0.98) 0%, rgba(255,210,238,0.99) 100%)",
            border: "1px solid rgba(240, 130, 180, 0.5)",
            borderRadius: "4px",
            padding: "clamp(36px, 7vw, 68px)",
            textAlign: "center",
            animation:
              "cardReveal 0.8s ease forwards, glowPulse 3s ease-in-out infinite",
            position: "relative",
            zIndex: 10,
            opacity: 0,
          }}
        >
          {corners.map((pos) => (
            <div
              key={pos}
              style={getCornerStyle(pos, "rgba(240, 130, 180, 0.6)")}
            />
          ))}

          <div
            style={{
              fontSize: "64px",
              animation: "floatHeart 2s ease-in-out infinite",
              marginBottom: "28px",
            }}
          >
            💐
          </div>

          <h2
            className="shimmer-text"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(32px, 6vw, 56px)",
              fontWeight: 600,
              lineHeight: 1.2,
              marginBottom: "20px",
            }}
          >
            She said Yes! 🎉
          </h2>

          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(17px, 3vw, 22px)",
              color: "rgba(160, 55, 105, 0.9)",
              lineHeight: 1.8,
              marginBottom: "12px",
              fontStyle: "italic",
            }}
          >
            You are everything I could ask for
          </p>

          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(14px, 2vw, 17px)",
              color: "rgba(200, 100, 150, 0.75)",
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}
          >
            ✦ Happy Valentine's Day ✦
          </p>
        </div>
      </div>
    );
  }

  return null;
}
