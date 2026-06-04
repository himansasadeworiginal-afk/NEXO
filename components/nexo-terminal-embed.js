/* ================================================================
   NEXO ICT Terminal — Embeddable Interactive Code Playground
   ================================================================
   Include in any lesson page:
     <script src="../../components/nexo-terminal-embed.js"></script>
     <div id="nexo-terminal-mount"></div>

   Configure via window.NEXO_TERMINAL_CONFIG before including this script.
   ================================================================ */

// === CONFIG ===
(function() {
const CONFIG = window.NEXO_TERMINAL_CONFIG || {};

const DEFAULTS = {
  lang: 'python',
  lesson: {
    title: 'Hello World',
    challenge: 'Write a program that prints "Hello, World!" to the screen.',
    expectedOutput: 'Hello, World!',
    hint: 'Use the print() function.',
    starterCode: {
      python: '# Write your solution here\nprint("Hello, World!")\n',
      pseudocode: 'BEGIN\n  OUTPUT "Hello, World!"\nEND',
      javascript: '// Write your solution here\nconsole.log("Hello, World!");\n'
    }
  },
  theme: 'nexo',
  showLineNumbers: true,
  autoRunOnLoad: false,
  fontSize: 14,
  maxOutputLines: 200
};

const CFG = {
  lang: CONFIG.lang || DEFAULTS.lang,
  lesson: CONFIG.lesson || DEFAULTS.lesson,
  theme: CONFIG.theme || DEFAULTS.theme,
  showLineNumbers: CONFIG.showLineNumbers !== undefined ? CONFIG.showLineNumbers : DEFAULTS.showLineNumbers,
  autoRunOnLoad: CONFIG.autoRunOnLoad || DEFAULTS.autoRunOnLoad,
  fontSize: CONFIG.fontSize || DEFAULTS.fontSize,
  maxOutputLines: CONFIG.maxOutputLines || DEFAULTS.maxOutputLines
};

const CHALLENGES = {
  'py-hello-world': {
    lang: 'python', title: 'Hello World',
    challenge: 'Print "Hello, World!" to the screen.',
    expectedOutput: 'Hello, World!',
    hint: 'Use the print() function.',
    starterCode: { python: 'print("Hello, World!")\n' }
  },
  'py-variables': {
    lang: 'python', title: 'Variables',
    challenge: 'Create variables for your name (string) and age (integer), then print both.',
    expectedOutput: 'Name: Alice\nAge: 17',
    hint: 'Remember: strings need quotes, integers do not.',
    starterCode: { python: '# Declare variables\nname = "Alice"\nage = 17\n# Print them\nprint("Name:", name)\nprint("Age:", age)\n' }
  },
  'py-input': {
    lang: 'python', title: 'User Input',
    challenge: 'Ask the user for two numbers and print their sum.',
    expectedOutput: 'Enter first number: 5\nEnter second number: 3\nThe sum is: 8',
    hint: 'input() returns a string — use int() to convert.',
    starterCode: { python: '# Get two numbers from user\na = int(input("Enter first number: "))\nb = int(input("Enter second number: "))\nprint("The sum is:", a + b)\n' }
  },
  'py-if-else': {
    lang: 'python', title: 'If/Else',
    challenge: 'Ask the user for a number. Print "Positive", "Negative", or "Zero".',
    expectedOutput: 'Enter a number: -5\nNegative',
    hint: 'You need three branches: if, elif, and else.',
    starterCode: { python: 'num = int(input("Enter a number: "))\nif num > 0:\n    print("Positive")\nelif num < 0:\n    print("Negative")\nelse:\n    print("Zero")\n' }
  },
  'py-for-loop': {
    lang: 'python', title: 'For Loop',
    challenge: 'Print a multiplication table for 5 (5×1 to 5×10).',
    expectedOutput: '5 x 1 = 5\n5 x 2 = 10\n...\n5 x 10 = 50',
    hint: 'Use range(1, 11) inside your for loop.',
    starterCode: { python: 'n = 5\nfor i in range(1, 11):\n    print(f"{n} x {i} = {n * i}")\n' }
  },
  'py-while-loop': {
    lang: 'python', title: 'While Loop',
    challenge: 'Keep asking the user for a password until they enter "nexo123".',
    expectedOutput: 'Enter password: hello\nAccess denied.\nEnter password: nexo123\nAccess granted!',
    hint: 'Use a while loop with a condition that checks the input.',
    starterCode: { python: 'password = ""\nwhile password != "nexo123":\n    password = input("Enter password: ")\n    if password == "nexo123":\n        print("Access granted!")\n    else:\n        print("Access denied.")\n' }
  },
  'py-functions': {
    lang: 'python', title: 'Functions',
    challenge: 'Write a function called "greet" that takes a name and returns "Hello, [name]!"',
    expectedOutput: 'Hello, Alice!',
    hint: 'Define with def, use return, then call the function and print the result.',
    starterCode: { python: 'def greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("Alice"))\n' }
  },
  'psc-variables': {
    lang: 'pseudocode', title: 'Pseudocode Variables',
    challenge: 'Declare two INTEGER variables, assign values, and OUTPUT their sum.',
    expectedOutput: 'Sum: 15',
    hint: 'Use DECLARE, ←, and OUTPUT keywords.',
    starterCode: { pseudocode: 'BEGIN\n  DECLARE a : INTEGER\n  DECLARE b : INTEGER\n  a ← 7\n  b ← 8\n  OUTPUT "Sum: ", a + b\nEND' }
  },
  'psc-loop': {
    lang: 'pseudocode', title: 'Pseudocode Loop',
    challenge: 'Write a FOR loop that outputs numbers 1 to 5.',
    expectedOutput: '1\n2\n3\n4\n5',
    hint: 'Use FOR i ← 1 TO 5 / OUTPUT i / NEXT i',
    starterCode: { pseudocode: 'BEGIN\n  FOR i ← 1 TO 5\n    OUTPUT i\n  NEXT i\nEND' }
  }
};

// Merge lesson config with challenge if specified
if (CONFIG.lessonId && CHALLENGES[CONFIG.lessonId]) {
  const ch = CHALLENGES[CONFIG.lessonId];
  CFG.lang = ch.lang;
  CFG.lesson = {
    title: ch.title,
    challenge: ch.challenge,
    expectedOutput: ch.expectedOutput,
    hint: ch.hint,
    starterCode: {
      python: ch.starterCode.python || CFG.lesson.starterCode.python,
      pseudocode: ch.starterCode.pseudocode || CFG.lesson.starterCode.pseudocode,
      javascript: ch.starterCode.javascript || CFG.lesson.starterCode.javascript
    }
  };
}

// =====================================================================
// === STYLES ===
// =====================================================================
const STYLE_ID = 'nxt-styles';
if (!document.getElementById(STYLE_ID)) {
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
:root {
  --nxt-bg: #060906;
  --nxt-surface: #0c110c;
  --nxt-surface-2: #111811;
  --nxt-border: #182218;
  --nxt-text: #d8e8d8;
  --nxt-text-dim: #607a60;
  --nxt-text-muted: #3a4f3a;
  --nxt-green: #2ea84c;
  --nxt-green-light: #4cd96b;
  --nxt-green-dim: #1a5c2a;
  --nxt-teal: #2aaf8f;
  --nxt-teal-dim: #1a6a55;
  --nxt-amber: #d4a040;
  --nxt-amber-light: #e8c060;
  --nxt-amber-dim: #7a5a1a;
  --nxt-purple: #8a5abe;
  --nxt-purple-light: #b07ae0;
  --nxt-rose: #d4606a;
  --nxt-transition: 0.5s cubic-bezier(.22,1,.36,1);
}

.nxt-terminal {
  font-family: 'Courier New', Consolas, monospace;
  background: var(--nxt-bg);
  border: 1px solid var(--nxt-border);
  border-radius: 4px;
  overflow: hidden;
  margin: 1rem 0;
  color: var(--nxt-text);
  font-size: 14px;
  line-height: 1.6;
}

/* HEADER */
.nxt-header {
  display: flex;
  align-items: center;
  padding: 8px 14px;
  background: var(--nxt-surface);
  border-bottom: 1px solid var(--nxt-border);
  gap: 12px;
}
.nxt-dots { display: flex; gap: 6px; }
.nxt-dot { width: 10px; height: 10px; border-radius: 50%; }
.nxt-dot-1 { background: #d4606a; }
.nxt-dot-2 { background: #d4a040; }
.nxt-dot-3 { background: #2ea84c; }
.nxt-lang-badge {
  font-size: 0.7rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--nxt-green);
  border: 1px solid var(--nxt-green-dim);
  padding: 2px 10px;
}
.nxt-header-label {
  margin-left: auto;
  font-size: 0.6rem;
  color: var(--nxt-text-dim);
  letter-spacing: 1px;
  text-transform: uppercase;
}
.nxt-help-btn {
  background: none;
  border: 1px solid var(--nxt-border);
  color: var(--nxt-text-dim);
  width: 22px; height: 22px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 0.7rem;
  font-family: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--nxt-transition);
}
.nxt-help-btn:hover { border-color: var(--nxt-teal-dim); color: var(--nxt-teal); }

/* CHALLENGE PANEL */
.nxt-challenge {
  border-bottom: 1px solid var(--nxt-border);
}
.nxt-challenge-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 14px;
  background: var(--nxt-surface);
  cursor: pointer;
  transition: background var(--nxt-transition);
  user-select: none;
}
.nxt-challenge-header:hover { background: var(--nxt-surface-2); }
.nxt-challenge-label {
  font-size: 0.7rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--nxt-teal);
  display: flex;
  align-items: center;
  gap: 6px;
}
.nxt-challenge-chevron {
  width: 12px; height: 12px;
  transition: transform 0.3s ease;
  color: var(--nxt-text-dim);
}
.nxt-challenge.collapsed .nxt-challenge-chevron { transform: rotate(-90deg); }
.nxt-challenge-body {
  max-height: 300px;
  overflow: hidden;
  transition: max-height 0.3s ease;
  background: var(--nxt-bg);
  border-left: 2px solid var(--nxt-teal-dim);
  margin: 0 14px 0 14px;
}
.nxt-challenge.collapsed .nxt-challenge-body { max-height: 0; }
.nxt-challenge-inner { padding: 10px 14px; }
.nxt-challenge-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--nxt-text);
  margin-bottom: 4px;
}
.nxt-challenge-desc {
  font-size: 0.78rem;
  color: var(--nxt-text-dim);
  line-height: 1.5;
  margin-bottom: 6px;
}
.nxt-challenge-expected {
  font-size: 0.7rem;
  color: var(--nxt-text-muted);
  background: var(--nxt-surface-2);
  padding: 4px 8px;
  border: 1px solid var(--nxt-border);
  font-family: inherit;
  white-space: pre-wrap;
}

/* EDITOR AREA */
.nxt-editor-wrapper {
  position: relative;
  min-height: 200px;
  background: var(--nxt-surface-2);
}
.nxt-editor-gutter {
  position: absolute;
  top: 0; left: 0;
  width: 44px;
  height: 100%;
  background: var(--nxt-surface);
  border-right: 1px solid var(--nxt-border);
  padding: 8px 0;
  text-align: right;
  overflow: hidden;
  user-select: none;
  pointer-events: none;
}
.nxt-gutter-line {
  font-size: 12px;
  line-height: 1.6;
  color: var(--nxt-teal);
  padding-right: 10px;
  opacity: 0.6;
}
.nxt-editor-highlight {
  position: absolute;
  top: 0; left: 44px;
  right: 0;
  bottom: 0;
  padding: 8px 12px;
  font-size: inherit;
  line-height: 1.6;
  font-family: 'Courier New', Consolas, monospace;
  white-space: pre-wrap;
  word-wrap: break-word;
  pointer-events: none;
  color: var(--nxt-text);
  overflow: auto;
}
.nxt-editor-highlight .hl-keyword { color: var(--nxt-purple); }
.nxt-editor-highlight .hl-string { color: var(--nxt-amber); }
.nxt-editor-highlight .hl-comment { color: var(--nxt-text-dim); }
.nxt-editor-highlight .hl-number { color: var(--nxt-teal); }
.nxt-editor-highlight .hl-builtin { color: var(--nxt-green-light); }
.nxt-editor {
  position: relative;
  width: 100%;
  min-height: 200px;
  padding: 8px 12px 8px 52px;
  font-size: inherit;
  line-height: 1.6;
  font-family: 'Courier New', Consolas, monospace;
  background: transparent;
  color: transparent;
  caret-color: var(--nxt-green);
  border: none;
  outline: none;
  resize: vertical;
  white-space: pre-wrap;
  word-wrap: break-word;
  tab-size: 4;
  overflow: auto;
  z-index: 2;
}
.nxt-editor::selection {
  background: rgba(46,168,76,0.2);
  color: transparent;
}
.nxt-editor::-webkit-scrollbar { width: 4px; }
.nxt-editor::-webkit-scrollbar-track { background: transparent; }
.nxt-editor::-webkit-scrollbar-thumb { background: var(--nxt-green-dim); border-radius: 2px; }
.nxt-editor-wrapper .nxt-copy-btn {
  position: absolute;
  top: 6px; right: 6px;
  z-index: 10;
  background: var(--nxt-surface);
  border: 1px solid var(--nxt-border);
  color: var(--nxt-text-dim);
  padding: 3px 8px;
  font-size: 0.65rem;
  cursor: pointer;
  font-family: inherit;
  transition: all var(--nxt-transition);
  opacity: 0;
}
.nxt-editor-wrapper:hover .nxt-copy-btn { opacity: 1; }
.nxt-copy-btn:hover { border-color: var(--nxt-teal-dim); color: var(--nxt-teal); }

/* TOOLBAR */
.nxt-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 14px;
  background: var(--nxt-surface);
  border-top: 1px solid var(--nxt-border);
  border-bottom: 1px solid var(--nxt-border);
  gap: 6px;
  flex-wrap: wrap;
}
.nxt-toolbar-left, .nxt-toolbar-right {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}
.nxt-btn {
  padding: 5px 12px;
  font-size: 0.7rem;
  letter-spacing: 0.5px;
  font-family: 'Courier New', Consolas, monospace;
  border: 1px solid var(--nxt-border);
  background: transparent;
  color: var(--nxt-text-dim);
  cursor: pointer;
  transition: all var(--nxt-transition);
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.nxt-btn:hover { background: var(--nxt-surface-2); color: var(--nxt-text); border-color: var(--nxt-green-dim); }
.nxt-btn-run {
  background: var(--nxt-green);
  color: #060906;
  font-weight: 600;
  border-color: var(--nxt-green);
}
.nxt-btn-run:hover { background: var(--nxt-green-light); color: #060906; }
.nxt-btn-hint { border-color: var(--nxt-amber-dim); color: var(--nxt-amber); }
.nxt-btn-hint:hover { background: rgba(212,160,64,0.1); border-color: var(--nxt-amber); color: var(--nxt-amber-light); }
.nxt-btn.active-hint { background: rgba(212,160,64,0.15); }
.nxt-lang-select {
  background: var(--nxt-bg);
  border: 1px solid var(--nxt-border);
  color: var(--nxt-text-dim);
  font-size: 0.7rem;
  font-family: 'Courier New', Consolas, monospace;
  padding: 4px 8px;
  cursor: pointer;
  outline: none;
  transition: border-color var(--nxt-transition);
}
.nxt-lang-select:focus { border-color: var(--nxt-green-dim); }
.nxt-font-badge {
  font-size: 0.6rem;
  color: var(--nxt-text-muted);
  padding: 2px 6px;
  border: 1px solid var(--nxt-border);
  min-width: 28px;
  text-align: center;
}

/* OUTPUT */
.nxt-output-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 14px;
  background: var(--nxt-surface-2);
  border-bottom: 1px solid var(--nxt-border);
}
.nxt-output-label {
  font-size: 0.7rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--nxt-text-dim);
}
.nxt-output-status {
  font-size: 0.6rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 1px 8px;
  border: 1px solid var(--nxt-border);
  color: var(--nxt-text-muted);
  transition: all var(--nxt-transition);
}
.nxt-output-status.running { border-color: var(--nxt-amber-dim); color: var(--nxt-amber); }
.nxt-output-status.success { border-color: var(--nxt-green-dim); color: var(--nxt-green); }
.nxt-output-status.error { border-color: var(--nxt-rose); color: var(--nxt-rose); }
.nxt-console {
  background: var(--nxt-bg);
  min-height: 120px;
  max-height: 300px;
  overflow-y: auto;
  padding: 10px 14px;
  font-family: 'Courier New', Consolas, monospace;
  font-size: 0.85rem;
  line-height: 1.5;
}
.nxt-console::-webkit-scrollbar { width: 4px; }
.nxt-console::-webkit-scrollbar-track { background: transparent; }
.nxt-console::-webkit-scrollbar-thumb { background: var(--nxt-green-dim); border-radius: 2px; }
.nxt-console-line { padding: 1px 0; white-space: pre-wrap; word-break: break-word; }
.nxt-console-line.out { color: var(--nxt-green-light); }
.nxt-console-line.out::before { content: '→ '; color: var(--nxt-green-dim); }
.nxt-console-line.err { color: var(--nxt-rose); }
.nxt-console-line.err::before { content: '✗ '; }
.nxt-console-line.sys { color: var(--nxt-text-dim); font-size: 0.75rem; }
.nxt-console-line.sys::before { content: '— '; }
.nxt-console-input-wrapper {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 2px 0;
}
.nxt-console-prompt {
  color: var(--nxt-green);
  font-weight: 600;
}
.nxt-console-input {
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--nxt-green-dim);
  color: var(--nxt-green-light);
  font-family: 'Courier New', Consolas, monospace;
  font-size: 0.85rem;
  outline: none;
  flex: 1;
  padding: 2px 4px;
}
.nxt-console-cursor {
  display: inline-block;
  width: 6px;
  height: 1em;
  background: var(--nxt-green);
  animation: nxt-blink 0.8s step-end infinite;
  vertical-align: text-bottom;
  margin-left: 2px;
}
@keyframes nxt-blink { 50% { opacity: 0; } }

/* HINT PANEL */
.nxt-hint-panel {
  border-bottom: 1px solid var(--nxt-border);
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
  background: rgba(212,160,64,0.04);
}
.nxt-hint-panel.open { max-height: 200px; }
.nxt-hint-inner {
  padding: 10px 14px;
  border-left: 2px solid var(--nxt-amber);
  display: flex;
  align-items: flex-start;
  gap: 10px;
}
.nxt-hint-text {
  flex: 1;
  font-size: 0.78rem;
  color: var(--nxt-amber-light);
  line-height: 1.5;
}
.nxt-hint-gotit {
  flex-shrink: 0;
  padding: 4px 12px;
  font-size: 0.65rem;
  letter-spacing: 0.5px;
  font-family: inherit;
  background: transparent;
  border: 1px solid var(--nxt-amber-dim);
  color: var(--nxt-amber);
  cursor: pointer;
  transition: all var(--nxt-transition);
}
.nxt-hint-gotit:hover { background: rgba(212,160,64,0.15); }

/* KEYBOARD SHORTCUTS OVERLAY */
.nxt-shortcuts-overlay {
  display: none;
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 100;
  background: var(--nxt-surface);
  border: 1px solid var(--nxt-border);
  padding: 12px 16px;
  min-width: 260px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.6);
}
.nxt-shortcuts-overlay.open { display: block; }
.nxt-shortcuts-title {
  font-size: 0.7rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--nxt-teal);
  margin-bottom: 8px;
  font-weight: 600;
}
.nxt-shortcut-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 0;
  font-size: 0.75rem;
}
.nxt-shortcut-key {
  background: var(--nxt-bg);
  border: 1px solid var(--nxt-border);
  padding: 1px 8px;
  font-size: 0.65rem;
  color: var(--nxt-text-dim);
  font-family: inherit;
}
.nxt-shortcut-desc { color: var(--nxt-text-dim); }

/* TRACE PANEL (pseudocode) */
.nxt-trace-panel {
  display: none;
  border-top: 1px solid var(--nxt-border);
  background: var(--nxt-surface);
}
.nxt-trace-panel.open { display: flex; }
.nxt-trace-editor { flex: 1; }
.nxt-trace-vars {
  width: 200px;
  border-left: 1px solid var(--nxt-border);
  padding: 10px;
  flex-shrink: 0;
}
.nxt-trace-vars-title {
  font-size: 0.65rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--nxt-teal);
  margin-bottom: 8px;
  font-weight: 600;
}
.nxt-trace-var-row {
  display: flex;
  justify-content: space-between;
  padding: 2px 0;
  font-size: 0.75rem;
}
.nxt-trace-var-name { color: var(--nxt-teal); }
.nxt-trace-var-value { color: var(--nxt-amber); }
.nxt-trace-controls {
  display: flex;
  gap: 6px;
  align-items: center;
  padding: 6px 14px;
  background: var(--nxt-surface-2);
  border-top: 1px solid var(--nxt-border);
}
.nxt-trace-speed {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-left: auto;
  font-size: 0.65rem;
  color: var(--nxt-text-dim);
}
.nxt-trace-speed input[type="range"] {
  width: 80px;
  accent-color: var(--nxt-green);
}

/* RESPONSIVE */
@media(max-width:767px){
  .nxt-terminal { font-size: 12px; }
  .nxt-editor { min-height: 150px; font-size: 12px; }
  .nxt-toolbar-left, .nxt-toolbar-right { width: 100%; justify-content: center; }
  .nxt-trace-panel.open { flex-direction: column; }
  .nxt-trace-vars { width: 100%; border-left: none; border-top: 1px solid var(--nxt-border); }
  .nxt-trace-controls { flex-wrap: wrap; }
  .nxt-trace-speed { margin-left: 0; }
}
`;
  document.head.appendChild(style);
}

// =====================================================================
// === DOM BUILDER ===
// =====================================================================
const NXT = {};

NXT.build = function(mount) {
  const term = document.createElement('div');
  term.className = 'nxt-terminal';
  term.style.position = 'relative';
  term.innerHTML = `
    <div class="nxt-header">
      <div class="nxt-dots">
        <span class="nxt-dot nxt-dot-1"></span>
        <span class="nxt-dot nxt-dot-2"></span>
        <span class="nxt-dot nxt-dot-3"></span>
      </div>
      <span class="nxt-lang-badge" id="nxt-langBadge">Python 3</span>
      <span class="nxt-header-label">NEXO Terminal</span>
      <button class="nxt-help-btn" id="nxt-helpBtn" aria-label="Keyboard shortcuts" title="Keyboard shortcuts">?</button>
      <div class="nxt-shortcuts-overlay" id="nxt-shortcutsOverlay">
        <div class="nxt-shortcuts-title">Shortcuts</div>
        <div class="nxt-shortcut-row"><span class="nxt-shortcut-desc">Run code</span><span class="nxt-shortcut-key">Ctrl+Enter</span></div>
        <div class="nxt-shortcut-row"><span class="nxt-shortcut-desc">Clear output</span><span class="nxt-shortcut-key">Ctrl+L</span></div>
        <div class="nxt-shortcut-row"><span class="nxt-shortcut-desc">Reset to starter</span><span class="nxt-shortcut-key">Ctrl+R</span></div>
        <div class="nxt-shortcut-row"><span class="nxt-shortcut-desc">Indent</span><span class="nxt-shortcut-key">Tab</span></div>
        <div class="nxt-shortcut-row"><span class="nxt-shortcut-desc">Unindent</span><span class="nxt-shortcut-key">Shift+Tab</span></div>
        <div class="nxt-shortcut-row"><span class="nxt-shortcut-desc">Toggle comment</span><span class="nxt-shortcut-key">Ctrl+/</span></div>
        <div class="nxt-shortcut-row"><span class="nxt-shortcut-desc">Increase font</span><span class="nxt-shortcut-key">Ctrl+Plus</span></div>
        <div class="nxt-shortcut-row"><span class="nxt-shortcut-desc">Decrease font</span><span class="nxt-shortcut-key">Ctrl+Minus</span></div>
      </div>
    </div>

    <div class="nxt-challenge" id="nxt-challenge">
      <div class="nxt-challenge-header" id="nxt-challengeHeader">
        <span class="nxt-challenge-label">
          <svg class="nxt-challenge-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          Challenge
        </span>
      </div>
      <div class="nxt-challenge-body">
        <div class="nxt-challenge-inner">
          <div class="nxt-challenge-title" id="nxt-challengeTitle"></div>
          <div class="nxt-challenge-desc" id="nxt-challengeDesc"></div>
          <div class="nxt-challenge-expected" id="nxt-challengeExpected"></div>
        </div>
      </div>
    </div>

    <div class="nxt-hint-panel" id="nxt-hintPanel">
      <div class="nxt-hint-inner">
        <div class="nxt-hint-text" id="nxt-hintText"></div>
        <button class="nxt-hint-gotit" id="nxt-hintGotit">Got it</button>
      </div>
    </div>

    <div class="nxt-editor-wrapper" id="nxt-editorWrapper">
      <div class="nxt-editor-gutter" id="nxt-gutter"></div>
      <div class="nxt-editor-highlight" id="nxt-highlight"></div>
      <textarea class="nxt-editor" id="nxt-editor" spellcheck="false" aria-label="Code editor" autocomplete="off" autocorrect="off" autocapitalize="off" wrap="off"></textarea>
      <button class="nxt-copy-btn" id="nxt-copyBtn" aria-label="Copy code">Copy</button>
    </div>

    <div class="nxt-toolbar" id="nxt-toolbar">
      <div class="nxt-toolbar-left">
        <button class="nxt-btn nxt-btn-run" id="nxt-runBtn" aria-label="Run code">▶ Run</button>
        <button class="nxt-btn" id="nxt-resetBtn" aria-label="Reset code">Reset</button>
        <button class="nxt-btn nxt-btn-hint" id="nxt-hintBtn" aria-label="Show hint">Hint</button>
        <button class="nxt-btn" id="nxt-clearBtn" aria-label="Clear output">Clear</button>
      </div>
      <div class="nxt-toolbar-right">
        <span class="nxt-font-badge" id="nxt-fontBadge">14px</span>
        <select class="nxt-lang-select" id="nxt-langSelect" aria-label="Programming language">
          <option value="python">Python</option>
          <option value="pseudocode">Pseudocode</option>
          <option value="javascript">JavaScript</option>
        </select>
      </div>
    </div>

    <div class="nxt-output-header">
      <span class="nxt-output-label">Output</span>
      <span class="nxt-output-status" id="nxt-outputStatus" role="status">idle</span>
    </div>
    <div class="nxt-console" id="nxt-console" role="log" aria-live="polite">
      <div class="nxt-console-line sys">Terminal ready. Write your code and click Run.</div>
      <span class="nxt-console-cursor" id="nxt-consoleCursor"></span>
    </div>

    <div class="nxt-trace-panel" id="nxt-tracePanel">
      <div class="nxt-trace-vars" id="nxt-traceVars">
        <div class="nxt-trace-vars-title">Variables</div>
        <div id="nxt-traceVarList"><div style="font-size:0.7rem;color:var(--nxt-text-muted);">(no variables yet)</div></div>
      </div>
    </div>
    <div class="nxt-trace-controls" id="nxt-traceControls" style="display:none;">
      <button class="nxt-btn" id="nxt-traceStep">Step</button>
      <button class="nxt-btn" id="nxt-tracePlay">▶ Play</button>
      <div class="nxt-trace-speed">
        <span>Speed</span>
        <input type="range" id="nxt-traceSpeed" min="1" max="5" value="3" step="1">
        <span id="nxt-traceSpeedLabel">Normal</span>
      </div>
    </div>
  `;

  mount.appendChild(term);
  return term;
};

// =====================================================================
// === EDITOR ===
// =====================================================================
NXT.editor = {};

NXT.editor.init = function() {
  NXT.editor.el = document.getElementById('nxt-editor');
  NXT.editor.highlight = document.getElementById('nxt-highlight');
  NXT.editor.gutter = document.getElementById('nxt-gutter');
  NXT.editor.fontSize = CFG.fontSize;

  NXT.editor.updateFontSize();
  NXT.editor.syncScroll();
  NXT.editor.syncHighlight();
  NXT.editor.updateGutter();

  NXT.editor.el.addEventListener('input', function() {
    NXT.editor.syncHighlight();
    NXT.editor.updateGutter();
  });

  NXT.editor.el.addEventListener('scroll', function() {
    NXT.editor.syncScroll();
  });

  // Tab key → 4 spaces
  NXT.editor.el.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = this.selectionStart;
      const end = this.selectionEnd;
      if (e.shiftKey) {
        // Unindent
        const lines = this.value.substring(0, start).split('\n');
        const lineStart = lines.slice(0, -1).join('\n').length + (lines.length > 1 ? 1 : 0);
        const before = this.value.substring(0, lineStart);
        const after = this.value.substring(lineStart);
        const spaces = after.match(/^ {1,4}/);
        if (spaces) {
          this.value = before + after.substring(spaces[0].length);
          this.selectionStart = this.selectionEnd = start - Math.min(spaces[0].length, start - lineStart || 4);
        }
      } else {
        this.value = this.value.substring(0, start) + '    ' + this.value.substring(end);
        this.selectionStart = this.selectionEnd = start + 4;
      }
      NXT.editor.syncHighlight();
      NXT.editor.updateGutter();
    }

    // Auto-indent on Enter
    if (e.key === 'Enter') {
      e.preventDefault();
      const start = this.selectionStart;
      const val = this.value;
      const beforeLine = val.substring(0, start).split('\n');
      const currentLine = beforeLine[beforeLine.length - 1];
      const indent = currentLine.match(/^(\s*)/)[1];
      const extra = currentLine.trim().match(/[:({[]$/) ? '  ' : '';
      const insertion = '\n' + indent + extra;
      this.value = val.substring(0, start) + insertion + val.substring(this.selectionEnd);
      this.selectionStart = this.selectionEnd = start + insertion.length;
      NXT.editor.syncHighlight();
      NXT.editor.updateGutter();
    }
  });

  // Copy button
  document.getElementById('nxt-copyBtn').addEventListener('click', function() {
    const val = NXT.editor.el.value;
    navigator.clipboard.writeText(val).then(() => {
      this.textContent = 'Copied!';
      setTimeout(() => { this.textContent = 'Copy'; }, 1500);
    }).catch(() => {
      // Fallback for file://
      NXT.editor.el.select();
      document.execCommand('copy');
      this.textContent = 'Copied!';
      setTimeout(() => { this.textContent = 'Copy'; }, 1500);
    });
  });

  // Font size controls
  NXT.editor.el.addEventListener('keydown', function(e) {
    if (e.ctrlKey && (e.key === '=' || e.key === '+')) {
      e.preventDefault();
      NXT.editor.adjustFontSize(1);
    }
    if (e.ctrlKey && (e.key === '-' || e.key === '_')) {
      e.preventDefault();
      NXT.editor.adjustFontSize(-1);
    }
  });

  NXT.editor.setValue(NXT.getStarterCode());
};

NXT.editor.adjustFontSize = function(delta) {
  NXT.editor.fontSize = Math.max(11, Math.min(20, NXT.editor.fontSize + delta));
  NXT.editor.updateFontSize();
};

NXT.editor.updateFontSize = function() {
  const px = NXT.editor.fontSize + 'px';
  NXT.editor.el.style.fontSize = px;
  NXT.editor.highlight.style.fontSize = px;
  document.getElementById('nxt-fontBadge').textContent = NXT.editor.fontSize + 'px';
};

NXT.editor.syncScroll = function() {
  const el = NXT.editor.el;
  const hl = NXT.editor.highlight;
  const gt = NXT.editor.gutter;
  hl.scrollTop = el.scrollTop;
  hl.scrollLeft = el.scrollLeft;
  gt.style.transform = 'translateY(' + (-el.scrollTop) + 'px)';
};

NXT.editor.updateGutter = function() {
  const val = NXT.editor.el.value;
  const lines = val.split('\n').length;
  let html = '';
  for (let i = 1; i <= lines; i++) {
    html += '<div class="nxt-gutter-line">' + i + '</div>';
  }
  NXT.editor.gutter.innerHTML = html;
};

NXT.editor.syncHighlight = function() {
  const val = NXT.editor.el.value;
  NXT.editor.highlight.innerHTML = NXT.highlightSyntax(val, NXT.getLang());
};

NXT.editor.getValue = function() {
  return NXT.editor.el.value;
};

NXT.editor.setValue = function(val) {
  NXT.editor.el.value = val;
  NXT.editor.syncHighlight();
  NXT.editor.updateGutter();
};

NXT.getLang = function() {
  return document.getElementById('nxt-langSelect').value;
};

NXT.getLangLabel = function() {
  const map = { python: 'Python 3', pseudocode: 'Pseudocode', javascript: 'JavaScript' };
  return map[NXT.getLang()] || 'Python 3';
};

NXT.getStarterCode = function() {
  const lang = NXT.getLang();
  return CFG.lesson.starterCode[lang] || CFG.lesson.starterCode.python || '';
};

// =====================================================================
// === SYNTAX HIGHLIGHTING ===
// =====================================================================
NXT.highlightSyntax = function(code, lang) {
  const escaped = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  if (lang === 'pseudocode') {
    const pscKeywords = /\b(BEGIN|END|IF|THEN|ELSE|ENDIF|FOR|TO|NEXT|WHILE|DO|ENDWHILE|OUTPUT|INPUT|DECLARE|REPEAT|UNTIL|CASE|OF|OTHERWISE|ENDCASE|RETURN|CONSTANT|PROCEDURE|FUNCTION|ENDPROCEDURE|ENDFUNCTION|TRUE|FALSE|AND|OR|NOT|MOD|DIV|INTEGER|REAL|STRING|CHAR|BOOLEAN|DATE|ARRAY)\b/gi;
    const pscStrings = /"([^"\\]*(?:\\.[^"\\]*)*)"/g;
    const pscComments = /\/\/.*/g;

    return escaped
      .replace(pscComments, '<span class="hl-comment">$&</span>')
      .replace(pscStrings, '<span class="hl-string">$&</span>')
      .replace(pscKeywords, '<span class="hl-keyword">$&</span>');
  }

  // Python / JavaScript
  const keywords = lang === 'javascript'
    ? /\b(function|var|let|const|if|else|else if|for|while|do|switch|case|break|continue|return|typeof|instanceof|try|catch|finally|throw|new|this|class|extends|import|export|default|from|async|await|of|in|true|false|null|undefined|NaN)\b/g
    : /\b(if|elif|else|for|while|def|class|return|print|input|import|from|as|try|except|finally|raise|with|pass|break|continue|lambda|yield|and|or|not|is|in|True|False|None|int|str|float|bool|list|dict|tuple|set|range|len|type|map|filter|zip|enumerate|self|super|match|case|global|nonlocal|del|assert|async|await)\b/g;

  const strings = /"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)'/g;
  const comments = lang === 'javascript' ? /\/\/.*/g : /#.*/g;
  const numbers = /\b(\d+\.?\d*)\b/g;
  const builtins = lang === 'javascript'
    ? /\b(console|Math|JSON|Promise|Array|Object|String|Number|Boolean|Map|Set|Symbol|RegExp|Date|Error|setTimeout|setInterval|fetch|parseInt|parseFloat|isNaN|isFinite|document|window)\b/g
    : /\b(range|len|print|input|int|str|float|bool|list|dict|tuple|set|type|super|self|open|zip|map|filter|enumerate|sorted|reversed|abs|sum|min|max|any|all|isinstance|hasattr|getattr|setattr|dir|vars)\b/g;

  let result = escaped;
  result = result.replace(comments, '<span class="hl-comment">$&</span>');
  result = result.replace(strings, '<span class="hl-string">$&</span>');
  result = result.replace(numbers, '<span class="hl-number">$&</span>');
  result = result.replace(keywords, '<span class="hl-keyword">$&</span>');
  if (lang !== 'pseudocode') {
    result = result.replace(builtins, '<span class="hl-builtin">$&</span>');
  }
  return result;
};

// =====================================================================
// === CONSOLE ===
// =====================================================================
NXT.console = {};

NXT.console.clear = function() {
  const c = document.getElementById('nxt-console');
  c.innerHTML = '';
  NXT.console.appendSys('Output cleared.');
  NXT.console.showCursor();
};

NXT.console.append = function(text, type) {
  const c = document.getElementById('nxt-console');
  if (!text) return;
  const lines = text.split('\n');
  lines.forEach((line, i) => {
    if (i === lines.length - 1 && line === '' && lines.length > 1) return;
    const div = document.createElement('div');
    div.className = 'nxt-console-line ' + (type || 'out');
    div.textContent = line || ' ';
    c.insertBefore(div, c.lastElementChild);
  });
  c.scrollTop = c.scrollHeight;

  // Trim old lines
  const maxLines = CFG.maxOutputLines;
  const allLines = c.querySelectorAll('.nxt-console-line');
  if (allLines.length > maxLines) {
    for (let i = 0; i < allLines.length - maxLines; i++) {
      allLines[i].remove();
    }
  }
};

NXT.console.appendSys = function(text) {
  NXT.console.append(text, 'sys');
};

NXT.console.appendErr = function(text) {
  NXT.console.append(text, 'err');
};

NXT.console.showCursor = function() {
  const c = document.getElementById('nxt-console');
  let cursor = document.getElementById('nxt-consoleCursor');
  if (!cursor) {
    cursor = document.createElement('span');
    cursor.className = 'nxt-console-cursor';
    cursor.id = 'nxt-consoleCursor';
    c.appendChild(cursor);
  }
  c.scrollTop = c.scrollHeight;
};

NXT.console.hideCursor = function() {
  const cursor = document.getElementById('nxt-consoleCursor');
  if (cursor) cursor.remove();
};

NXT.console.setStatus = function(status) {
  const el = document.getElementById('nxt-outputStatus');
  el.className = 'nxt-output-status';
  if (status) el.classList.add(status);
  el.textContent = status || 'idle';
};

// =====================================================================
// === EXECUTION ENGINE — Python (Skulpt) ===
// =====================================================================
NXT.py = {};
NXT.py.running = false;
NXT.py.timeoutId = null;
NXT.py.inputResolve = null;

NXT.py.outputFn = function(text) {
  NXT.console.append(text, 'out');
};

NXT.py.inputFn = function(prompt) {
  return new Promise(function(resolve) {
    NXT.py.inputResolve = resolve;
    NXT.console.hideCursor();
    const wrapper = document.createElement('div');
    wrapper.className = 'nxt-console-input-wrapper';
    wrapper.innerHTML = '<span class="nxt-console-prompt">? ' + prompt + '</span><input class="nxt-console-input" id="nxt-pyInput" autofocus>';
    const c = document.getElementById('nxt-console');
    c.appendChild(wrapper);
    c.scrollTop = c.scrollHeight;

    const input = document.getElementById('nxt-pyInput');
    input.focus();
    input.addEventListener('keydown', function(ev) {
      if (ev.key === 'Enter') {
        const val = this.value;
        wrapper.remove();
        NXT.console.showCursor();
        NXT.py.inputResolve = null;
        resolve(val);
      }
      if (ev.key === 'Escape') {
        wrapper.remove();
        NXT.console.showCursor();
        NXT.py.inputResolve = null;
        resolve('');
      }
    });
  });
};

NXT.py.run = function(code) {
  if (typeof Sk === 'undefined') {
    NXT.console.appendErr('Skulpt is not loaded. Please include Skulpt from CDN.');
    NXT.console.setStatus('error');
    return;
  }

  NXT.py.running = true;
  NXT.console.setStatus('running');
  NXT.console.hideCursor();

  // Timeout safety
  NXT.py.timeoutId = setTimeout(function() {
    if (NXT.py.running) {
      NXT.console.appendErr('Execution timed out (5s limit)');
      NXT.console.setStatus('error');
      NXT.py.running = false;
      NXT.console.showCursor();
    }
  }, 5000);

  const startTime = performance.now();

  Sk.configure({
    output: NXT.py.outputFn,
    inputfun: NXT.py.inputFn,
    read: function(filename) {
      if (Sk.builtinFiles && Sk.builtinFiles.files[filename]) {
        return Sk.builtinFiles.files[filename];
      }
      throw new Error('File not found: ' + filename);
    },
    __future__: Sk.python3
  });

  Sk.misceval.asyncToPromise(function() {
    return Sk.importMainWithBody('<stdin>', false, code, true);
  }).then(function() {
    const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
    NXT.console.appendSys('Program finished (' + elapsed + 's elapsed)');
    NXT.console.setStatus('success');
    NXT.py.running = false;
    clearTimeout(NXT.py.timeoutId);
    NXT.console.showCursor();
  }, function(err) {
    const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
    NXT.console.appendErr(err.toString());
    NXT.console.appendSys('Program finished with errors (' + elapsed + 's elapsed)');
    NXT.console.setStatus('error');
    NXT.py.running = false;
    clearTimeout(NXT.py.timeoutId);
    NXT.console.showCursor();
  });
};

// =====================================================================
// === EXECUTION ENGINE — JavaScript ===
// =====================================================================
NXT.js = {};

NXT.js.run = function(code) {
  NXT.console.setStatus('running');
  NXT.console.hideCursor();
  const startTime = performance.now();

  const logs = [];
  const originalLog = console.log;
  const originalError = console.error;
  const originalWarn = console.warn;

  console.log = function() {
    const args = Array.from(arguments).map(a =>
      typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)
    ).join(' ');
    logs.push({ text: args, type: 'out' });
  };
  console.error = function() {
    const args = Array.from(arguments).map(String).join(' ');
    logs.push({ text: args, type: 'err' });
  };
  console.warn = function() {
    const args = Array.from(arguments).map(String).join(' ');
    logs.push({ text: args, type: 'out' });
  };

  try {
    // Sandbox: restrict access
    const sandbox = {
      console: { log: console.log, error: console.error, warn: console.warn },
      setTimeout: function(fn, ms) { setTimeout(function() { try { fn(); } catch(e) {} }, ms); },
      Math: Math,
      JSON: JSON,
      parseInt: parseInt,
      parseFloat: parseFloat,
      isNaN: isNaN,
      isFinite: isFinite,
      Array: Array,
      Object: Object,
      String: String,
      Number: Number,
      Boolean: Boolean,
      Map: Map,
      Set: Set,
      RegExp: RegExp,
      Date: Date,
      Error: Error,
      Promise: Promise,
    };

    const sandboxEval = new Function(
      'sandbox',
      'with (sandbox) { "use strict"; ' + code + ' }'
    );
    sandboxEval(sandbox);

    const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
    logs.forEach(function(log) {
      NXT.console.append(log.text, log.type);
    });
    NXT.console.appendSys('Program finished (' + elapsed + 's elapsed)');
    NXT.console.setStatus('success');
  } catch (err) {
    logs.forEach(function(log) {
      NXT.console.append(log.text, log.type);
    });
    NXT.console.appendErr(err.toString());
    const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
    NXT.console.appendSys('Program finished with errors (' + elapsed + 's elapsed)');
    NXT.console.setStatus('error');
  }

  console.log = originalLog;
  console.error = originalError;
  console.warn = originalWarn;
  NXT.console.showCursor();
};

// =====================================================================
// === PSEUDOCODE TRACER ===
// =====================================================================
NXT.psc = {};
NXT.psc.running = false;
NXT.psc.paused = false;
NXT.psc.timerId = null;
NXT.psc.currentLine = -1;
NXT.psc.variables = {};
NXT.psc.lines = [];
NXT.psc.ip = 0; // instruction pointer
NXT.psc.loopCounters = {};
NXT.psc.forLoops = [];
NXT.psc.whileStack = [];

NXT.psc.speedMap = { 1: 1000, 2: 600, 3: 350, 4: 200, 5: 100 };

NXT.psc.trace = function(code) {
  NXT.psc.lines = code.split('\n');
  NXT.psc.ip = 0;
  NXT.psc.currentLine = -1;
  NXT.psc.variables = {};
  NXT.psc.loopCounters = {};
  NXT.psc.forLoops = [];
  NXT.psc.whileStack = [];
  NXT.psc.running = true;
  NXT.psc.paused = false;

  document.getElementById('nxt-tracePanel').classList.add('open');
  document.getElementById('nxt-traceControls').style.display = 'flex';
  NXT.console.clear();
  NXT.console.appendSys('Starting pseudocode trace...');

  NXT.psc.updateVarDisplay();
  NXT.psc.step();
};

NXT.psc.step = function() {
  if (!NXT.psc.running) return;

  // Clear previous line highlight
  if (NXT.psc.currentLine >= 0) {
    NXT.psc.clearLineHighlight(NXT.psc.currentLine);
  }

  // Find next executable line
  while (NXT.psc.ip < NXT.psc.lines.length) {
    const line = NXT.psc.lines[NXT.psc.ip];
    const trimmed = line.trim();

    if (trimmed === '' || trimmed.startsWith('//')) {
      NXT.psc.ip++;
      continue;
    }

    NXT.psc.currentLine = NXT.psc.ip;
    NXT.psc.highlightLine(NXT.psc.ip);

    // Parse and execute
    const result = NXT.psc.executeLine(trimmed, NXT.psc.ip);
    NXT.psc.ip++;

    if (result === 'break') {
      // Break out of loops
      NXT.psc.ip = NXT.psc.lines.length;
      break;
    }

    if (result === 'continue') {
      continue;
    }

    if (result === 'stop') {
      NXT.psc.running = false;
      NXT.psc.finish();
      return;
    }

    break;
  }

  if (NXT.psc.ip >= NXT.psc.lines.length || !NXT.psc.running) {
    NXT.psc.finish();
    return;
  }

  if (!NXT.psc.paused) {
    const speed = parseInt(document.getElementById('nxt-traceSpeed').value);
    const delay = NXT.psc.speedMap[speed] || 350;
    NXT.psc.timerId = setTimeout(NXT.psc.step, delay);
  }
};

NXT.psc.executeLine = function(line, lineNum) {
  // DECLARE var : type
  const declareMatch = line.match(/^DECLARE\s+(\w+)\s*:\s*(\w+)/i);
  if (declareMatch) {
    const name = declareMatch[1];
    const type = declareMatch[2].toUpperCase();
    let defaultValue;
    if (type === 'INTEGER' || type === 'REAL') defaultValue = 0;
    else if (type === 'BOOLEAN') defaultValue = false;
    else if (type === 'CHAR') defaultValue = '';
    else defaultValue = '';
    NXT.psc.variables[name] = defaultValue;
    NXT.psc.updateVarDisplay();
    NXT.console.append('Declared ' + name + ' : ' + type, 'out');
    return;
  }

  // var ← value  or  var = value
  const assignMatch = line.match(/^(\w+)\s*(?:←|=)\s*(.+)/);
  if (assignMatch) {
    const name = assignMatch[1];
    const val = NXT.psc.evalExpr(assignMatch[2]);
    NXT.psc.variables[name] = val;
    NXT.psc.updateVarDisplay();
    NXT.console.append(assignMatch[0], 'out');
    return;
  }

  // OUTPUT "text" or OUTPUT expr
  const outMatch = line.match(/^OUTPUT\s+(.+)/i);
  if (outMatch) {
    const val = NXT.psc.evalExpr(outMatch[1]);
    NXT.console.append(String(val), 'out');
    return;
  }

  // INPUT var
  const inMatch = line.match(/^INPUT\s+(\w+)/i);
  if (inMatch) {
    const name = inMatch[1];
    if (NXT.psc.variables[name] === undefined) NXT.psc.variables[name] = '';
    NXT.psc.variables[name] = 0; // simulate input
    NXT.psc.updateVarDisplay();
    NXT.console.append('INPUT ' + name + ' → 0 (simulated)', 'out');
    return;
  }

  // FOR i ← start TO end
  const forMatch = line.match(/^FOR\s+(\w+)\s*(?:←|=)\s*(.+)\s+TO\s+(.+)/i);
  if (forMatch) {
    const varName = forMatch[1];
    const start = NXT.psc.evalExpr(forMatch[2]);
    const end = NXT.psc.evalExpr(forMatch[3]);
    NXT.psc.variables[varName] = start;
    NXT.psc.forLoops.push({ var: varName, end: end, startLine: lineNum, ip: NXT.psc.ip });
    NXT.psc.updateVarDisplay();
    NXT.console.append('FOR ' + varName + ' ← ' + start + ' TO ' + end, 'out');
    return;
  }

  // NEXT var
  const nextMatch = line.match(/^NEXT\s+(\w+)/i);
  if (nextMatch) {
    const varName = nextMatch[1];
    const loop = NXT.psc.forLoops.length > 0 ? NXT.psc.forLoops[NXT.psc.forLoops.length - 1] : null;
    if (loop && loop.var === varName) {
      NXT.psc.variables[varName] = (NXT.psc.variables[varName] || 0) + 1;
      if (NXT.psc.variables[varName] <= loop.end) {
        NXT.psc.ip = loop.ip; // jump back to line after FOR
      } else {
        NXT.psc.forLoops.pop();
      }
      NXT.psc.updateVarDisplay();
      return 'continue';
    }
    return;
  }

  // IF condition THEN
  if (line.match(/^IF\s.+\sTHEN/i)) {
    NXT.console.append(line, 'out');
    return;
  }

  // ELSE
  if (line.match(/^ELSE/i)) {
    NXT.console.append('ELSE', 'out');
    return;
  }

  // ENDIF
  if (line.match(/^ENDIF/i)) {
    return;
  }

  // WHILE condition DO
  const whileMatch = line.match(/^WHILE\s+(.+)\s+DO/i);
  if (whileMatch) {
    NXT.psc.whileStack.push({ condition: whileMatch[1], startIp: NXT.psc.ip, iterations: 0 });
    NXT.console.append('WHILE ' + whileMatch[1] + ' DO', 'out');
    return;
  }

  // ENDWHILE
  if (line.match(/^ENDWHILE/i)) {
    const wl = NXT.psc.whileStack[NXT.psc.whileStack.length - 1];
    if (wl) {
      wl.iterations++;
      if (wl.iterations < 20) {
        NXT.psc.ip = wl.startIp; // loop back
      } else {
        NXT.psc.whileStack.pop();
        NXT.console.append('(max iterations reached)', 'sys');
      }
      return 'continue';
    }
    return;
  }

  // BEGIN / END
  if (line.match(/^BEGIN/i) || line.match(/^END/i)) {
    return;
  }

  // REPEAT / UNTIL
  if (line.match(/^REPEAT/i)) return;
  const untilMatch = line.match(/^UNTIL\s+(.+)/i);
  if (untilMatch) return;

  // Comments
  if (line.startsWith('//')) return;

  // Default: try as expression
  const exprVal = NXT.psc.evalExpr(line);
  if (exprVal !== null) {
    NXT.console.append(String(exprVal), 'out');
    return;
  }
};

NXT.psc.evalExpr = function(expr) {
  if (!expr) return null;
  expr = expr.trim();

  // String literal
  if ((expr.startsWith('"') && expr.endsWith('"')) || (expr.startsWith("'") && expr.endsWith("'"))) {
    return expr.slice(1, -1);
  }

  // Replace variables
  let result = expr;
  for (const v in NXT.psc.variables) {
    const re = new RegExp('\\b' + v + '\\b', 'g');
    const val = NXT.psc.variables[v];
    if (typeof val === 'string') result = result.replace(re, '"' + val + '"');
    else result = result.replace(re, val);
  }

  // Try numeric evaluation with safe subset
  try {
    // Only allow simple arithmetic: + - * / and numbers/parentheses
    if (/^[\d+\-*/().\s]+$/.test(result.replace(/"[^"]*"/g, ''))) {
      const evaled = Function('"use strict"; return (' + result + ')')();
      if (typeof evaled === 'number' && isFinite(evaled)) return evaled;
    }
  } catch(e) {}

  // String concatenation
  const parts = expr.match(/"([^"]*)"|[^,]+/g);
  if (parts && parts.length > 1) {
    return parts.map(p => {
      p = p.trim();
      if (p.startsWith('"') && p.endsWith('"')) return p.slice(1, -1);
      const v = NXT.psc.variables[p];
      return v !== undefined ? String(v) : p;
    }).join('').trim();
  }

  // Just return as a string
  const v = NXT.psc.variables[expr];
  return v !== undefined ? v : expr;
};

NXT.psc.highlightLine = function(lineNum) {
  const editorLines = NXT.editor.el.value.split('\n');
  if (lineNum < 0 || lineNum >= editorLines.length) return;

  const textarea = NXT.editor.el;
  const lines = textarea.value.split('\n');
  let offset = 0;
  for (let i = 0; i < lineNum; i++) {
    offset += lines[i].length + 1;
  }
  const lineLen = lines[lineNum].length;
  textarea.focus();
  textarea.setSelectionRange(offset, offset + lineLen);
};

NXT.psc.clearLineHighlight = function(lineNum) {
  // handled by next highlight
};

NXT.psc.updateVarDisplay = function() {
  const list = document.getElementById('nxt-traceVarList');
  const keys = Object.keys(NXT.psc.variables);
  if (keys.length === 0) {
    list.innerHTML = '<div style="font-size:0.7rem;color:var(--nxt-text-muted);">(no variables yet)</div>';
    return;
  }
  let html = '';
  keys.forEach(function(k) {
    const v = NXT.psc.variables[k];
    const display = typeof v === 'string' ? '"' + v + '"' : String(v);
    html += '<div class="nxt-trace-var-row"><span class="nxt-trace-var-name">' + k + '</span><span class="nxt-trace-var-value">' + display + '</span></div>';
  });
  list.innerHTML = html;
};

NXT.psc.finish = function() {
  NXT.console.appendSys('Trace complete.');
  NXT.console.setStatus('success');
  NXT.console.showCursor();
  NXT.psc.running = false;
  document.getElementById('nxt-tracePlay').textContent = '▶ Play';
  NXT.psc.clearLineHighlight(NXT.psc.currentLine);
};

NXT.psc.stop = function() {
  NXT.psc.running = false;
  NXT.psc.paused = false;
  clearTimeout(NXT.psc.timerId);
  NXT.psc.clearLineHighlight(NXT.psc.currentLine);
  document.getElementById('nxt-tracePlay').textContent = '▶ Play';
};

NXT.psc.togglePause = function() {
  if (!NXT.psc.running) return;
  NXT.psc.paused = !NXT.psc.paused;
  document.getElementById('nxt-tracePlay').textContent = NXT.psc.paused ? '▶ Play' : '⏸ Pause';
  if (!NXT.psc.paused) {
    NXT.psc.step();
  }
};

NXT.psc.stepOnce = function() {
  if (!NXT.psc.running) {
    NXT.psc.trace(NXT.editor.getValue());
    return;
  }
  NXT.psc.paused = true;
  document.getElementById('nxt-tracePlay').textContent = '▶ Play';
  clearTimeout(NXT.psc.timerId);
  NXT.psc.step();
};

// =====================================================================
// === RUN EXECUTION ===
// =====================================================================
NXT.run = function() {
  if (NXT.py.running || NXT.psc.running) return;

  NXT.console.clear();

  const code = NXT.editor.getValue().trim();
  if (!code) {
    NXT.console.appendErr('No code to run.');
    NXT.console.setStatus('error');
    return;
  }

  const lang = NXT.getLang();

  if (lang === 'python') {
    NXT.py.run(code);
  } else if (lang === 'javascript') {
    NXT.js.run(code);
  } else if (lang === 'pseudocode') {
    document.getElementById('nxt-runBtn').textContent = '⏸ Trace';
    NXT.psc.trace(code);
  }
};

NXT.reset = function() {
  if (NXT.py.running) {
    NXT.py.running = false;
    clearTimeout(NXT.py.timeoutId);
    NXT.console.appendSys('Execution stopped.');
  }
  NXT.psc.stop();
  document.getElementById('nxt-runBtn').textContent = '▶ Run';
  NXT.console.clear();
  NXT.editor.setValue(NXT.getStarterCode());
  document.getElementById('nxt-tracePanel').classList.remove('open');
  document.getElementById('nxt-traceControls').style.display = 'none';
};

// =====================================================================
// === LANG SWITCH ===
// =====================================================================
NXT.switchLang = function(lang) {
  document.getElementById('nxt-langSelect').value = lang;
  document.getElementById('nxt-langBadge').textContent = NXT.getLangLabel();
  const isPsc = lang === 'pseudocode';
  document.getElementById('nxt-runBtn').textContent = isPsc ? '▶ Trace' : '▶ Run';
  NXT.editor.setValue(NXT.getStarterCode());
  NXT.console.clear();
  NXT.console.setStatus('idle');
  NXT.console.showCursor();
  document.getElementById('nxt-tracePanel').classList.remove('open');
  document.getElementById('nxt-traceControls').style.display = 'none';
  NXT.psc.stop();
};

// =====================================================================
// === UI EVENTS ===
// =====================================================================
NXT.bindEvents = function() {
  // Run
  document.getElementById('nxt-runBtn').addEventListener('click', NXT.run);

  // Reset
  document.getElementById('nxt-resetBtn').addEventListener('click', NXT.reset);

  // Clear output
  document.getElementById('nxt-clearBtn').addEventListener('click', function() {
    NXT.console.clear();
    NXT.console.setStatus('idle');
  });

  // Hint toggle
  document.getElementById('nxt-hintBtn').addEventListener('click', function() {
    const panel = document.getElementById('nxt-hintPanel');
    const isOpen = panel.classList.toggle('open');
    document.getElementById('nxt-hintBtn').classList.toggle('active-hint', isOpen);
    document.getElementById('nxt-hintText').textContent = CFG.lesson.hint || 'No hint available for this challenge.';
  });

  document.getElementById('nxt-hintGotit').addEventListener('click', function() {
    document.getElementById('nxt-hintPanel').classList.remove('open');
    document.getElementById('nxt-hintBtn').classList.remove('active-hint');
  });

  // Language selector
  document.getElementById('nxt-langSelect').addEventListener('change', function() {
    NXT.switchLang(this.value);
  });

  // Challenge collapse
  document.getElementById('nxt-challengeHeader').addEventListener('click', function() {
    document.getElementById('nxt-challenge').classList.toggle('collapsed');
  });

  // Help / shortcuts
  document.getElementById('nxt-helpBtn').addEventListener('click', function(e) {
    e.stopPropagation();
    document.getElementById('nxt-shortcutsOverlay').classList.toggle('open');
  });
  document.addEventListener('click', function(e) {
    const overlay = document.getElementById('nxt-shortcutsOverlay');
    if (!e.target.closest('#nxt-helpBtn') && !e.target.closest('#nxt-shortcutsOverlay')) {
      overlay.classList.remove('open');
    }
  });

  // Trace controls
  document.getElementById('nxt-tracePlay').addEventListener('click', NXT.psc.togglePause);
  document.getElementById('nxt-traceStep').addEventListener('click', NXT.psc.stepOnce);

  document.getElementById('nxt-traceSpeed').addEventListener('input', function() {
    const labels = { 1: 'Slow', 2: 'Medium', 3: 'Normal', 4: 'Fast', 5: 'Very Fast' };
    document.getElementById('nxt-traceSpeedLabel').textContent = labels[this.value] || 'Normal';
  });

  // Keyboard shortcuts
  NXT.editor.el.addEventListener('keydown', function(e) {
    // Ctrl+Enter → Run
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();
      NXT.run();
    }
    // Ctrl+L → Clear output
    if (e.ctrlKey && e.key === 'l') {
      e.preventDefault();
      NXT.console.clear();
      NXT.console.setStatus('idle');
    }
    // Ctrl+R → Reset
    if (e.ctrlKey && e.key === 'r') {
      e.preventDefault();
      NXT.reset();
    }
    // Ctrl+/ → Toggle comment
    if (e.ctrlKey && e.key === '/') {
      e.preventDefault();
      NXT.editor.toggleComment();
    }
  });

  // Comment toggle
  NXT.editor.toggleComment = function() {
    const el = NXT.editor.el;
    const start = el.selectionStart;
    const val = el.value;
    const beforeCursor = val.substring(0, start);
    const lineStart = beforeCursor.lastIndexOf('\n') + 1;
    const line = val.substring(lineStart, val.indexOf('\n', lineStart) !== -1 ? val.indexOf('\n', lineStart) : val.length);
    const lang = NXT.getLang();
    const commentChar = (lang === 'javascript') ? '//' : '#';

    if (line.trim().startsWith(commentChar)) {
      // Uncomment
      const idx = line.indexOf(commentChar);
      const before = val.substring(0, lineStart + idx);
      const after = val.substring(lineStart + idx + commentChar.length);
      el.value = before + after;
      const newPos = start - commentChar.length;
      el.selectionStart = el.selectionEnd = Math.max(0, newPos);
    } else {
      // Comment
      el.value = val.substring(0, lineStart) + commentChar + val.substring(lineStart);
      el.selectionStart = el.selectionEnd = start + commentChar.length;
    }
    NXT.editor.syncHighlight();
    NXT.editor.updateGutter();
  };
};

// =====================================================================
// === INIT ===
// =====================================================================
NXT.mount = function(containerId) {
  const mount = document.getElementById(containerId) || document.getElementById('nexo-terminal-mount') || document.body;
  NXT.build(mount);
  NXT.editor.init();
  NXT.bindEvents();

  // Set initial challenge
  document.getElementById('nxt-challengeTitle').textContent = CFG.lesson.title;
  document.getElementById('nxt-challengeDesc').textContent = CFG.lesson.challenge;
  document.getElementById('nxt-challengeExpected').textContent = 'Expected: ' + CFG.lesson.expectedOutput;

  // Set language
  NXT.switchLang(CFG.lang);

  // Auto-run
  if (CFG.autoRunOnLoad) {
    setTimeout(NXT.run, 500);
  }
};

// Auto-mount if container exists
if (document.getElementById('nexo-terminal-mount')) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { NXT.mount('nexo-terminal-mount'); });
  } else {
    NXT.mount('nexo-terminal-mount');
  }
}

// Expose for manual mounting
window.NXT = NXT;

})();
