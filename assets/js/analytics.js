// NIVORA — GA4 optional integration. No request is sent until a Measurement ID is configured and consent is granted.
(function(){
  const id = window.NIVORA_CONFIG?.googleAnalyticsId || "";
  const consent = () => localStorage.getItem("nivora_tracking_consent") === "granted";
  let ready = false;
  function load(){
    if(!id || !consent() || ready) return;
    ready = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function(){window.dataLayer.push(arguments)};
    window.gtag("js", new Date());
    window.gtag("config", id, {send_page_view:true});
    const s=document.createElement("script"); s.async=true; s.src=`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`; document.head.appendChild(s);
  }
  window.NivoraAnalytics={load,event(name,params={}){load();if(window.gtag && consent())window.gtag("event",name,params)}};
  window.addEventListener("nivora-consent-granted",load);
  load();
})();
