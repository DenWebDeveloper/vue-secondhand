(function(e){function n(n){for(var r,c,a=n[0],i=n[1],f=n[2],s=0,d=[];s<a.length;s++)c=a[s],o[c]&&d.push(o[c][0]),o[c]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);l&&l(n);while(d.length)d.shift()();return u.push.apply(u,f||[]),t()}function t(){for(var e,n=0;n<u.length;n++){for(var t=u[n],r=!0,c=1;c<t.length;c++){var a=t[c];0!==o[a]&&(r=!1)}r&&(u.splice(n--,1),e=i(i.s=t[0]))}return e}var r={},c={app:0},o={app:0},u=[];function a(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-0a4d4d74":"4329ec1a","chunk-48a5c00a":"de3021f7","chunk-5b22cc6c":"be370012","chunk-7d4e322a":"0283a16b","chunk-b34cb202":"09f061e6","chunk-b458077c":"6b0ede6e","chunk-df264c0e":"684c08c0","chunk-46d9487c":"c163bfe7","chunk-59e7affe":"2a05ce6e"}[e]+".js"}function i(n){if(r[n])return r[n].exports;var t=r[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.e=function(e){var n=[],t={"chunk-0a4d4d74":1,"chunk-48a5c00a":1,"chunk-5b22cc6c":1,"chunk-7d4e322a":1,"chunk-b34cb202":1,"chunk-b458077c":1,"chunk-df264c0e":1,"chunk-46d9487c":1,"chunk-59e7affe":1};c[e]?n.push(c[e]):0!==c[e]&&t[e]&&n.push(c[e]=new Promise(function(n,t){for(var r="css/"+({}[e]||e)+"."+{"chunk-0a4d4d74":"fb397ac2","chunk-48a5c00a":"b3fb4a30","chunk-5b22cc6c":"e294776f","chunk-7d4e322a":"a3ab01dd","chunk-b34cb202":"7fb731c6","chunk-b458077c":"0ce83f2f","chunk-df264c0e":"addc2cad","chunk-46d9487c":"66a66ab7","chunk-59e7affe":"ab3430d0"}[e]+".css",c=i.p+r,o=document.getElementsByTagName("link"),u=0;u<o.length;u++){var a=o[u],f=a.getAttribute("data-href")||a.getAttribute("href");if("stylesheet"===a.rel&&(f===r||f===c))return n()}var s=document.getElementsByTagName("style");for(u=0;u<s.length;u++){a=s[u],f=a.getAttribute("data-href");if(f===r||f===c)return n()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=n,d.onerror=function(n){var r=n&&n.target&&n.target.src||c,o=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");o.request=r,t(o)},d.href=c;var l=document.getElementsByTagName("head")[0];l.appendChild(d)}).then(function(){c[e]=0}));var r=o[e];if(0!==r)if(r)n.push(r[2]);else{var u=new Promise(function(n,t){r=o[e]=[n,t]});n.push(r[2]=u);var f,s=document.getElementsByTagName("head")[0],d=document.createElement("script");d.charset="utf-8",d.timeout=120,i.nc&&d.setAttribute("nonce",i.nc),d.src=a(e),f=function(n){d.onerror=d.onload=null,clearTimeout(l);var t=o[e];if(0!==t){if(t){var r=n&&("load"===n.type?"missing":n.type),c=n&&n.target&&n.target.src,u=new Error("Loading chunk "+e+" failed.\n("+r+": "+c+")");u.type=r,u.request=c,t[1](u)}o[e]=void 0}};var l=setTimeout(function(){f({type:"timeout",target:d})},12e4);d.onerror=d.onload=f,s.appendChild(d)}return Promise.all(n)},i.m=e,i.c=r,i.d=function(e,n,t){i.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,n){if(1&n&&(e=i(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)i.d(t,r,function(n){return e[n]}.bind(null,r));return t},i.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(n,"a",n),n},i.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},i.p="/admin/",i.oe=function(e){throw console.error(e),e};var f=window["webpackJsonp"]=window["webpackJsonp"]||[],s=f.push.bind(f);f.push=n,f=f.slice();for(var d=0;d<f.length;d++)n(f[d]);var l=s;u.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},"56d7":function(e,n,t){"use strict";t.r(n);t("cadf"),t("551c"),t("097d");var r=t("2b0e"),c=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"app"}},[t("el-container",[t("div",{staticStyle:{padding:"10px",width:"100%"}},[t("router-view")],1)])],1)},o=[],u=t("9860"),a={name:"App",beforeMount:function(){this.$store.dispatch(u["b"])}},i=a,f=t("2877"),s=Object(f["a"])(i,c,o,!1,null,null,null);s.options.__file="App.vue";var d=s.exports,l=(t("7f7f"),t("8c4f")),h=[{path:"/",redirect:"/orders",name:"home",component:function(){return Promise.all([t.e("chunk-df264c0e"),t.e("chunk-46d9487c")]).then(t.bind(null,"cd56"))},children:[{name:"orders",path:"orders",component:function(){return t.e("chunk-0a4d4d74").then(t.bind(null,"159d"))}},{name:"groups",path:"groups",component:function(){return t.e("chunk-5b22cc6c").then(t.bind(null,"696f"))}},{name:"settings",path:"settings",component:function(){return t.e("chunk-b34cb202").then(t.bind(null,"26d3"))}},{name:"products",path:"products",component:function(){return t.e("chunk-7d4e322a").then(t.bind(null,"e6dc"))}},{name:"parameters",path:"parameters",component:function(){return t.e("chunk-b458077c").then(t.bind(null,"b156"))}}]},{path:"/auth",name:"auth",component:function(){return t.e("chunk-48a5c00a").then(t.bind(null,"2fef"))}},{path:"*",component:function(){return Promise.all([t.e("chunk-df264c0e"),t.e("chunk-59e7affe")]).then(t.bind(null,"8cdb"))}}],p=h,m=t("a78e"),b=t.n(m);r["default"].use(l["a"]);var v=new l["a"]({base:"admin/",routes:p});v.beforeEach(function(e,n,t){var r=b.a.get("token");return r&&"auth"===e.name?t(!1):r||"auth"===e.name?t():t({name:"auth"})});var k=v,g=t("2f62"),y={info:{}},w={getBaseInfo:function(e){return e.info}},O=t("a322"),j=t("c93e"),E=t("bc3a"),P=t.n(E),_=P.a.create({baseURL:"/api",timeout:5e3});_.interceptors.request.use(function(e){var n=b.a.get("token");return n&&(e.headers.Authorization=n),e},function(e){return Promise.reject(e)}),_.interceptors.response.use(function(e){return e},function(e){return e.response&&401===e.response.status&&(b.a.remove("token"),k.push({name:"auth"})),Promise.reject(e)});var S,T,A=_,x=(S={},Object(O["a"])(S,u["b"],function(e){var n=e.commit;return new Promise(function(e,t){A.get("/base-information").then(function(t){n(u["c"],{info:t.data}),e()}).catch(function(e){t(e)})})}),Object(O["a"])(S,u["c"],function(e,n){var t=e.commit;return new Promise(function(e,r){A.post("/base-information",Object(j["a"])({},n)).then(function(){t(u["c"],{info:n}),e()}).catch(function(e){r(e)})})}),S),N=(T={},Object(O["a"])(T,u["c"],function(e,n){e.info=n.info}),Object(O["a"])(T,u["a"],function(e){e.info={},b.a.remove("token")}),T),B={state:y,getters:w,actions:x,mutations:N};r["default"].use(g["a"]);var $=new g["a"].Store({strict:!1,modules:{baseInfo:B}}),M=t("5c96"),I=t.n(M),L=t("6039"),q=t.n(L);t("73ec"),t("0fae");r["default"].use(I.a,{locale:q.a}),r["default"].config.productionTip=!1,r["default"].prototype.$api=A,r["default"].prototype.$notifyError=function(e){var n=e.msg,t=e.duration;return I.a.Notification.error({title:"Помилка :(",message:n,duration:t||5e3})},r["default"].prototype.$notifySuccess=function(){return I.a.Notification({title:"Все добре :)",message:"Всі данні збережені",type:"success"})},new r["default"]({router:k,store:$,render:function(e){return e(d)}}).$mount("#app")},"73ec":function(e,n,t){},9860:function(e,n,t){"use strict";t.d(n,"a",function(){return r}),t.d(n,"b",function(){return c}),t.d(n,"c",function(){return o});var r="AUTH_LOGOUT",c="GET_BASE_INFO",o="SET_BASE_INFO"}});
//# sourceMappingURL=app.ef4f8b77.js.map