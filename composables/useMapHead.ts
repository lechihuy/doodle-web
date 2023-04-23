export const useMapHead = () => {
  useHead({
    link: [
      { rel: 'stylesheet', href: 'https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.23.0/maps/maps.css', },
    ],
    script: [
      {
        src: 'https://api.tomtom.com/maps-sdk-for-web/cdn/plugins/SearchBox/3.1.3-public-preview.0/SearchBox-web.js',
        tagPosition: 'head'
      },
      {
        children: '(function(){ window.SS = window.SS || {}; SS.Require = function (callback){ if (typeof callback === \'function\') { if (window.SS && SS.EventTrack) { callback(); } else { var siteSpect = document.getElementById(\'siteSpectLibraries\'); var head = document.getElementsByTagName(\'head\')[0]; if (siteSpect === null && typeof head !== \'undefined\') { siteSpect = document.createElement(\'script\'); siteSpect.type = \'text/javascript\'; siteSpect.src = \'/__ssobj/core.js+ssdomvar.js+generic-adapter.js\';siteSpect.async = true; siteSpect.id = \'siteSpectLibraries\'; head.appendChild(siteSpect); } if (window.addEventListener){ siteSpect.addEventListener(\'load\', callback, false); } else { siteSpect.attachEvent(\'onload\', callback, false); } } } };})();',
        tagPosition: 'head',
      },
      { src: 'https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.23.0/maps/maps-web.min.js', tagPosition: 'bodyClose' },
    ]
  })
}