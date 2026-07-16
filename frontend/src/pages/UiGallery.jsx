import React, { useState } from 'react';
import { Search, Copy, Check, ExternalLink, Sparkles, Code2, Play } from 'lucide-react';

const UI_COMPONENTS = [
  {
    id: 'hamster-loader',
    name: 'Hamster Running Loader',
    category: 'Loaders',
    author: 'Nawsome',
    html: `<div aria-label="Orange and tan hamster running in a metal wheel" role="img" class="wheel-and-hamster">
  <div class="wheel"></div>
  <div class="hamster">
    <div class="hamster__body">
      <div class="hamster__head">
        <div class="hamster__ear"></div>
        <div class="hamster__eye"></div>
        <div class="hamster__nose"></div>
      </div>
      <div class="hamster__limb hamster__limb--fr"></div>
      <div class="hamster__limb hamster__limb--fl"></div>
      <div class="hamster__limb hamster__limb--br"></div>
      <div class="hamster__limb hamster__limb--bl"></div>
      <div class="hamster__tail"></div>
    </div>
  </div>
  <div class="spoke"></div>
</div>`,
    css: `.wheel-and-hamster {
  --dur: 1s;
  position: relative;
  width: 12em;
  height: 12em;
  font-size: 12px;
}

.wheel,
.hamster,
.hamster div,
.spoke {
  position: absolute;
}

.wheel,
.spoke {
  border-radius: 50%;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.wheel {
  background: radial-gradient(100% 100% at center,hsla(0,0%,60%,0) 47.8%,hsl(0,0%,60%) 48%);
  z-index: 2;
}

.hamster {
  animation: hamster var(--dur) ease-in-out infinite;
  top: 50%;
  left: calc(50% - 3.5em);
  width: 7em;
  height: 3.75em;
  transform: rotate(4deg) translate(-0.8em,1.85em);
  transform-origin: 50% 0;
  z-index: 1;
}

.hamster__head {
  animation: hamsterHead var(--dur) ease-in-out infinite;
  background: hsl(30,90%,55%);
  border-radius: 70% 30% 0 100% / 40% 25% 25% 60%;
  box-shadow: 0 -0.25em 0 hsl(30,90%,80%) inset,
		0.75em -1.55em 0 hsl(30,90%,90%) inset;
  top: 0;
  left: -2em;
  width: 2.75em;
  height: 2.5em;
  transform-origin: 100% 50%;
}

.hamster__ear {
  animation: hamsterEar var(--dur) ease-in-out infinite;
  background: hsl(0,90%,85%);
  border-radius: 50%;
  box-shadow: -0.25em 0 hsl(30,90%,55%) inset;
  top: -0.25em;
  right: -0.25em;
  width: 0.75em;
  height: 0.75em;
  transform-origin: 50% 75%;
}

.hamster__eye {
  animation: hamsterEye var(--dur) linear infinite;
  background-color: hsl(0,0%,0%);
  border-radius: 50%;
  top: 0.375em;
  left: 1.25em;
  width: 0.5em;
  height: 0.5em;
}

.hamster__nose {
  background: hsl(0,90%,75%);
  border-radius: 35% 65% 85% 15% / 70% 50% 50% 30%;
  top: 0.75em;
  left: 0;
  width: 0.2em;
  height: 0.25em;
}

.hamster__body {
  animation: hamsterBody var(--dur) ease-in-out infinite;
  background: hsl(30,90%,90%);
  border-radius: 50% 30% 50% 30% / 15% 60% 40% 40%;
  box-shadow: 0.1em 0.75em 0 hsl(30,90%,55%) inset,
		0.15em -0.5em 0 hsl(30,90%,80%) inset;
  top: 0.25em;
  left: 2em;
  width: 4.5em;
  height: 3em;
  transform-origin: 17% 50%;
  transform-style: preserve-3d;
}

.hamster__limb--fr,
.hamster__limb--fl {
  clip-path: polygon(0 0,100% 0,70% 80%,60% 100%,0% 100%,40% 80%);
  top: 2em;
  left: 0.5em;
  width: 1em;
  height: 1.5em;
  transform-origin: 50% 0;
}

.hamster__limb--fr {
  animation: hamsterFRLimb var(--dur) linear infinite;
  background: linear-gradient(hsl(30,90%,80%) 80%,hsl(0,90%,75%) 80%);
  transform: rotate(15deg) translateZ(-1px);
}

.hamster__limb--fl {
  animation: hamsterFLLimb var(--dur) linear infinite;
  background: linear-gradient(hsl(30,90%,90%) 80%,hsl(0,90%,85%) 80%);
  transform: rotate(15deg);
}

.hamster__limb--br,
.hamster__limb--bl {
  border-radius: 0.75em 0.75em 0 0;
  clip-path: polygon(0 0,100% 0,100% 30%,70% 90%,70% 100%,30% 100%,40% 90%,0% 30%);
  top: 1em;
  left: 2.8em;
  width: 1.5em;
  height: 2.5em;
  transform-origin: 50% 30%;
}

.hamster__limb--br {
  animation: hamsterBRLimb var(--dur) linear infinite;
  background: linear-gradient(hsl(30,90%,80%) 90%,hsl(0,90%,75%) 90%);
  transform: rotate(-25deg) translateZ(-1px);
}

.hamster__limb--bl {
  animation: hamsterBLLimb var(--dur) linear infinite;
  background: linear-gradient(hsl(30,90%,90%) 90%,hsl(0,90%,85%) 90%);
  transform: rotate(-25deg);
}

.hamster__tail {
  animation: hamsterTail var(--dur) linear infinite;
  background: hsl(0,90%,85%);
  border-radius: 0.25em 50% 50% 0.25em;
  box-shadow: 0 -0.2em 0 hsl(0,90%,75%) inset;
  top: 1.5em;
  right: -0.5em;
  width: 1em;
  height: 0.5em;
  transform: rotate(30deg) translateZ(-1px);
  transform-origin: 0.25em 0.25em;
}

.spoke {
  animation: spoke var(--dur) linear infinite;
  background: radial-gradient(100% 100% at center,hsl(0,0%,60%) 4.8%,hsla(0,0%,60%,0) 5%),
		linear-gradient(hsla(0,0%,55%,0) 46.9%,hsl(0,0%,65%) 47% 52.9%,hsla(0,0%,65%,0) 53%) 50% 50% / 99% 99% no-repeat;
}

@keyframes hamster {
  from, to { transform: rotate(4deg) translate(-0.8em,1.85em); }
  50% { transform: rotate(0) translate(-0.8em,1.85em); }
}

@keyframes hamsterHead {
  from, 25%, 50%, 75%, to { transform: rotate(0); }
  12.5%, 37.5%, 62.5%, 87.5% { transform: rotate(8deg); }
}

@keyframes hamsterEye {
  from, 90%, to { transform: scaleY(1); }
  95% { transform: scaleY(0); }
}

@keyframes hamsterEar {
  from, 25%, 50%, 75%, to { transform: rotate(0); }
  12.5%, 37.5%, 62.5%, 87.5% { transform: rotate(12deg); }
}

@keyframes hamsterBody {
  from, 25%, 50%, 75%, to { transform: rotate(0); }
  12.5%, 37.5%, 62.5%, 87.5% { transform: rotate(-2deg); }
}

@keyframes hamsterFRLimb {
  from, 25%, 50%, 75%, to { transform: rotate(50deg) translateZ(-1px); }
  12.5%, 37.5%, 62.5%, 87.5% { transform: rotate(-30deg) translateZ(-1px); }
}

@keyframes hamsterFLLimb {
  from, 25%, 50%, 75%, to { transform: rotate(-30deg); }
  12.5%, 37.5%, 62.5%, 87.5% { transform: rotate(50deg); }
}

@keyframes hamsterBRLimb {
  from, 25%, 50%, 75%, to { transform: rotate(-60deg) translateZ(-1px); }
  12.5%, 37.5%, 62.5%, 87.5% { transform: rotate(20deg) translateZ(-1px); }
}

@keyframes hamsterBLLimb {
  from, 25%, 50%, 75%, to { transform: rotate(20deg); }
  12.5%, 37.5%, 62.5%, 87.5% { transform: rotate(-60deg); }
}

@keyframes hamsterTail {
  from, 25%, 50%, 75%, to { transform: rotate(30deg) translateZ(-1px); }
  12.5%, 37.5%, 62.5%, 87.5% { transform: rotate(10deg) translateZ(-1px); }
}

@keyframes spoke {
  from { transform: rotate(0); }
  to { transform: rotate(-1turn); }
}`
  },
  {
    id: 'neon-btn',
    name: 'Infinite Glowing Button',
    category: 'Buttons',
    author: 'uiverse',
    html: `<button class="neon-btn">Glow Button</button>`,
    css: `.neon-btn {
  padding: 14px 28px;
  border: none;
  outline: none;
  color: #fff;
  background: #111;
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 10px;
  font-family: sans-serif;
  font-size: 15px;
  font-weight: bold;
  letter-spacing: 1px;
}
.neon-btn:before {
  content: '';
  background: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
  position: absolute;
  top: -2px;
  left: -2px;
  background-size: 400%;
  z-index: -1;
  filter: blur(5px);
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  animation: glowing 20s linear infinite;
  opacity: 0;
  transition: opacity .3s ease-in-out;
  border-radius: 10px;
}
.neon-btn:active {
  color: #000
}
.neon-btn:active:after {
  background: transparent;
}
.neon-btn:hover:before {
  opacity: 1;
}
.neon-btn:after {
  z-index: -1;
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: #111;
  left: 0;
  top: 0;
  border-radius: 10px;
}
@keyframes glowing {
  0% { background-position: 0 0; }
  50% { background-position: 400% 0; }
  100% { background-position: 0 0; }
}`
  },
  {
    id: 'glass-card',
    name: 'Glassmorphic Card Hover',
    category: 'Cards',
    author: 'designFlow',
    html: `<div class="glass-card">
  <div class="glass-card-content">
    <h3>Glassmorphism</h3>
    <p>A beautiful design system built using glass backdrop effects.</p>
  </div>
</div>`,
    css: `.glass-card {
  width: 250px;
  height: 180px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: sans-serif;
  color: #fff;
  text-align: center;
  padding: 20px;
  transition: transform 0.3s ease, border-color 0.3s ease;
  cursor: pointer;
}
.glass-card:hover {
  transform: translateY(-5px);
  border-color: rgba(255, 255, 255, 0.35);
}
.glass-card h3 {
  margin: 0 0 10px 0;
  font-size: 20px;
  color: #fff;
}
.glass-card p {
  font-size: 13px;
  margin: 0;
  color: #ccc;
  line-height: 1.4;
}`
  },
  {
    id: 'cyber-input',
    name: 'Cyberpunk Input Field',
    category: 'Inputs',
    author: 'neonHacker',
    html: `<div class="cyber-input-container">
  <input type="text" class="cyber-input" placeholder="ACCESS SYSTEM...">
  <div class="cyber-border"></div>
</div>`,
    css: `.cyber-input-container {
  position: relative;
  width: 260px;
}
.cyber-input {
  width: 100%;
  padding: 12px 20px;
  border: 2px solid #00f0ff;
  background: #0f0f1b;
  color: #00f0ff;
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  outline: none;
  box-shadow: 0 0 10px rgba(0, 240, 255, 0.2);
  transition: all 0.3s;
  text-transform: uppercase;
}
.cyber-input::placeholder {
  color: rgba(0, 240, 255, 0.5);
}
.cyber-input:focus {
  border-color: #ff003c;
  box-shadow: 0 0 15px rgba(255, 0, 60, 0.4);
  color: #ff003c;
}
.cyber-input:focus::placeholder {
  color: rgba(255, 0, 60, 0.5);
}`
  },
  {
    id: 'ios-switch',
    name: 'Interactive iOS Switch',
    category: 'Switches',
    author: 'appleStyle',
    html: `<label class="switch">
  <input type="checkbox">
  <span class="slider"></span>
</label>`,
    css: `.switch {
  font-size: 17px;
  position: relative;
  display: inline-block;
  width: 3.5em;
  height: 2em;
}
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #2d3748;
  transition: .4s;
  border-radius: 30px;
  border: 1px solid #4a5568;
}
.slider:before {
  position: absolute;
  content: "";
  height: 1.4em;
  width: 1.4em;
  border-radius: 20px;
  left: 0.3em;
  bottom: 0.25em;
  background-color: white;
  transition: .4s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.4);
}
input:checked + .slider {
  background-color: #4f46e5;
  border-color: #6366f1;
}
input:checked + .slider:before {
  transform: translateX(1.5em);
}`
  },
  {
    id: 'loading-circle',
    name: 'Galaxy Orbiting Loader',
    category: 'Loaders',
    author: 'astronomer',
    html: `<div class="galaxy-loader">
  <div class="star"></div>
  <div class="planet planet-1"></div>
  <div class="planet planet-2"></div>
</div>`,
    css: `.galaxy-loader {
  position: relative;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.star {
  width: 16px;
  height: 16px;
  background-color: #fbbf24;
  border-radius: 50%;
  box-shadow: 0 0 20px #fbbf24;
}
.planet {
  position: absolute;
  border-radius: 50%;
  animation: orbit linear infinite;
}
.planet-1 {
  width: 8px;
  height: 8px;
  background-color: #3b82f6;
  box-shadow: 0 0 8px #3b82f6;
  animation-duration: 2s;
  transform-origin: 40px center;
  left: 0px;
}
.planet-2 {
  width: 6px;
  height: 6px;
  background-color: #ec4899;
  box-shadow: 0 0 8px #ec4899;
  animation-duration: 3.5s;
  transform-origin: 30px center;
  left: 10px;
}
@keyframes orbit {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}`
  }
];

const UiGallery = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTab, setActiveTab] = useState({}); // Stores state { [compId]: 'preview' | 'html' | 'css' }
  const [copiedId, setCopiedId] = useState(null); // Stores copied component ID for checkout toast

  const categories = ['All', 'Loaders', 'Buttons', 'Cards', 'Inputs', 'Switches'];

  const filteredComponents = UI_COMPONENTS.filter(comp => {
    const matchesSearch = comp.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || comp.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getIframeSrcDoc = (html, css) => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body {
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background-color: #0f172a;
            overflow: hidden;
          }
          ${css}
        </style>
      </head>
      <body>
        ${html}
      </body>
      </html>
    `;
  };

  const copyToClipboard = (text, id, type) => {
    navigator.clipboard.writeText(text);
    setCopiedId(`${id}-${type}`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getActiveTab = (compId) => activeTab[compId] || 'preview';

  const setTab = (compId, tab) => {
    setActiveTab(prev => ({ ...prev, [compId]: tab }));
  };

  return (
    <div style={{ padding: '40px 0', minHeight: '80vh' }} className="container animate-fade-in">
      {/* Header Banner */}
      <div style={{
        textAlign: 'center',
        marginBottom: '40px',
        padding: '30px',
        borderRadius: '16px',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%)',
        border: '1px solid var(--border)'
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 600, fontSize: '14px', marginBottom: '8px', textTransform: 'uppercase' }}>
          <Sparkles size={16} /> Uiverse UI Gallery
        </div>
        <h1 style={{ fontSize: '32px', fontWeight: 800, margin: '0 0 12px 0', fontFamily: 'var(--font-heading)' }}>
          Community UI Components
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '15px' }}>
          Interactive open-source custom UI design assets. Grab HTML and CSS templates and drop them directly into your personal web projects.
        </p>
      </div>

      {/* Filters & Search Header */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '30px',
        borderBottom: '1px solid var(--border)',
        paddingBottom: '20px'
      }}>
        {/* Category Tabs */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: '1px solid',
                borderColor: selectedCategory === cat ? 'var(--primary)' : 'var(--border)',
                background: selectedCategory === cat ? 'var(--primary)' : 'var(--bg-secondary)',
                color: selectedCategory === cat ? 'white' : 'var(--text-secondary)',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div style={{ position: 'relative', width: '300px' }}>
          <input
            type="text"
            placeholder="Search UI components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 16px 10px 40px',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              fontSize: '14px',
              outline: 'none'
            }}
          />
          <Search size={16} style={{ position: 'absolute', left: '14px', top: '12px', color: 'var(--text-secondary)' }} />
        </div>
      </div>

      {/* Grid of Components */}
      {filteredComponents.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: '24px'
        }}>
          {filteredComponents.map(comp => {
            const currentTab = getActiveTab(comp.id);
            return (
              <div key={comp.id} className="card" style={{
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                height: '420px',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                background: 'var(--bg-secondary)'
              }}>
                {/* Card Title Header */}
                <div style={{
                  padding: '16px',
                  borderBottom: '1px solid var(--border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <h3 style={{ margin: '0 0 2px 0', fontSize: '16px', fontWeight: 700 }}>{comp.name}</h3>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span style={{
                        background: 'var(--bg-tertiary)',
                        color: 'var(--primary)',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: 600
                      }}>{comp.category}</span>
                      <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>by {comp.author}</span>
                    </div>
                  </div>

                  {/* Navigation Tab Buttons */}
                  <div style={{ display: 'flex', background: 'var(--bg-tertiary)', padding: '3px', borderRadius: '6px' }}>
                    <button
                      onClick={() => setTab(comp.id, 'preview')}
                      style={{
                        padding: '5px 10px',
                        fontSize: '12px',
                        fontWeight: 600,
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        background: currentTab === 'preview' ? 'var(--bg-primary)' : 'transparent',
                        color: currentTab === 'preview' ? 'var(--text-primary)' : 'var(--text-secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Play size={12} /> Live
                    </button>
                    <button
                      onClick={() => setTab(comp.id, 'html')}
                      style={{
                        padding: '5px 10px',
                        fontSize: '12px',
                        fontWeight: 600,
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        background: currentTab === 'html' ? 'var(--bg-primary)' : 'transparent',
                        color: currentTab === 'html' ? 'var(--text-primary)' : 'var(--text-secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Code2 size={12} /> HTML
                    </button>
                    <button
                      onClick={() => setTab(comp.id, 'css')}
                      style={{
                        padding: '5px 10px',
                        fontSize: '12px',
                        fontWeight: 600,
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        background: currentTab === 'css' ? 'var(--bg-primary)' : 'transparent',
                        color: currentTab === 'css' ? 'var(--text-primary)' : 'var(--text-secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Code2 size={12} /> CSS
                    </button>
                  </div>
                </div>

                {/* Tab Contents Frame */}
                <div style={{ flexGrow: 1, position: 'relative', background: '#0f172a' }}>
                  {/* Live Render Preview */}
                  {currentTab === 'preview' && (
                    <iframe
                      srcDoc={getIframeSrcDoc(comp.html, comp.css)}
                      style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        display: 'block'
                      }}
                      title={comp.name}
                      sandbox="allow-scripts"
                    />
                  )}

                  {/* HTML Source View */}
                  {currentTab === 'html' && (
                    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <pre style={{
                        margin: 0,
                        padding: '16px',
                        overflow: 'auto',
                        color: '#94a3b8',
                        fontFamily: 'monospace',
                        fontSize: '12px',
                        flexGrow: 1
                      }}>
                        <code>{comp.html}</code>
                      </pre>
                      <button
                        onClick={() => copyToClipboard(comp.html, comp.id, 'html')}
                        style={{
                          position: 'absolute',
                          bottom: '12px',
                          right: '12px',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          border: '1px solid #334155',
                          background: '#1e293b',
                          color: 'white',
                          fontSize: '11px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
                        }}
                      >
                        {copiedId === `${comp.id}-html` ? (
                          <><Check size={12} style={{ color: '#10b981' }} /> Copied!</>
                        ) : (
                          <><Copy size={12} /> Copy HTML</>
                        )}
                      </button>
                    </div>
                  )}

                  {/* CSS Source View */}
                  {currentTab === 'css' && (
                    <div style={{ height: '100%', position: 'relative', display: 'flex', flexDirection: 'column' }}>
                      <pre style={{
                        margin: 0,
                        padding: '16px',
                        overflow: 'auto',
                        color: '#38bdf8',
                        fontFamily: 'monospace',
                        fontSize: '12px',
                        flexGrow: 1
                      }}>
                        <code>{comp.css}</code>
                      </pre>
                      <button
                        onClick={() => copyToClipboard(comp.css, comp.id, 'css')}
                        style={{
                          position: 'absolute',
                          bottom: '12px',
                          right: '12px',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          border: '1px solid #334155',
                          background: '#1e293b',
                          color: 'white',
                          fontSize: '11px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
                        }}
                      >
                        {copiedId === `${comp.id}-css` ? (
                          <><Check size={12} style={{ color: '#10b981' }} /> Copied!</>
                        ) : (
                          <><Copy size={12} /> Copy CSS</>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '60px 0',
          border: '1px dashed var(--border)',
          borderRadius: '12px',
          color: 'var(--text-secondary)'
        }}>
          <p style={{ margin: '0 0 8px 0', fontWeight: 600 }}>No components found</p>
          <p style={{ margin: 0, fontSize: '13px' }}>Try adjusting your search filters or browse another category.</p>
        </div>
      )}
    </div>
  );
};

export default UiGallery;
