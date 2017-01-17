!function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return t[r].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var i=n(1),l=r(i);customElements.define("shaf-unified-diff",l.default)},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function i(t){return t&&0===t.indexOf("@@")}function l(t){return t.split("\n").reduce(function(t,e){if(null!==t)return t;if("@@"===e.substr(0,2))return 0;var n=e.search(/(\s)@@/);return n!==-1?e.indexOf("@@"):null},null)}function u(t){var e=t.split("\n"),n=l(t);return e.map(function(t){return t.substr(n)})}function a(t){for(;t.length&&!i(t[0]);)t.shift()}function o(t){var e=[],n=!0,r=!1,l=void 0;try{for(var u,a=t[Symbol.iterator]();!(n=(u=a.next()).done);n=!0){var o=u.value;i(o)?e.push({lines:[]}):v[o[0]]&&e[e.length-1].lines.push({type:v[o[0]],text:o.substr(1)})}}catch(t){r=!0,l=t}finally{try{!n&&a.return&&a.return()}finally{if(r)throw l}}return e}Object.defineProperty(e,"__esModule",{value:!0});var s=n(2),f=r(s),c=n(4),h=r(c),g=n(3),d=r(g),v={" ":"context","+":"addition","-":"removal"};e.default=(0,f.default)({attributeChangedCallback:function(t,e,n){this.rendered&&this.updateRendering()},connectedCallback:function(){var t=this.querySelector("pre");t.style.display="none";var e=t.textContent;this.container=document.createElement("div"),document.body.attachShadow&&(this.container=this.container.attachShadow({mode:"open"}));var n=u(e);a(n);var r=o(n),i=!0,l=!1,s=void 0;try{for(var f,c=function(){var t=f.value,e=t.lines.filter(function(t){return"removal"===t.type}),n=t.lines.filter(function(t){return"addition"===t.type});e.forEach(function(t,e){n.forEach(function(e,n){if(!e.removalIdentified){var r=(0,h.default)(t.text,e.text);r<10&&(t.isHidden=!0,e.diff=(0,d.default)(t.text,e.text),e.removalIdentified=!0)}})})},g=r[Symbol.iterator]();!(i=(f=g.next()).done);i=!0)c()}catch(t){l=!0,s=t}finally{try{!i&&g.return&&g.return()}finally{if(l)throw s}}var v=!0,p=!1,b=void 0;try{for(var y,m=r[Symbol.iterator]();!(v=(y=m.next()).done);v=!0){var E=y.value,x=document.createElement("div");x.className="chunk";var C=!0,A=!1,M=void 0;try{for(var w,O=function(){var t=w.value;if(t.isHidden)return"continue";var e=document.createElement("div");e.className="line";var n=[];t.diff?t.diff.forEach(function(t){var e=void 0;t[0]===d.default.INSERT?(e=document.createElement("ins"),e.style.backgroundColor="#EAFFEA"):t[0]===d.default.DELETE?(e=document.createElement("del"),e.style.backgroundColor="#FFECEC"):e=document.createElement("span"),e.textContent=t[1],n.push(e)}):"addition"===t.type?(n.push(document.createElement("ins")),n[0].style.backgroundColor="#EAFFEA",n[0].style.textDecoration="inherit",n[0].textContent=t.text):"removal"===t.type?(n.push(document.createElement("del")),n[0].style.backgroundColor="#FFECEC",n[0].textContent=t.text):(n.push(document.createElement("span")),n[0].textContent=t.text),n.forEach(function(t){e.appendChild(t)}),x.appendChild(e),x.style.fontFamily='Consolas, "Liberation Mono", Menlo, Courier, monospace;',x.style.whiteSpace="pre-wrap"},k=E.lines[Symbol.iterator]();!(C=(w=k.next()).done);C=!0){O()}}catch(t){A=!0,M=t}finally{try{!C&&k.return&&k.return()}finally{if(A)throw M}}if(this.container.appendChild(x),r[r.length-1]!==E){var S=document.createElement("hr");this.container.appendChild(S)}}}catch(t){p=!0,b=t}finally{try{!v&&m.return&&m.return()}finally{if(p)throw b}}this.appendChild(this.container)},updateRendering:function(){this.rendered=!0}})},function(t,e){function n(t){function e(){var t="undefined"!=typeof Reflect?Reflect.construct(HTMLElement,[],e):HTMLElement.call(Object.create(e.prototype));return t.initialize&&t.initialize(),t}return Object.setPrototypeOf(e,HTMLElement),e.prototype=Object.create(HTMLElement.prototype),Object.keys(t).forEach(function(n){e.prototype[n]=t[n]}),e}t.exports=n},function(t,e){function n(t,e,n){if(t==e)return t?[[v,t]]:[];(n<0||t.length<n)&&(n=null);var i=u(t,e),l=t.substring(0,i);t=t.substring(i),e=e.substring(i),i=a(t,e);var o=t.substring(t.length-i);t=t.substring(0,t.length-i),e=e.substring(0,e.length-i);var f=r(t,e);return l&&f.unshift([v,l]),o&&f.push([v,o]),s(f),null!=n&&(f=c(f,n)),f}function r(t,e){var r;if(!t)return[[d,e]];if(!e)return[[g,t]];var l=t.length>e.length?t:e,u=t.length>e.length?e:t,a=l.indexOf(u);if(a!=-1)return r=[[d,l.substring(0,a)],[v,u],[d,l.substring(a+u.length)]],t.length>e.length&&(r[0][0]=r[2][0]=g),r;if(1==u.length)return[[g,t],[d,e]];var s=o(t,e);if(s){var f=s[0],c=s[1],h=s[2],p=s[3],b=s[4],y=n(f,h),m=n(c,p);return y.concat([[v,b]],m)}return i(t,e)}function i(t,e){for(var n=t.length,r=e.length,i=Math.ceil((n+r)/2),u=i,a=2*i,o=new Array(a),s=new Array(a),f=0;f<a;f++)o[f]=-1,s[f]=-1;o[u+1]=0,s[u+1]=0;for(var c=n-r,h=c%2!=0,v=0,p=0,b=0,y=0,m=0;m<i;m++){for(var E=-m+v;E<=m-p;E+=2){var x,C=u+E;x=E==-m||E!=m&&o[C-1]<o[C+1]?o[C+1]:o[C-1]+1;for(var A=x-E;x<n&&A<r&&t.charAt(x)==e.charAt(A);)x++,A++;if(o[C]=x,x>n)p+=2;else if(A>r)v+=2;else if(h){var M=u+c-E;if(M>=0&&M<a&&s[M]!=-1){var w=n-s[M];if(x>=w)return l(t,e,x,A)}}}for(var O=-m+b;O<=m-y;O+=2){var w,M=u+O;w=O==-m||O!=m&&s[M-1]<s[M+1]?s[M+1]:s[M-1]+1;for(var k=w-O;w<n&&k<r&&t.charAt(n-w-1)==e.charAt(r-k-1);)w++,k++;if(s[M]=w,w>n)y+=2;else if(k>r)b+=2;else if(!h){var C=u+c-O;if(C>=0&&C<a&&o[C]!=-1){var x=o[C],A=u+x-C;if(w=n-w,x>=w)return l(t,e,x,A)}}}}return[[g,t],[d,e]]}function l(t,e,r,i){var l=t.substring(0,r),u=e.substring(0,i),a=t.substring(r),o=e.substring(i),s=n(l,u),f=n(a,o);return s.concat(f)}function u(t,e){if(!t||!e||t.charAt(0)!=e.charAt(0))return 0;for(var n=0,r=Math.min(t.length,e.length),i=r,l=0;n<i;)t.substring(l,i)==e.substring(l,i)?(n=i,l=n):r=i,i=Math.floor((r-n)/2+n);return i}function a(t,e){if(!t||!e||t.charAt(t.length-1)!=e.charAt(e.length-1))return 0;for(var n=0,r=Math.min(t.length,e.length),i=r,l=0;n<i;)t.substring(t.length-i,t.length-l)==e.substring(e.length-i,e.length-l)?(n=i,l=n):r=i,i=Math.floor((r-n)/2+n);return i}function o(t,e){function n(t,e,n){for(var r,i,l,o,s=t.substring(n,n+Math.floor(t.length/4)),f=-1,c="";(f=e.indexOf(s,f+1))!=-1;){var h=u(t.substring(n),e.substring(f)),g=a(t.substring(0,n),e.substring(0,f));c.length<g+h&&(c=e.substring(f-g,f)+e.substring(f,f+h),r=t.substring(0,n-g),i=t.substring(n+h),l=e.substring(0,f-g),o=e.substring(f+h))}return 2*c.length>=t.length?[r,i,l,o,c]:null}var r=t.length>e.length?t:e,i=t.length>e.length?e:t;if(r.length<4||2*i.length<r.length)return null;var l,o=n(r,i,Math.ceil(r.length/4)),s=n(r,i,Math.ceil(r.length/2));if(!o&&!s)return null;l=s?o&&o[4].length>s[4].length?o:s:o;var f,c,h,g;t.length>e.length?(f=l[0],c=l[1],h=l[2],g=l[3]):(h=l[0],g=l[1],f=l[2],c=l[3]);var d=l[4];return[f,c,h,g,d]}function s(t){t.push([v,""]);for(var e,n=0,r=0,i=0,l="",o="";n<t.length;)switch(t[n][0]){case d:i++,o+=t[n][1],n++;break;case g:r++,l+=t[n][1],n++;break;case v:r+i>1?(0!==r&&0!==i&&(e=u(o,l),0!==e&&(n-r-i>0&&t[n-r-i-1][0]==v?t[n-r-i-1][1]+=o.substring(0,e):(t.splice(0,0,[v,o.substring(0,e)]),n++),o=o.substring(e),l=l.substring(e)),e=a(o,l),0!==e&&(t[n][1]=o.substring(o.length-e)+t[n][1],o=o.substring(0,o.length-e),l=l.substring(0,l.length-e))),0===r?t.splice(n-i,r+i,[d,o]):0===i?t.splice(n-r,r+i,[g,l]):t.splice(n-r-i,r+i,[g,l],[d,o]),n=n-r-i+(r?1:0)+(i?1:0)+1):0!==n&&t[n-1][0]==v?(t[n-1][1]+=t[n][1],t.splice(n,1)):n++,i=0,r=0,l="",o=""}""===t[t.length-1][1]&&t.pop();var f=!1;for(n=1;n<t.length-1;)t[n-1][0]==v&&t[n+1][0]==v&&(t[n][1].substring(t[n][1].length-t[n-1][1].length)==t[n-1][1]?(t[n][1]=t[n-1][1]+t[n][1].substring(0,t[n][1].length-t[n-1][1].length),t[n+1][1]=t[n-1][1]+t[n+1][1],t.splice(n-1,1),f=!0):t[n][1].substring(0,t[n+1][1].length)==t[n+1][1]&&(t[n-1][1]+=t[n+1][1],t[n][1]=t[n][1].substring(t[n+1][1].length)+t[n+1][1],t.splice(n+1,1),f=!0)),n++;f&&s(t)}function f(t,e){if(0===e)return[v,t];for(var n=0,r=0;r<t.length;r++){var i=t[r];if(i[0]===g||i[0]===v){var l=n+i[1].length;if(e===l)return[r+1,t];if(e<l){t=t.slice();var u=e-n,a=[i[0],i[1].slice(0,u)],o=[i[0],i[1].slice(u)];return t.splice(r,1,a,o),[r+1,t]}n=l}}throw new Error("cursor_pos is out of bounds!")}function c(t,e){var n=f(t,e),r=n[1],i=n[0],l=r[i],u=r[i+1];if(null==l)return t;if(l[0]!==v)return t;if(null!=u&&l[1]+u[1]===u[1]+l[1])return r.splice(i,2,u,l),h(r,i,2);if(null!=u&&0===u[1].indexOf(l[1])){r.splice(i,2,[u[0],l[1]],[0,l[1]]);var a=u[1].slice(l[1].length);return a.length>0&&r.splice(i+2,0,[u[0],a]),h(r,i,3)}return t}function h(t,e,n){for(var r=e+n-1;r>=0&&r>=e-1;r--)if(r+1<t.length){var i=t[r],l=t[r+1];i[0]===l[1]&&t.splice(r,2,[i[0],i[1]+l[1]])}return t}var g=-1,d=1,v=0,p=n;p.INSERT=d,p.DELETE=g,p.EQUAL=v,t.exports=p},function(t,e){"use strict";var n=[],r=[];t.exports=function(t,e){if(t===e)return 0;var i=t.length,l=e.length;if(0===i)return l;if(0===l)return i;for(var u,a,o,s,f=0,c=0;f<i;)r[f]=t.charCodeAt(f),n[f]=++f;for(;c<l;)for(u=e.charCodeAt(c),o=c++,a=c,f=0;f<i;f++)s=u===r[f]?o:o+1,o=n[f],a=n[f]=o>a?s>a?a+1:s:s>o?o+1:s;return a}}]);