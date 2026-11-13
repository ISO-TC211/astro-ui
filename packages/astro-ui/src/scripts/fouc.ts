/**
 * Inline dark-mode FOUC-prevention script, byte-identical port of the
 * jekyll-theme-isotc211 head.html inline script. Runs before paint so the
 * `dark` class is present on <html> from the first frame; the
 * 'iso-tc211-theme' localStorage key matches the legacy theme so existing
 * visitors keep their preference.
 */
export const foucScript =
  ";(function(){try{var s=localStorage.getItem('iso-tc211-theme');if(s==='dark'||(!s&&window.matchMedia('(prefers-color-scheme:dark)').matches))document.documentElement.classList.add('dark')}catch(e){}})();"
