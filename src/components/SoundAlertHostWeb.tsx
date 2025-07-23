import React, { useState, useEffect, useRef } from 'react';
import Ably from "ably/promises";
import MacWindow from './MacWindow';

const ABLY_KEY = "xYLWXA.0281_Q:LXQS27QWrIo5bfAGt6DwizmE4g7-JG2pLhIuky0j6Ao";
const channel = new Ably.Realtime.Promise(ABLY_KEY).channels.get('yt-remote');

function isYouTubeUrl(url: string) {
  return url && (url.includes('youtube.com/watch') || url.includes('youtu.be/'));
}
function toEmbedUrl(url: string) {
  let videoId = '';
  try {
    if (url.includes('youtube.com/watch')) {
      const u = new URL(url);
      videoId = u.searchParams.get('v') || '';
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split(/[?&]/)[0];
    }
  } catch { return ''; }
  return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : '';
}

export default function SoundAlertHostWeb() {
  const [embedUrl, setEmbedUrl] = useState('');
  const [notice, setNotice] = useState('Waiting for a video...');
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    channel.subscribe('new-video', msg => {
      const url = msg.data.url as string;
      if (isYouTubeUrl(url)) {
        const embed = toEmbedUrl(url);
        if (embed) {
          setEmbedUrl(embed);
          setNotice('');
          if (frameRef.current) {
            frameRef.current.style.opacity = "0";
            setTimeout(() => {
              if (frameRef.current) frameRef.current.style.opacity = "1";
            }, 100);
          }
        } else {
          setNotice("Could not parse video link!");
        }
      } else {
        setNotice("Waiting for a valid YouTube link...");
      }
    });
  }, []);

  return (
    <MacWindow title="SoundAlertHostWeb">
      {notice && <div style={{marginBottom: 16, fontSize: 18, color: "#888", textAlign: "center", minHeight: 36}}>{notice}</div>}
      <div style={{
        width: "100%",
        minHeight: 260,
        borderRadius: 14,
        overflow: "hidden",
        boxShadow: "0 6px 32px 0 rgba(80,90,130,0.06)",
        background: "#e6eaf5"
      }}>
        {embedUrl &&
          <iframe
            key={embedUrl}
            ref={frameRef}
            src={embedUrl}
            style={{
              width: "100%",
              height: "340px",
              border: 0,
              transition: "opacity .7s cubic-bezier(.29,1.5,.6,1)",
              opacity: 1,
              background: "#222"
            }}
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Remote YouTube Player"
          />}
      </div>
    </MacWindow>
  );
}