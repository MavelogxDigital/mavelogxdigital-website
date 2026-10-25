/* Site QA. Needs a build served at localhost:4321 first:
     npm run build && npm run preview
   Run with: npm run qa  (CommonJS, hence .cjs, since package.json is type:module) */
const {chromium}=require('playwright');
const ROUTES=['/','/services/','/work/','/about/','/process/','/contact/','/insights/','/privacy/','/terms/',
 '/work/floks-speaks/','/work/syndei-embassy/','/work/mavelogx-enterprise/','/work/mavels-corner/',
 '/insights/ai-augmented-studio/','/insights/canada-ghana-corridor/','/insights/positioning-before-logo/'];
function lum(c){const m=c.match(/[\d.]+/g);if(!m)return 0;const [r,g,b]=m.slice(0,3).map(Number).map(v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)});return 0.2126*r+0.7152*g+0.0722*b}
function ratio(a,b){const l1=lum(a),l2=lum(b);return (Math.max(l1,l2)+0.05)/(Math.min(l1,l2)+0.05)}
(async()=>{
 const b=await chromium.launch(); const fails=[]; let checks=0;
 for(const route of ROUTES){
  for(const [w,sch] of [[360,'dark'],[768,'dark'],[1440,'dark'],[1440,'light']]){
   const p=await b.newPage({viewport:{width:w,height:1000},colorScheme:sch});
   const errs=[]; p.on('pageerror',e=>errs.push(String(e)));
   const r=await p.goto('http://localhost:4321'+route,{waitUntil:'networkidle'});
   await p.evaluate(()=>{document.querySelectorAll('img').forEach(i=>i.loading='eager');document.querySelectorAll('.rv').forEach(e=>e.classList.add('in'));});
   await p.waitForTimeout(500);
   // Scroll so sticky chrome is in its scrolled state. A nav that only looks
   // right at the top of the page is a bug this check exists to catch.
   await p.evaluate(()=>scrollTo(0,600));
   await p.waitForTimeout(350);
   const d=await p.evaluate(()=>{
     const t=document.body.innerText;
     const hs=[...document.querySelectorAll('h1,h2,h3,h4')].map(h=>+h.tagName[1]);
     let skip=false; for(let i=1;i<hs.length;i++) if(hs[i]-hs[i-1]>1) skip=true;
     const small=[...document.querySelectorAll('a,button,summary,input[type=checkbox]+span')]
       .filter(e=>{const r=e.getBoundingClientRect();
         if(!(r.width>0)) return false;
         const p=e.closest('p');
         if(p && p.textContent.trim().length > e.textContent.trim().length + 12) return false; // inline in prose
         return r.width<24||r.height<24}).length;
     const labels=[...document.querySelectorAll('input:not([type=hidden]),textarea,select')]
       .filter(e=>!e.labels?.length&&!e.getAttribute('aria-label')).length;
     const txt=[...document.querySelectorAll('p,li,h1,h2,h3,span,a')].slice(0,160)
       .filter(e=>!e.closest('.sweep'))       // swept brand text: logotype treatment, WCAG 1.4.3
       .map(e=>{
       const c=getComputedStyle(e);
       const parse=v=>{const m=v.match(/[\d.]+/g);return m?{r:+m[0],g:+m[1],b:+m[2],a:m[3]!==undefined?+m[3]:1}:null};
       let n=e,stack=[];
       while(n){const bgc=parse(getComputedStyle(n).backgroundColor);
         if(bgc&&bgc.a>0){stack.push(bgc); if(bgc.a===1)break;} n=n.parentElement;}
       let out={r:255,g:255,b:255};
       for(let i=stack.length-1;i>=0;i--){const s2=stack[i];
         out={r:s2.r*s2.a+out.r*(1-s2.a),g:s2.g*s2.a+out.g*(1-s2.a),b:s2.b*s2.a+out.b*(1-s2.a)};}
       const bg=`rgb(${Math.round(out.r)}, ${Math.round(out.g)}, ${Math.round(out.b)})`;
       return {fg:c.color,bg,size:parseFloat(c.fontSize),w:+c.fontWeight,txt:(e.textContent||'').trim().slice(0,28)};
     }).filter(x=>x.txt);
     return {t,hs:hs.length,skip,small,labels,txt,
       // The voice line and the WhatsApp line are different numbers. Labelling
       // one with the other is the failure this guards (11.4, as amended).
       miswired:[...document.querySelectorAll('a[href^="https://wa.me/"]')]
           .filter(a=>/\d{3}/.test(a.textContent||'')).length
         +[...document.querySelectorAll('a[href^="tel:"]')]
           .filter(a=>/233/.test(a.getAttribute('href')||'')).length,
       h1:document.querySelectorAll('h1').length,
       lang:document.documentElement.lang,
       skiplink:!!document.querySelector('.skip'),
       noalt:[...document.querySelectorAll('img')].filter(i=>!i.hasAttribute('alt')).length,
       brk:[...document.querySelectorAll('img')].filter(i=>i.complete&&i.naturalWidth===0).length,
       nodim:[...document.querySelectorAll('img')].filter(i=>!i.getAttribute('width')&&!i.closest('.cs-frame')).length,
       of:document.documentElement.scrollWidth>document.documentElement.clientWidth+1,
       emptyhref:[...document.querySelectorAll('a')].filter(a=>{const h=a.getAttribute('href');return !h||h==='#'}).length};
   });
   const tag=`${route} @${w}/${sch}`;
   if(r.status()!==200) fails.push(`${tag}: HTTP ${r.status()}`);
   if(d.of) fails.push(`${tag}: horizontal overflow`);
   if(d.h1!==1) fails.push(`${tag}: ${d.h1} h1 elements`);
   if(d.skip) fails.push(`${tag}: heading level skipped`);
   if(d.lang!=='en') fails.push(`${tag}: html lang="${d.lang}"`);
   if(!d.skiplink) fails.push(`${tag}: no skip link`);
   if(d.noalt) fails.push(`${tag}: ${d.noalt} img without alt`);
   if(d.brk) fails.push(`${tag}: ${d.brk} broken img`);
   if(d.nodim) fails.push(`${tag}: ${d.nodim} img without width/height`);
   if(d.labels) fails.push(`${tag}: ${d.labels} unlabelled form control`);
   if(d.small) fails.push(`${tag}: ${d.small} target under 24px (WCAG 2.2)`);
   if(d.emptyhref) fails.push(`${tag}: ${d.emptyhref} empty href`);
   if(/[↗→←]|—|–/.test(d.t)) fails.push(`${tag}: arrow or dash in text`);
   if(/budget|affordab|price tag|without the premium/i.test(d.t)) fails.push(`${tag}: retired phrase`);
   if(d.miswired) fails.push(`${tag}: ${d.miswired} contact link showing a number it should not`);
   if(errs.length) fails.push(`${tag}: JS error ${errs[0].slice(0,60)}`);
   for(const x of d.txt){ checks++;
     const big=x.size>=24||(x.size>=18.66&&x.w>=700); const need=big?3:4.5;
     const rr=ratio(x.fg,x.bg);
     if(rr<need) fails.push(`${tag}: contrast ${rr.toFixed(2)}:1 (need ${need}) on "${x.txt}" ${x.size}px`);
   }
   await p.close();
  }
 }
 console.log(`routes: ${ROUTES.length}  viewport/theme combos: ${ROUTES.length*4}  contrast pairs: ${checks}`);
 console.log(fails.length? 'FAILURES ('+fails.length+'):\n'+[...new Set(fails)].slice(0,40).map(f=>'  '+f).join('\n') : 'ALL CHECKS PASS');
 await b.close();
})();
