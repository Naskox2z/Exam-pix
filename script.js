// app.js -- le cerveau. Zero contenu (data.js), zero style (styles.css).
// Principe : state = tout ce qui est vrai maintenant. render() regarde
// state et regenere le HTML. Un clic change state, puis rappelle render().

// cle publique "anon", pas un secret, la vraie protection c'est RLS sur Supabase
const SUPABASE_URL = 'https://aigoivpdzcqhczhhbsos.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpZ29pdnBkemNxaGN6aGhic29zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM2OTM3MjUsImV4cCI6MjA5OTI2OTcyNX0.EW9Jx6Pt1_lnLo67mXDN2cx70qQ6udznGFAvZNkv0RY';
const COMPILER_URL = 'https://REMPLACE-MOI.alwaysdata.net'; // l'adresse du site "User Program" ou tourne compiler.go

let LEVELS = []; // rempli par loadLevelsFromSupabase()

async function loadLevelsFromSupabase(){
  const res = await fetch(`${SUPABASE_URL}/rest/v1/exercises?select=*&order=id`, { // les 59 lignes de ta table
    headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` }
  });
  const rows = await res.json();

  const byLevel = {};
  for(const row of rows){
    const ex = { // renomme les colonnes snake_case en camelCase pour le reste du code
      name: row.id,
      title: row.title,
      style: row.style,
      html: row.html,
      fnFile: row.fn_file,
      stub: row.stub,
      mainCursus: row.main_cursus,
      mainPiscine: row.main_piscine,
    };
    (byLevel[row.level] ||= []).push(ex);
  }

  LEVELS = Object.keys(byLevel).sort((a,b)=>a-b).map(lvl => ({
    id: 'n'+lvl,
    name: 'N'+lvl,
    topic: LEVEL_META[lvl].topic,
    tagline: LEVEL_META[lvl].tagline,
    exercises: byLevel[lvl],
  }));
}

let state = {
  screen:'loading',      // 'loading' | 'select' | 'rules' | 'exam' | 'end'
  category:'piscine',    // 'piscine' | 'cursus'
  mode:'practice',       // 'practice' | 'trueexam'
  lang:'en',
  levelIdx:null,
  drawn:[], exIdx:0,
  timeLeft:0, timerId:null, chosenTime:45,
  activeTab:'fn',
  code:{}, termOut:{}, submitOut:{}, running:false, submitting:false,
};

function t(key){ return (STRINGS[key] && STRINGS[key][state.lang]) || key; }

// pioche n trucs au hasard dans un tableau, sans doublons
function pickRandom(arr, n){
  const copy=[...arr]; const out=[];
  n=Math.min(n, copy.length);
  for(let i=0;i<n;i++){ const r=Math.floor(Math.random()*copy.length); out.push(copy.splice(r,1)[0]); }
  return out;
}
function randomFrom(arr){ return arr[Math.floor(Math.random()*arr.length)]; } // pioche 1 seul (pour True Exam)

function fmtTime(s){
  const m=Math.floor(s/60).toString().padStart(2,'0');
  const sec=(s%60).toString().padStart(2,'0');
  return m+':'+sec; // "45:00"
}

// evite que ton code casse l'affichage si y'a des <, >, &
function esc(s){ return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

function localSyntaxCheck(code, fileName){
  const trimmed = (code||'').trim();
  if(trimmed === '') return `./${fileName}:1:1: expected 'package', found 'EOF'`; // fichier vide = erreur garantie
  if(!/^package\s+\w+/.test(trimmed)){ // pas de "package xxx" au debut = pas la peine de demander a l'IA
    const firstToken = trimmed.split(/\s+/)[0] || '';
    return `./${fileName}:1:1: expected 'package', found '${firstToken}'`;
  }
  return null;
}

// rendu principal, appelé a chaque changement
function render(){
  const app=document.getElementById('app');
  let inner='';
  if(state.screen==='loading') inner=renderLoading();
  else if(state.screen==='select') inner=renderSelect();
  else if(state.screen==='rules') inner=renderRules();
  else if(state.screen==='exam') inner=renderExam();
  else if(state.screen==='end') inner=renderEnd();
  app.innerHTML = renderLangSwitch() + inner;

  if(state.screen==='exam'){
    const ta=document.getElementById('codearea'); // recree a chaque render, faut rebrancher la sauvegarde
    if(ta) ta.addEventListener('input', e=>{
      const ex=state.drawn[state.exIdx];
      state.code[ex.name]=e.target.value;
    });
  }
}

function setLang(l){ state.lang=l; render(); }
function renderLangSwitch(){
  return `<div class="lang-switch">
    <button class="lang-btn ${state.lang==='en'?'active':''}" onclick="setLang('en')">EN</button>
    <button class="lang-btn ${state.lang==='fr'?'active':''}" onclick="setLang('fr')">FR</button>
  </div>`;
}

// petit ecran pendant qu'on va chercher les exos sur Supabase
function renderLoading(){
  return `<div class="sub" style="margin-top:40px;">Loading exercises...</div>`;
}

// ---- select ----
function setCategory(c){ state.category=c; render(); }
function setMode(m){ state.mode=m; render(); }

function renderSelect(){
  const catSwitch = `
    <div class="cat-switch">
      <button class="cat-btn ${state.category==='piscine'?'active':''}" onclick="setCategory('piscine')">🏊 ${t('cat_piscine')}</button>
      <button class="cat-btn ${state.category==='cursus'?'active':''}" onclick="setCategory('cursus')">📚 ${t('cat_cursus')}</button>
    </div>`;
  const modeSwitch = `
    <div class="mode-switch">
      <button class="mode-btn ${state.mode==='practice'?'active':''}" onclick="setMode('practice')">${t('mode_practice')}</button>
      <button class="mode-btn ${state.mode==='trueexam'?'active':''}" onclick="setMode('trueexam')">${t('mode_trueexam')}</button>
    </div>`;
  const cursusNote = state.category==='cursus' ? `<div class="note-banner">${t('cursus_note')}</div>` : '';

  if(state.mode==='trueexam'){
    return `
      <div class="eyebrow">${t('select_eyebrow')}</div>
      <div class="title glow">True Exam</div>
      <div class="sub">${t('select_sub')}</div>
      ${catSwitch}${modeSwitch}${cursusNote}
      <div class="card" style="margin-top:18px;">
        <div class="rule-row">🎲 <span>One random exercise drawn per level, N1 through N10, in order.</span></div>
        <div class="rule-row">⏭️ <span>No going back once you move to "next" — just like the real exam.</span></div>
        <div class="timer-choice">${[20,30,45,60].map(mn=>`<button class="chip ${mn===state.chosenTime?'active':''}" onclick="setTime(${mn})">${mn} min</button>`).join('')}</div>
        <button class="cta" onclick="startTrueExam()">${t('rules_cta')}</button>
      </div>
    `;
  }

  const lvls = LEVELS.map((lvl,i)=>`
    <div class="lvl">
      <div class="lvl-dot">N${i+1}</div>
      <button class="lvl-btn" onclick="goRules(${i})">
        <div class="lvl-name">${lvl.name} — ${lvl.topic}</div>
        <div class="lvl-tagline">${lvl.tagline}</div>
        <div class="lvl-meta mono">${lvl.exercises.length} exercises</div>
      </button>
    </div>`).join('');

  return `
    <div class="eyebrow">${t('select_eyebrow')}</div>
    <div class="title glow">Select a level</div>
    <div class="sub">${t('select_sub')}</div>
    ${catSwitch}${modeSwitch}${cursusNote}
    <div class="path">${lvls}</div>
  `;
}

// ---- rules ----
function goRules(i){ state.levelIdx=i; state.screen='rules'; render(); }
function setTime(mn){ state.chosenTime=mn; render(); }
function goSelect(){ state.screen='select'; render(); }

function renderRules(){
  const lvl=LEVELS[state.levelIdx];
  const chips=[20,30,45,60].map(mn=>`<button class="chip ${mn===state.chosenTime?'active':''}" onclick="setTime(${mn})">${mn} min</button>`).join('');
  return `
    <div class="eyebrow">${lvl.name} · ${lvl.topic}</div>
    <div class="title glow">${lvl.tagline}</div>
    <div class="card" style="margin-top:16px;">
      <div class="rule-row">🎲 <span>${t('rules_practice_1')}</span></div>
      <div class="rule-row">🧑‍💻 <span>${t('rules_editor_fn')}</span></div>
      <div class="rule-row">▶️ <span>${t('rules_run')}</span></div>
      <div class="rule-row">🤐 <span>${t('rules_honesty')}</span></div>
      <div class="rule-row">⏱️ <span>${t('rules_timer')}</span></div>
      <div class="timer-choice">${chips}</div>
      <button class="cta" onclick="startPractice()">${t('rules_cta')}</button>
      <div class="note">${t('rules_note')}</div>
    </div>
    <button class="ghost" onclick="goSelect()">${t('change_level')}</button>
  `;
}

// ---- demarrage d'un run ----
function startPractice(){
  const lvl=LEVELS[state.levelIdx];
  const n=Math.min(6, lvl.exercises.length);
  state.drawn=pickRandom(lvl.exercises, n);
  beginExam();
}
function startTrueExam(){
  state.drawn = LEVELS.map(lvl => randomFrom(lvl.exercises)); // 1 exo par niveau
  beginExam();
}
function beginExam(){
  state.exIdx=0; state.activeTab='fn'; state.code={}; state.termOut={}; state.submitOut={};
  state.drawn.forEach(ex=>{ state.code[ex.name]=ex.stub; }); // stub = "" toujours, comme en vrai exam
  state.timeLeft=state.chosenTime*60;
  state.screen='exam'; render();
  clearInterval(state.timerId);
  state.timerId=setInterval(()=>{
    state.timeLeft--;
    if(state.timeLeft<=0){ clearInterval(state.timerId); state.screen='end'; render(); return; }
    tickTimerDisplay();
  },1000);
}

// touche QUE le chiffre du chrono -- un render complet ici recree le
// textarea chaque seconde et te vire le clavier en pleine frappe
function tickTimerDisplay(){
  if(state.screen!=='exam') return;
  const el=document.querySelector('.timer');
  if(!el) return;
  el.textContent=fmtTime(state.timeLeft);
  el.classList.toggle('warn', state.timeLeft<300);
}

// ---- exam ----
function renderExam(){
  const ex=state.drawn[state.exIdx];
  const warn=state.timeLeft<300;
  const isTrueExam = state.mode==='trueexam';
  const dots = isTrueExam ? '' : state.drawn.map((_,i)=>`<div class="dot ${i===state.exIdx?'on':''}"></div>`).join('');
  const curCode = state.code[ex.name]!==undefined ? state.code[ex.name] : ex.stub;
  const out = state.termOut[ex.name];
  const subOut = state.submitOut[ex.name];
  const hasMain = ex.style==='function' && ex.mainCursus;

  let outHtml;
  if(state.running){
    outHtml = `<div class="term-out placeholder">${t('compiling')}</div>`;
  } else if(out){
    outHtml = `<div class="term-out ${out.isErr?'is-err':''}">${esc(out.text)}</div>`;
  } else {
    outHtml = `<div class="term-out placeholder">${esc(t('term_placeholder'))}</div>`;
  }

  // panneau Submit : separe de la console Run expres (Run = je regarde,
  // Submit = je me lance, badge + message a indice cache)
  let submitHtml = '';
  if(state.submitting){
    submitHtml = `<div class="submit-panel pending"><div class="submit-status pending">${t('compiling')}</div></div>`;
  } else if(subOut){
    submitHtml = `<div class="submit-panel ${subOut.isErr?'ko':'ok'}">
      <div class="submit-status">${subOut.isErr ? t('status_failed') : t('status_succeeded')} <span class="dot-status"></span></div>
      <div class="submit-funny">${subOut.funny}</div>
    </div>`;
  }

  const tabsHtml = hasMain ? `
    <div class="tabs">
      <button class="tab ${state.activeTab==='fn'?'active':''}" onclick="setTab('fn')">${ex.fnFile}</button>
      <button class="tab ${state.activeTab==='main'?'active':''}" onclick="setTab('main')">main.go</button>
    </div>` : `
    <div class="tabs"><button class="tab active">${ex.fnFile}</button></div>`;

  const displayMain = (state.category==='piscine' && ex.mainPiscine) ? ex.mainPiscine : ex.mainCursus;
  const editorHtml = (hasMain && state.activeTab==='main')
    ? `<pre class="code">${esc(displayMain)}</pre>`
    : `<textarea id="codearea" class="code" spellcheck="false">${esc(curCode)}</textarea>`;

  const topBar = isTrueExam ? `
    <div class="te-topbar">
      <div>
        <div class="te-title">${t('te_title')}</div>
        <div class="te-status">${t('te_status')} ${state.exIdx+1}/10</div>
      </div>
      <div class="te-actions">
        <button class="btn-small" onclick="navEx(1)" ${state.exIdx>=state.drawn.length-1?'disabled':''}>${t('te_next')}</button>
        <button class="btn-small" onclick="startTrueExam()">${t('te_restart')}</button>
      </div>
    </div>` : '';

  return `
    <div class="exam-top">
      <div class="progress-txt">${isTrueExam ? '' : (LEVELS[state.levelIdx].name+' · '+(state.exIdx+1)+'/'+state.drawn.length)}</div>
      <div class="timer ${warn?'warn':''}">${fmtTime(state.timeLeft)}</div>
    </div>
    ${topBar}
    <div class="exam-grid">
      <div class="consigne">
        <div class="ex-title">${ex.title}</div>
        <div class="ex-html">${ex.html}</div>
        ${!hasMain && ex.style==='function' ? `<div class="note">${t('no_main')}</div>` : ''}
      </div>
      <div class="editor-side">
        <div class="editor-box">
          ${tabsHtml}
          ${editorHtml}
        </div>
        <div class="term-box">
          <div class="term-head">
            <span class="lbl mono">console</span>
            <div>
              <button class="run-btn" onclick="runCode()" ${state.running?'disabled':''}>${state.running?'...':t('run_btn')}</button>
              <button class="submit-btn" onclick="submitCode()" ${state.submitting?'disabled':''}>${state.submitting?'...':t('submit_btn')}</button>
              <button class="clear-btn" onclick="clearOut()">${t('clear_btn')}</button>
            </div>
          </div>
          ${outHtml}
        </div>
        ${submitHtml}
      </div>
    </div>
    ${dots ? `<div class="dots">${dots}</div>` : ''}
    ${!isTrueExam ? `
    <div class="nav-row">
      <button class="nav-btn" onclick="navEx(-1)" ${state.exIdx===0?'disabled':''}>${t('prev_btn')}</button>
      <button class="nav-btn" onclick="navEx(1)" ${state.exIdx===state.drawn.length-1?'disabled':''}>${t('next_btn')}</button>
    </div>` : ''}
    <button class="end-btn" onclick="finishNow()">${t('finish_now')}</button>
  `;
}

function setTab(tab){ state.activeTab=tab; render(); }
function navEx(d){
  state.exIdx=Math.max(0,Math.min(state.drawn.length-1,state.exIdx+d));
  state.activeTab='fn'; render();
}
function clearOut(){
  delete state.termOut[state.drawn[state.exIdx].name];
  delete state.submitOut[state.drawn[state.exIdx].name];
  render();
}

// ---- categorise l'erreur pour choisir le bon groupe de messages fun ----
function categorizeError(text){
  const s = text.toLowerCase();
  if(/missing return|not enough return|not all code paths return/.test(s)) return 'missing_return';
  if(/undefined:/.test(s)) return 'undefined';
  if(/declared and not used|imported and not used/.test(s)) return 'unused';
  if(/syntax error|unexpected|expected declaration/.test(s)) return 'syntax';
  if(/cannot use|mismatched types|cannot convert/.test(s)) return 'type_mismatch';
  return 'generic';
}

// ---- simule go run . via l'API Claude ----
async function compileAndCheck(ex, studentCode){
  const localErr = localSyntaxCheck(studentCode, ex.fnFile);
  if(localErr) return { text: localErr, isErr:true, funny: randomFrom(FAIL_MSGS.syntax[state.lang]) };

  const isFn = ex.style==='function' && ex.mainCursus;
  const mainForRun = (state.category==='piscine' && ex.mainPiscine) ? ex.mainPiscine : ex.mainCursus;

  try{
    const res = await fetch(`${COMPILER_URL}/compile`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fnFile: ex.fnFile, studentCode, mainCode: mainForRun, isFunction: !!isFn }),
    });
    const data = await res.json(); // { isErr, text } -- deja la vraie sortie du compilo, rien a parser

    const cat = data.isErr ? categorizeError(data.text) : null;
    return {
      text: data.text || t('empty_output'),
      isErr: data.isErr,
      funny: data.isErr ? randomFrom(FAIL_MSGS[cat][state.lang]) : randomFrom(SUCCESS_MSGS[state.lang]),
    };
  }catch(err){
    return { text:t('cors_error'), isErr:true, funny: randomFrom(FAIL_MSGS.generic[state.lang]) };
  }
}

async function runCode(){
  const ex=state.drawn[state.exIdx];
  const studentCode = state.code[ex.name]!==undefined ? state.code[ex.name] : ex.stub;
  state.running=true; render();
  state.termOut[ex.name] = await compileAndCheck(ex, studentCode);
  state.running=false; render();
}

async function submitCode(){
  const ex=state.drawn[state.exIdx];
  const studentCode = state.code[ex.name]!==undefined ? state.code[ex.name] : ex.stub;
  state.submitting=true; render();
  state.submitOut[ex.name] = await compileAndCheck(ex, studentCode);
  state.submitting=false; render();
}

// ---- end ----
function finishNow(){ clearInterval(state.timerId); state.screen='end'; render(); }
function renderEnd(){
  const isTrueExam = state.mode==='trueexam';
  return `
    <div class="card center" style="margin-top:40px;">
      <div class="end-emoji">🏁</div>
      <h2 style="margin-top:14px;">${t('end_title')}</h2>
      <div class="sub" style="margin-top:8px;">${state.drawn.length} exercises seen.</div>
      ${!isTrueExam ? `<button class="cta" onclick="startPractice()">${t('end_cta_practice')}</button>` : `<button class="cta" onclick="startTrueExam()">${t('rules_cta')}</button>`}
      <button class="ghost" onclick="goSelect()">${t('end_ghost')}</button>
    </div>
  `;
}

render(); // affiche l'ecran de chargement
loadLevelsFromSupabase() // puis on va chercher les vrais exos avant d'afficher select
  .then(() => { state.screen='select'; render(); })
  .catch(() => { document.getElementById('app').innerHTML = '<div class="sub">Could not load exercises. Check your connection and reload the page.</div>'; });