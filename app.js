const CATS={coding:"Coding & Vibe Coding",agents:"Agents & Automation",video:"Video",image:"Image & Design",writing:"Writing & Chat",audio:"Audio & Music",research:"Research",productivity:"Productivity",gaming:"Gaming & Game Dev"};
const STOP=new Set("i my me a an the to for of and or with in on how can want need do make get some is it be that this".split(" "));
let TOOLS=[];const $=s=>document.querySelector(s);
const card=t=>`<div class="card"><div class="cat">${CATS[t.category]}</div><h3>${t.name}</h3><p>${t.desc}</p><div>${t.tags.slice(0,4).map(x=>`<span class="tag">#${x}</span>`).join("")}</div><p style="margin-top:10px"><a href="${t.url}" target="_blank" rel="noopener sponsored">Visit site →</a></p></div>`;
function score(t,q){const ql=q.toLowerCase(),words=ql.split(/[^a-z0-9.]+/).filter(w=>w&&!STOP.has(w));let s=0;
 for(const tag of t.tags){if(ql.includes(tag))s+=tag.includes(" ")?6:4;else for(const w of words)if(w.length>2&&tag.startsWith(w.slice(0,4)))s+=1.5}
 for(const w of words){if(t.name.toLowerCase().includes(w))s+=5;if(t.desc.toLowerCase().includes(w))s+=1;if(t.category.startsWith(w.slice(0,4))||CATS[t.category].toLowerCase().includes(w))s+=3}
 return s}
function render(){const h=decodeURIComponent(location.hash.slice(1));const v=$("#view");
 if(h.startsWith("q=")){const q=h.slice(2);$("#q").value=q;const r=TOOLS.map(t=>[score(t,q),t]).filter(x=>x[0]>0).sort((a,b)=>b[0]-a[0]).slice(0,9);
  v.innerHTML=`<h2>Best AI tools for “${q.replace(/</g,"&lt;")}”</h2>`+(r.length?`<div class="grid">${r.map(x=>card(x[1])).join("")}</div>`:`<p>No match yet. Try different words or <a href="#browse">browse categories</a>.</p>`)}
 else if(h.startsWith("cat=")){const c=h.slice(4);v.innerHTML=`<h2>${CATS[c]}</h2><div class="grid">${TOOLS.filter(t=>t.category==c).map(card).join("")}</div>`}
 else if(h=="browse"){v.innerHTML=`<h2>Browse by category</h2><div class="chips" style="justify-content:flex-start">${Object.entries(CATS).map(([k,n])=>`<a class="chip" href="#cat=${k}">${n} (${TOOLS.filter(t=>t.category==k).length})</a>`).join("")}</div>`}
 else v.innerHTML=`<h3>Try:</h3><div class="chips">${["edit my YouTube videos faster","build an app without coding","make a game","clone my voice for voiceovers","automate my workflow","research papers quickly"].map(e=>`<a class="chip" href="#q=${encodeURIComponent(e)}">${e}</a>`).join("")}</div>`}
fetch("tools.json").then(r=>r.json()).then(d=>{TOOLS=d;$("#count").textContent=d.length;render()});
addEventListener("hashchange",render);
$("#f").onsubmit=e=>{e.preventDefault();const q=$("#q").value.trim();if(q)location.hash="q="+encodeURIComponent(q)};
