import React, { useState } from 'react';
import SoundAlert from "./components/SoundAlert";
import SoundAlertHostWeb from "./components/SoundAlertHostWeb";
import "./macos.css";

export default function App() {
  const [mode, setMode] = useState<"sender"|"player"|null>(null);

  if (!mode) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex", alignItems: "center", justifyContent: "center"
      }}>
        <div style={{display: "flex", flexDirection: "column", gap: 32}}>
          <button
            onClick={()=>setMode("sender")}
            style={{
              fontSize: 22, fontWeight: 600,
              background: "linear-gradient(90deg, #c5e3ff, #d3d9ff 85%)",
              border: 0, borderRadius: 12, padding: "24px 64px",
              margin: 0, cursor: "pointer",
              boxShadow: "0 2px 18px 0 rgba(170,190,255,0.13)",
              color: "#2b425d"
            }}>
            🎛️ Sound Alert (Sender)
          </button>
          <button
            onClick={()=>setMode("player")}
            style={{
              fontSize: 22, fontWeight: 600,
              background: "linear-gradient(90deg, #e7caff, #a3ffe7 85%)",
              border: 0, borderRadius: 12, padding: "24px 64px",
              margin: 0, cursor: "pointer",
              boxShadow: "0 2px 18px 0 rgba(150,230,200,0.10)",
              color: "#2b425d"
            }}>
            📺 SoundAlertHostWeb (Host)
          </button>
        </div>
      </div>
    );
  }

  return mode === "sender" ? <SoundAlert /> : <SoundAlertHostWeb />;
}