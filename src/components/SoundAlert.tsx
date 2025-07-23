import React, { useState } from 'react';
import Ably from "ably/promises";
import MacWindow from './MacWindow';

const ABLY_KEY = "xYLWXA.0281_Q:LXQS27QWrIo5bfAGt6DwizmE4g7-JG2pLhIuky0j6Ao";
const channel = new Ably.Realtime.Promise(ABLY_KEY).channels.get('yt-remote');

export default function SoundAlert() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await channel.publish("new-video", { url });
      setStatus("🎉 Sent!");
      setUrl('');
    } catch {
      setStatus("❌ Error sending!");
    }
    setSubmitting(false);
  }

  return (
    <MacWindow title="Sound Alert">
      <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", gap: 18}}>
        <input
          type="text"
          placeholder="Paste YouTube URL here"
          value={url}
          onChange={e => setUrl(e.target.value)}
          style={{
            padding: "12px 16px",
            borderRadius: 8,
            border: "1.5px solid #d4dde6",
            fontSize: 16,
            outline: "none",
            background: "rgba(255,255,255,0.6)",
            marginBottom: 6,
            boxShadow: "0 1px 3px 0 rgba(0,0,0,0.02)"
          }}
          required
          disabled={submitting}
        />
        <button
          type="submit"
          disabled={submitting || !url}
          style={{
            fontWeight: 600,
            fontSize: 16,
            padding: "10px 0",
            borderRadius: 8,
            border: 0,
            color: "#fff",
            background: "linear-gradient(90deg, #9f8fff, #2dc6ff 85%)",
            cursor: "pointer",
            transition: "transform .15s cubic-bezier(.29,1.5,.6,1)",
            boxShadow: submitting ? "none" : "0 3px 12px 0 rgba(157,175,255,0.09)"
          }}
        >
          {submitting ? "Sending..." : "Send to Host"}
        </button>
        <span style={{color: "#28c840", fontWeight: 500}}>{status}</span>
      </form>
    </MacWindow>
  );
}