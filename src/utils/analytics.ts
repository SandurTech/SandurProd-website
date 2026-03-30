export const initAnalytics = (consent: { analytics: boolean; marketing: boolean }) => {
  if (!consent.analytics && !consent.marketing) {
    console.log('[Analytics] Blocked by GDPR preferences.')
    return
  }

  console.log('[Analytics] Initialized tracking.')

  // Inject Microsoft Clarity if consent is given
  if (consent.analytics || consent.marketing) {
    if (!document.getElementById('clarity-script')) {
      const CLARITY_ID = 'w3ry1lzqpu'
      const script = document.createElement('script')
      script.id = 'clarity-script'
      script.type = 'text/javascript'
      script.innerHTML = `
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${CLARITY_ID}");
      `
      document.head.appendChild(script)
    }
  }
}
