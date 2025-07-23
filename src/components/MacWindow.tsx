import React, { ReactNode } from 'react';
import '../macos.css';

export default function MacWindow({children, title}: {children: ReactNode, title: string}) {
  return (
    <div className="macos-window">
      <div className="macos-titlebar">
        <span className="macos-dot red" />
        <span className="macos-dot yellow" />
        <span className="macos-dot green" />
        <span style={{
          fontSize: 18, marginLeft: 16, letterSpacing: 0.2, color: "#323b49", fontWeight: 500
        }}>{title}</span>
      </div>
      {children}
    </div>
  );
}
