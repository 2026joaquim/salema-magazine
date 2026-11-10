/* Salema Eco Camp Magazine — funciona com pouca rede.
   Vai sempre buscar a versão nova à internet; só usa a cópia guardada
   quando não há ligação. Assim, as atualizações aparecem logo. */
const CACHE="salema-magazine-v61";
self.addEventListener("install",e=>self.skipWaiting());
self.addEventListener("activate",e=>e.waitUntil(self.clients.claim()));
self.addEventListener("fetch",e=>{
  const req=e.request;
  if(req.method!=="GET" || new URL(req.url).origin!==location.origin) return;
  e.respondWith(
    fetch(req,{cache:"no-cache"}).then(res=>{
      if(res.ok){ const copy=res.clone(); caches.open(CACHE).then(c=>c.put(req,copy)); }
      return res;
    }).catch(()=>caches.match(req).then(r=>r||caches.match("./index.html")))
  );
});

/* Notificações no telemóvel (Web Push) */
const API_PUSH="https://script.google.com/macros/s/AKfycbwcXxfyPsNfE6cO_4IsJJ5up2GTQ2XLut238jjGNxwIr9FLgY1kww-dSjczTJaNJ-Y1/exec";
self.addEventListener("push",e=>{
  e.waitUntil((async()=>{
    let d={titulo:"Salema Eco Camp Magazine",texto:"Há novidades no Magazine.",url:"./"};
    try{ const r=await fetch(API_PUSH+"?acao=ultima&t="+Date.now(),{cache:"no-store"}); const j=await r.json(); if(j&&j.titulo) d=j; }catch(_){}
    try{ if(self.navigator&&self.navigator.setAppBadge) await self.navigator.setAppBadge(1); }catch(_){}
    await self.registration.showNotification(d.titulo,{body:d.texto||"",icon:"icone-192.png",badge:"icone-192.png",tag:"magazine",renotify:true,data:{url:d.url||"./"}});
  })());
});
self.addEventListener("notificationclick",e=>{
  e.notification.close();
  const url=(e.notification.data&&e.notification.data.url)||"./";
  e.waitUntil((async()=>{
    const ws=await clients.matchAll({type:"window",includeUncontrolled:true});
    for(const w of ws){ if(w.url.startsWith(self.registration.scope)&&"focus" in w){ await w.focus(); return; } }
    await clients.openWindow(url);
  })());
});
