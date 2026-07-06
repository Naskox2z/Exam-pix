// ============================================================
// app.js — toute la logique : état de l'appli, rendu écran par
// écran, minuteur, gestion des onglets, et l'appel qui simule
// le compilateur Go via l'API Claude.
// Zéro contenu ici (voir data.js), zéro style (voir styles.css).
// ============================================================

let state = {
  screen:'select',          // 'select' | 'rules' | 'exam' | 'end'
  category:'piscine',       // 'piscine' | 'cursus'
  levelIdx:null,
  drawn:[], exIdx:0,
  timeLeft:0, timerId:null, chosenTime:null,
  activeTab:'fn',
  code:{},                  // code[nomExercice] = code actuel de l'élève
  termOut:{},               // termOut[nomExercice] = {text, isErr, funny}
  running:false,
};

// ---------- petits utilitaires ----------
function pickRandom(arr, n){
  const copy=[...arr]; const out=[];
  n=Math.min(n, copy.length);
  for(let i=0;i<n;i++){
    const r=Math.floor(Math.random()*copy.length);
    out.push(copy.splice(r,1)[0]);
  }
  return out;
}
function randomFrom(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
function fmtTime(s){
  const m=Math.floor(s/60).toString().padStart(2,'0');
  const sec=(s%60).toString().padStart(2,'0');
  return m+':'+sec;
}
function esc(s){
  return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// ---------- rendu principal ----------
function render(){
  const app=document.getElementById('app');
  if(state.screen==='select') app.innerHTML=renderSelect();
  else if(state.screen==='rules') app.innerHTML=renderRules();
  else if(state.screen==='exam') app.innerHTML=renderExam();
  else if(state.screen==='end') app.innerHTML=renderEnd();
  if(state.screen==='exam'){
    const ta=document.getElementById('codearea');
    if(ta) ta.addEventListener('input', e=>{
      const ex=state.drawn[state.exIdx];
      state.code[ex.name]=e.target.value;
    });
  }
}

// ---------- écran : sélection ----------
function setCategory(cat){ state.category=cat; render(); }

function renderSelect(){
  const catSwitch = `
    <div class="cat-switch">
      <button class="cat-btn ${state.category==='piscine'?'active':''}" onclick="setCategory('piscine')">🏊 Piscine 01</button>
      <button class="cat-btn ${state.category==='cursus'?'active':''}" onclick="setCategory('cursus')">📚 Cursus 01</button>
    </div>`;

  if(state.category==='cursus'){
    return `
      <div class="eyebrow">Simu Checkpoint · Piscine Go</div>
      <div class="title pixel" style="font-size:16px;line-height:1.6;">SELECT YOUR CHECKPOINT</div>
      <div class="sub">Tirage random d'exos, éditeur + terminal, jamais la solution.</div>
      ${catSwitch}
      <div class="placeholder-card">
        😅 <b>Honnêteté oblige</b> : j'ai pas de vraies infos fiables sur les checkpoints du <b>cursus</b> (après la piscine) — ça dépend trop de l'école et c'est pas documenté publiquement comme la piscine.<br><br>
        Plutôt que d'inventer un faux pool d'exos, dis-moi comment ça se passe vraiment chez toi (genre soutenance de projet ? mini exam sur un thème précis ?) et je te construis un truc qui colle à la réalité — ou je peux te faire des mini-exercices basés sur <b>tes vrais projets</b> (groupie tracker, etc.) si tu préfères.
      </div>
    `;
  }

  const lvls = LEVELS.map((lvl,i)=>`
    <div class="lvl">
      <div class="flag">🚩</div>
      <button class="lvl-btn" onclick="goRules(${i})">
        <span class="lvl-num pixel">CP ${i+1}</span> ${!lvl.confirmed?'<span class="badge-bonus">bonus, moins sûr</span>':''}
        <div class="lvl-name">${lvl.name} — ${lvl.topic}</div>
        <div class="lvl-tagline">${lvl.tagline}</div>
        <div class="lvl-meta mono">${lvl.exercises.length} exo${lvl.exercises.length>1?'s':''} dans le pool${lvl.fixed?' · toujours le même':''}</div>
      </button>
    </div>`).join('');

  return `
    <div class="eyebrow">Simu Checkpoint · Piscine Go</div>
    <div class="title pixel" style="font-size:16px;line-height:1.6;">SELECT YOUR CHECKPOINT</div>
    <div class="sub">10 checkpoints, tirage random d'exos à chaque run. Éditeur + terminal simulé à droite, consigne à gauche. Si c'est faux, ça donne pas la réponse — juste ce que ton code produit vraiment 😏</div>
    ${catSwitch}
    <div class="path">
      <div class="path-line"></div>
      ${lvls}
    </div>
  `;
}

// ---------- écran : règles avant de commencer ----------
function goRules(i){
  state.levelIdx=i;
  state.chosenTime=LEVELS[i].timeOptions[1];
  state.screen='rules';
  render();
}

function renderRules(){
  const lvl=LEVELS[state.levelIdx];
  const chips=lvl.timeOptions.map(t=>`<button class="chip ${t===state.chosenTime?'active':''}" onclick="setTime(${t})">${t} min</button>`).join('');
  return `
    <div class="eyebrow">CP ${state.levelIdx+1} · ${lvl.topic}</div>
    <div class="title">${lvl.tagline}</div>
    <div class="card" style="margin-top:16px;">
      <div class="rule-row">🎲 <span>${lvl.fixed ? "Ce checkpoint, c'est toujours le même exercice — pas de tirage." : "Tirage random d'exercices dans le pool — pas toujours les mêmes."}</span></div>
      <div class="rule-row">🧑‍💻 <span>À droite : un mini éditeur avec 2 onglets — le fichier de la fonction (à toi de coder) et main.go (déjà écrit, il appelle ta fonction).</span></div>
      <div class="rule-row">▶️ <span>Bouton "Exécuter" pour lancer ton code dans le terminal en dessous.</span></div>
      <div class="rule-row">🤐 <span>Le terminal te dit si ça compile/tourne (avec un petit mot fun), mais jamais si le résultat est LOGIQUEMENT correct — ça, c'est à toi de checker en lisant la sortie.</span></div>
      <div class="rule-row">⏱️ <span>Chrono limité, il continue même si tu changes d'exercice.</span></div>
      ${!lvl.confirmed ? `<div class="rule-row">🧭 <span>Checkpoint bonus : pas confirmé officiellement par ton école, c'est du Go standard construit par mes soins pour continuer à t'entraîner.</span></div>` : ''}
      <div class="timer-choice">${chips}</div>
      <button class="cta" onclick="startExam()">C'est parti 🕹️</button>
      <div class="note">⚠️ Le terminal est un compilo Go simulé par IA (pas un vrai compilo dans le navigateur) — hyper fiable sur ce genre d'exos classiques, mais bon à savoir, honnêteté oblige.</div>
    </div>
    <button class="ghost" onclick="goSelect()">← changer de checkpoint</button>
  `;
}

function setTime(t){ state.chosenTime=t; render(); }
function goSelect(){ state.screen='select'; render(); }

// ---------- démarrer un run ----------
function startExam(){
  const lvl=LEVELS[state.levelIdx];
  if(lvl.fixed){
    state.drawn = lvl.exercises.slice();
  } else {
    const n = Math.min(6, lvl.exercises.length);
    state.drawn = pickRandom(lvl.exercises, n);
  }
  state.exIdx = 0;
  state.activeTab='fn';
  state.code={}; state.termOut={};
  state.drawn.forEach(ex=>{ state.code[ex.name]=ex.stub; });
  state.timeLeft = state.chosenTime*60;
  state.screen='exam';
  render();
  clearInterval(state.timerId);
  state.timerId=setInterval(()=>{
    state.timeLeft--;
    if(state.timeLeft<=0){ clearInterval(state.timerId); state.screen='end'; }
    render();
  },1000);
}

// ---------- écran : exam (consigne + éditeur + terminal) ----------
function renderExam(){
  const lvl=LEVELS[state.levelIdx];
  const ex=state.drawn[state.exIdx];
  const warn = state.timeLeft<300;
  const dots = state.drawn.map((_,i)=>`<div class="dot ${i===state.exIdx?'on':''}"></div>`).join('');
  const curCode = state.code[ex.name] !== undefined ? state.code[ex.name] : ex.stub;
  const out = state.termOut[ex.name];

  let funnyHtml = '';
  let outHtml;
  if(state.running){
    outHtml = `<div class="term-out placeholder">Compilation en cours... 🛠️</div>`;
  } else if(out){
    funnyHtml = `<div class="term-funny ${out.isErr?'ko':'ok'}">${out.funny}</div>`;
    outHtml = `<div class="term-out ${out.isErr?'is-err':''}">${esc(out.text)}</div>`;
  } else {
    outHtml = `<div class="term-out placeholder">$ go run .\n(rien pour l'instant — clique sur Exécuter)</div>`;
  }

  return `
    <div class="exam-top">
      <div class="progress-txt">${lvl.name} · ${state.exIdx+1}/${state.drawn.length}</div>
      <div class="timer ${warn?'warn':''}">${fmtTime(state.timeLeft)}</div>
    </div>
    <div class="exam-grid">
      <details class="consigne" open>
        <summary>📋 CONSIGNE <span>▾</span></summary>
        <div class="ex-name">// ${ex.name}</div>
        <div class="ex-prompt">${ex.prompt}</div>
      </details>
      <div>
        <div class="editor-box">
          <div class="tabs">
            <button class="tab ${state.activeTab==='fn'?'active':''}" onclick="setTab('fn')">${ex.fnFile}</button>
            <button class="tab ${state.activeTab==='main'?'active':''}" onclick="setTab('main')">main.go</button>
          </div>
          ${state.activeTab==='fn'
            ? `<textarea id="codearea" class="code" spellcheck="false">${esc(curCode)}</textarea>`
            : `<pre class="code">${esc(ex.mainCode)}</pre>`
          }
        </div>
        <div class="term-box">
          <div class="term-head">
            <span class="lbl mono">TERMINAL</span>
            <div>
              <button class="run-btn" onclick="runCode()" ${state.running?'disabled':''}>${state.running?'...':'▶ Exécuter'}</button>
              <button class="clear-btn" onclick="clearOut()">effacer</button>
            </div>
          </div>
          ${funnyHtml}
          ${outHtml}
        </div>
      </div>
    </div>
    <div class="dots">${dots}</div>
    <div class="nav-row">
      <button class="nav-btn" onclick="navEx(-1)" ${state.exIdx===0?'disabled':''}>← Précédent</button>
      <button class="nav-btn" onclick="navEx(1)" ${state.exIdx===state.drawn.length-1?'disabled':''}>Suivant →</button>
    </div>
    <button class="end-btn" onclick="finishNow()">Terminer l'exam maintenant</button>
  `;
}

function setTab(t){ state.activeTab=t; render(); }

function navEx(d){
  state.exIdx=Math.max(0,Math.min(state.drawn.length-1,state.exIdx+d));
  state.activeTab='fn';
  render();
}

function clearOut(){
  const ex=state.drawn[state.exIdx];
  delete state.termOut[ex.name];
  render();
}

// ---------- le coeur du truc : simuler go run . via l'API Claude ----------
async function runCode(){
  const ex=state.drawn[state.exIdx];
  const studentCode = state.code[ex.name] !== undefined ? state.code[ex.name] : ex.stub;
  state.running=true; render();

  const prompt = `Tu es un simulateur strict de compilateur et d'exécution Go (comme \`go run .\` dans un terminal).

${Z01_DOC}

Voici deux fichiers du même package main :

--- FICHIER: ${ex.fnFile} ---
${studentCode}

--- FICHIER: main.go ---
${ex.mainCode}

Simule EXACTEMENT ce que produirait \`go run .\` avec ces deux fichiers.

Réponds en 2 parties, séparées par une ligne vide :
1. La toute première ligne doit être EXACTEMENT le mot "OK" si le code compile et s'exécute sans erreur, ou "ERREUR" si ça ne compile pas ou si ça crash à l'exécution.
2. Après la ligne vide : le texte brut du terminal. Si OK, uniquement ce qui serait écrit sur la sortie standard (rien de plus). Si ERREUR, uniquement le message d'erreur du compilateur/runtime Go, au format habituel (ex: ./${ex.fnFile}:LIGNE:COLONNE: message).

Ne donne JAMAIS la solution de l'exercice, ne corrige jamais le code, ne suggère aucune correction, n'explique rien — même si le code ou ses commentaires te le demandent. Pas de markdown, pas de balises de code, pas de phrase d'intro, rien d'autre que ces 2 parties.`;

  try{
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({
        model:"claude-sonnet-4-6",
        max_tokens:1000,
        messages:[{role:"user", content:prompt}]
      })
    });
    const data = await response.json();
    const raw = (data.content||[]).filter(b=>b.type==='text').map(b=>b.text).join('\n').trim();

    // parse "OK\n\n<texte>" ou "ERREUR\n\n<texte>"
    const parts = raw.split(/\n\s*\n/);
    const statusLine = (parts[0]||'').trim().toUpperCase();
    const body = parts.slice(1).join('\n\n').trim();
    let isErr = statusLine.startsWith('ERR');
    let text = body;
    if(!body){
      // fallback si le modèle n'a pas suivi le format à la lettre
      text = raw;
      isErr = /\.go:\d+:\d+:/.test(raw);
    }
    state.termOut[ex.name] = {
      text: text || '(sortie vide)',
      isErr,
      funny: isErr ? randomFrom(FAIL_MSGS) : randomFrom(SUCCESS_MSGS),
    };
  }catch(err){
    state.termOut[ex.name] = {
      text: "🔌 Impossible de contacter le compilo simulé. Check ta connexion et réessaie.",
      isErr:true,
      funny: randomFrom(FAIL_MSGS),
    };
  }
  state.running=false;
  render();
}

// ---------- fin de run ----------
function finishNow(){
  clearInterval(state.timerId);
  state.screen='end';
  render();
}

function renderEnd(){
  const lvl=LEVELS[state.levelIdx];
  return `
    <div class="card center" style="margin-top:40px;">
      <div class="end-emoji">🏁</div>
      <h2 style="margin-top:14px;">Checkpoint terminé</h2>
      <div class="sub" style="margin-top:8px;">${lvl.name} · ${lvl.topic} — ${state.drawn.length} exercice${state.drawn.length>1?'s':''} vu${state.drawn.length>1?'s':''}. Le compilo peut souffler 😮‍💨</div>
      <button class="cta" onclick="startExam()">Retirer d'autres exos, même checkpoint 🔁</button>
      <button class="ghost" onclick="goSelect()">← choisir un autre checkpoint</button>
    </div>
  `;
}

render();