function ke(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var ne={exports:{}},p={};var ce;function Ce(){if(ce)return p;ce=1;var e=Symbol.for("react.element"),r=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),i=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),s=Symbol.for("react.provider"),o=Symbol.for("react.context"),c=Symbol.for("react.forward_ref"),f=Symbol.for("react.suspense"),m=Symbol.for("react.memo"),y=Symbol.for("react.lazy"),d=Symbol.iterator;function h(t){return t===null||typeof t!="object"?null:(t=d&&t[d]||t["@@iterator"],typeof t=="function"?t:null)}var b={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},O=Object.assign,D={};function j(t,a,v){this.props=t,this.context=a,this.refs=D,this.updater=v||b}j.prototype.isReactComponent={},j.prototype.setState=function(t,a){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,a,"setState")},j.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function P(){}P.prototype=j.prototype;function I(t,a,v){this.props=t,this.context=a,this.refs=D,this.updater=v||b}var x=I.prototype=new P;x.constructor=I,O(x,j.prototype),x.isPureReactComponent=!0;var w=Array.isArray,R=Object.prototype.hasOwnProperty,A={current:null},U={key:!0,ref:!0,__self:!0,__source:!0};function F(t,a,v){var $,g={},_=null,k=null;if(a!=null)for($ in a.ref!==void 0&&(k=a.ref),a.key!==void 0&&(_=""+a.key),a)R.call(a,$)&&!U.hasOwnProperty($)&&(g[$]=a[$]);var S=arguments.length-2;if(S===1)g.children=v;else if(1<S){for(var E=Array(S),L=0;L<S;L++)E[L]=arguments[L+2];g.children=E}if(t&&t.defaultProps)for($ in S=t.defaultProps,S)g[$]===void 0&&(g[$]=S[$]);return{$$typeof:e,type:t,key:_,ref:k,props:g,_owner:A.current}}function te(t,a){return{$$typeof:e,type:t.type,key:a,ref:t.ref,props:t.props,_owner:t._owner}}function V(t){return typeof t=="object"&&t!==null&&t.$$typeof===e}function Ee(t){var a={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(v){return a[v]})}var le=/\/+/g;function re(t,a){return typeof t=="object"&&t!==null&&t.key!=null?Ee(""+t.key):a.toString(36)}function K(t,a,v,$,g){var _=typeof t;(_==="undefined"||_==="boolean")&&(t=null);var k=!1;if(t===null)k=!0;else switch(_){case"string":case"number":k=!0;break;case"object":switch(t.$$typeof){case e:case r:k=!0}}if(k)return k=t,g=g(k),t=$===""?"."+re(k,0):$,w(g)?(v="",t!=null&&(v=t.replace(le,"$&/")+"/"),K(g,a,v,"",function(L){return L})):g!=null&&(V(g)&&(g=te(g,v+(!g.key||k&&k.key===g.key?"":(""+g.key).replace(le,"$&/")+"/")+t)),a.push(g)),1;if(k=0,$=$===""?".":$+":",w(t))for(var S=0;S<t.length;S++){_=t[S];var E=$+re(_,S);k+=K(_,a,v,E,g)}else if(E=h(t),typeof E=="function")for(t=E.call(t),S=0;!(_=t.next()).done;)_=_.value,E=$+re(_,S++),k+=K(_,a,v,E,g);else if(_==="object")throw a=String(t),Error("Objects are not valid as a React child (found: "+(a==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":a)+"). If you meant to render a collection of children, use an array instead.");return k}function J(t,a,v){if(t==null)return t;var $=[],g=0;return K(t,$,"","",function(_){return a.call(v,_,g++)}),$}function _e(t){if(t._status===-1){var a=t._result;a=a(),a.then(function(v){(t._status===0||t._status===-1)&&(t._status=1,t._result=v)},function(v){(t._status===0||t._status===-1)&&(t._status=2,t._result=v)}),t._status===-1&&(t._status=0,t._result=a)}if(t._status===1)return t._result.default;throw t._result}var T={current:null},Q={transition:null},Se={ReactCurrentDispatcher:T,ReactCurrentBatchConfig:Q,ReactCurrentOwner:A};function ue(){throw Error("act(...) is not supported in production builds of React.")}return p.Children={map:J,forEach:function(t,a,v){J(t,function(){a.apply(this,arguments)},v)},count:function(t){var a=0;return J(t,function(){a++}),a},toArray:function(t){return J(t,function(a){return a})||[]},only:function(t){if(!V(t))throw Error("React.Children.only expected to receive a single React element child.");return t}},p.Component=j,p.Fragment=n,p.Profiler=l,p.PureComponent=I,p.StrictMode=i,p.Suspense=f,p.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Se,p.act=ue,p.cloneElement=function(t,a,v){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var $=O({},t.props),g=t.key,_=t.ref,k=t._owner;if(a!=null){if(a.ref!==void 0&&(_=a.ref,k=A.current),a.key!==void 0&&(g=""+a.key),t.type&&t.type.defaultProps)var S=t.type.defaultProps;for(E in a)R.call(a,E)&&!U.hasOwnProperty(E)&&($[E]=a[E]===void 0&&S!==void 0?S[E]:a[E])}var E=arguments.length-2;if(E===1)$.children=v;else if(1<E){S=Array(E);for(var L=0;L<E;L++)S[L]=arguments[L+2];$.children=S}return{$$typeof:e,type:t.type,key:g,ref:_,props:$,_owner:k}},p.createContext=function(t){return t={$$typeof:o,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:s,_context:t},t.Consumer=t},p.createElement=F,p.createFactory=function(t){var a=F.bind(null,t);return a.type=t,a},p.createRef=function(){return{current:null}},p.forwardRef=function(t){return{$$typeof:c,render:t}},p.isValidElement=V,p.lazy=function(t){return{$$typeof:y,_payload:{_status:-1,_result:t},_init:_e}},p.memo=function(t,a){return{$$typeof:m,type:t,compare:a===void 0?null:a}},p.startTransition=function(t){var a=Q.transition;Q.transition={};try{t()}finally{Q.transition=a}},p.unstable_act=ue,p.useCallback=function(t,a){return T.current.useCallback(t,a)},p.useContext=function(t){return T.current.useContext(t)},p.useDebugValue=function(){},p.useDeferredValue=function(t){return T.current.useDeferredValue(t)},p.useEffect=function(t,a){return T.current.useEffect(t,a)},p.useId=function(){return T.current.useId()},p.useImperativeHandle=function(t,a,v){return T.current.useImperativeHandle(t,a,v)},p.useInsertionEffect=function(t,a){return T.current.useInsertionEffect(t,a)},p.useLayoutEffect=function(t,a){return T.current.useLayoutEffect(t,a)},p.useMemo=function(t,a){return T.current.useMemo(t,a)},p.useReducer=function(t,a,v){return T.current.useReducer(t,a,v)},p.useRef=function(t){return T.current.useRef(t)},p.useState=function(t){return T.current.useState(t)},p.useSyncExternalStore=function(t,a,v){return T.current.useSyncExternalStore(t,a,v)},p.useTransition=function(){return T.current.useTransition()},p.version="18.3.1",p}var de;function Oe(){return de||(de=1,ne.exports=Ce()),ne.exports}var u=Oe();const wt=ke(u);let Re={data:""},je=e=>{if(typeof window=="object"){let r=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return r.nonce=window.__nonce__,r.parentNode||(e||document.head).appendChild(r),r.firstChild}return e||Re},Te=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,Ie=/\/\*[^]*?\*\/|  +/g,fe=/\n+/g,q=(e,r)=>{let n="",i="",l="";for(let s in e){let o=e[s];s[0]=="@"?s[1]=="i"?n=s+" "+o+";":i+=s[1]=="f"?q(o,s):s+"{"+q(o,s[1]=="k"?"":r)+"}":typeof o=="object"?i+=q(o,r?r.replace(/([^,])+/g,c=>s.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,f=>/&/.test(f)?f.replace(/&/g,c):c?c+" "+f:f)):s):o!=null&&(s=/^--/.test(s)?s:s.replace(/[A-Z]/g,"-$&").toLowerCase(),l+=q.p?q.p(s,o):s+":"+o+";")}return n+(r&&l?r+"{"+l+"}":l)+i},M={},ye=e=>{if(typeof e=="object"){let r="";for(let n in e)r+=n+ye(e[n]);return r}return e},Pe=(e,r,n,i,l)=>{let s=ye(e),o=M[s]||(M[s]=(f=>{let m=0,y=11;for(;m<f.length;)y=101*y+f.charCodeAt(m++)>>>0;return"go"+y})(s));if(!M[o]){let f=s!==e?e:(m=>{let y,d,h=[{}];for(;y=Te.exec(m.replace(Ie,""));)y[4]?h.shift():y[3]?(d=y[3].replace(fe," ").trim(),h.unshift(h[0][d]=h[0][d]||{})):h[0][y[1]]=y[2].replace(fe," ").trim();return h[0]})(e);M[o]=q(l?{["@keyframes "+o]:f}:f,n?"":"."+o)}let c=n&&M.g?M.g:null;return n&&(M.g=M[o]),((f,m,y,d)=>{d?m.data=m.data.replace(d,f):m.data.indexOf(f)===-1&&(m.data=y?f+m.data:m.data+f)})(M[o],r,i,c),o},De=(e,r,n)=>e.reduce((i,l,s)=>{let o=r[s];if(o&&o.call){let c=o(n),f=c&&c.props&&c.props.className||/^go/.test(c)&&c;o=f?"."+f:c&&typeof c=="object"?c.props?"":q(c,""):c===!1?"":c}return i+l+(o??"")},"");function X(e){let r=this||{},n=e.call?e(r.p):e;return Pe(n.unshift?n.raw?De(n,[].slice.call(arguments,1),r.p):n.reduce((i,l)=>Object.assign(i,l&&l.call?l(r.p):l),{}):n,je(r.target),r.g,r.o,r.k)}let he,oe,ae;X.bind({g:1});let z=X.bind({k:1});function Ae(e,r,n,i){q.p=r,he=e,oe=n,ae=i}function H(e,r){let n=this||{};return function(){let i=arguments;function l(s,o){let c=Object.assign({},s),f=c.className||l.className;n.p=Object.assign({theme:oe&&oe()},c),n.o=/ *go\d+/.test(f),c.className=X.apply(n,i)+(f?" "+f:"");let m=e;return e[0]&&(m=c.as||e,delete c.as),ae&&m[0]&&ae(c),he(m,c)}return l}}var Le=e=>typeof e=="function",Z=(e,r)=>Le(e)?e(r):e,Ne=(()=>{let e=0;return()=>(++e).toString()})(),ve=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let r=matchMedia("(prefers-reduced-motion: reduce)");e=!r||r.matches}return e}})(),Me=20,se="default",ge=(e,r)=>{let{toastLimit:n}=e.settings;switch(r.type){case 0:return{...e,toasts:[r.toast,...e.toasts].slice(0,n)};case 1:return{...e,toasts:e.toasts.map(o=>o.id===r.toast.id?{...o,...r.toast}:o)};case 2:let{toast:i}=r;return ge(e,{type:e.toasts.find(o=>o.id===i.id)?1:0,toast:i});case 3:let{toastId:l}=r;return{...e,toasts:e.toasts.map(o=>o.id===l||l===void 0?{...o,dismissed:!0,visible:!1}:o)};case 4:return r.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(o=>o.id!==r.toastId)};case 5:return{...e,pausedAt:r.time};case 6:let s=r.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(o=>({...o,pauseDuration:o.pauseDuration+s}))}}},Y=[],be={toasts:[],pausedAt:void 0,settings:{toastLimit:Me}},N={},$e=(e,r=se)=>{N[r]=ge(N[r]||be,e),Y.forEach(([n,i])=>{n===r&&i(N[r])})},we=e=>Object.keys(N).forEach(r=>$e(e,r)),ze=e=>Object.keys(N).find(r=>N[r].toasts.some(n=>n.id===e)),ee=(e=se)=>r=>{$e(r,e)},Fe={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},qe=(e={},r=se)=>{let[n,i]=u.useState(N[r]||be),l=u.useRef(N[r]);u.useEffect(()=>(l.current!==N[r]&&i(N[r]),Y.push([r,i]),()=>{let o=Y.findIndex(([c])=>c===r);o>-1&&Y.splice(o,1)}),[r]);let s=n.toasts.map(o=>{var c,f,m;return{...e,...e[o.type],...o,removeDelay:o.removeDelay||((c=e[o.type])==null?void 0:c.removeDelay)||e?.removeDelay,duration:o.duration||((f=e[o.type])==null?void 0:f.duration)||e?.duration||Fe[o.type],style:{...e.style,...(m=e[o.type])==null?void 0:m.style,...o.style}}});return{...n,toasts:s}},He=(e,r="blank",n)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:r,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...n,id:n?.id||Ne()}),B=e=>(r,n)=>{let i=He(r,e,n);return ee(i.toasterId||ze(i.id))({type:2,toast:i}),i.id},C=(e,r)=>B("blank")(e,r);C.error=B("error");C.success=B("success");C.loading=B("loading");C.custom=B("custom");C.dismiss=(e,r)=>{let n={type:3,toastId:e};r?ee(r)(n):we(n)};C.dismissAll=e=>C.dismiss(void 0,e);C.remove=(e,r)=>{let n={type:4,toastId:e};r?ee(r)(n):we(n)};C.removeAll=e=>C.remove(void 0,e);C.promise=(e,r,n)=>{let i=C.loading(r.loading,{...n,...n?.loading});return typeof e=="function"&&(e=e()),e.then(l=>{let s=r.success?Z(r.success,l):void 0;return s?C.success(s,{id:i,...n,...n?.success}):C.dismiss(i),l}).catch(l=>{let s=r.error?Z(r.error,l):void 0;s?C.error(s,{id:i,...n,...n?.error}):C.dismiss(i)}),e};var Ue=1e3,Ve=(e,r="default")=>{let{toasts:n,pausedAt:i}=qe(e,r),l=u.useRef(new Map).current,s=u.useCallback((d,h=Ue)=>{if(l.has(d))return;let b=setTimeout(()=>{l.delete(d),o({type:4,toastId:d})},h);l.set(d,b)},[]);u.useEffect(()=>{if(i)return;let d=Date.now(),h=n.map(b=>{if(b.duration===1/0)return;let O=(b.duration||0)+b.pauseDuration-(d-b.createdAt);if(O<0){b.visible&&C.dismiss(b.id);return}return setTimeout(()=>C.dismiss(b.id,r),O)});return()=>{h.forEach(b=>b&&clearTimeout(b))}},[n,i,r]);let o=u.useCallback(ee(r),[r]),c=u.useCallback(()=>{o({type:5,time:Date.now()})},[o]),f=u.useCallback((d,h)=>{o({type:1,toast:{id:d,height:h}})},[o]),m=u.useCallback(()=>{i&&o({type:6,time:Date.now()})},[i,o]),y=u.useCallback((d,h)=>{let{reverseOrder:b=!1,gutter:O=8,defaultPosition:D}=h||{},j=n.filter(x=>(x.position||D)===(d.position||D)&&x.height),P=j.findIndex(x=>x.id===d.id),I=j.filter((x,w)=>w<P&&x.visible).length;return j.filter(x=>x.visible).slice(...b?[I+1]:[0,I]).reduce((x,w)=>x+(w.height||0)+O,0)},[n]);return u.useEffect(()=>{n.forEach(d=>{if(d.dismissed)s(d.id,d.removeDelay);else{let h=l.get(d.id);h&&(clearTimeout(h),l.delete(d.id))}})},[n,s]),{toasts:n,handlers:{updateHeight:f,startPause:c,endPause:m,calculateOffset:y}}},Be=z`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,Ke=z`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Je=z`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,Qe=H("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Be} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${Ke} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${Je} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,We=z`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,Ye=H("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${We} 1s linear infinite;
`,Ze=z`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,Ge=z`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,Xe=H("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Ze} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${Ge} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,et=H("div")`
  position: absolute;
`,tt=H("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,rt=z`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,nt=H("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${rt} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,ot=({toast:e})=>{let{icon:r,type:n,iconTheme:i}=e;return r!==void 0?typeof r=="string"?u.createElement(nt,null,r):r:n==="blank"?null:u.createElement(tt,null,u.createElement(Ye,{...i}),n!=="loading"&&u.createElement(et,null,n==="error"?u.createElement(Qe,{...i}):u.createElement(Xe,{...i})))},at=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,st=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,it="0%{opacity:0;} 100%{opacity:1;}",lt="0%{opacity:1;} 100%{opacity:0;}",ut=H("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,ct=H("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,dt=(e,r)=>{let n=e.includes("top")?1:-1,[i,l]=ve()?[it,lt]:[at(n),st(n)];return{animation:r?`${z(i)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${z(l)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},ft=u.memo(({toast:e,position:r,style:n,children:i})=>{let l=e.height?dt(e.position||r||"top-center",e.visible):{opacity:0},s=u.createElement(ot,{toast:e}),o=u.createElement(ct,{...e.ariaProps},Z(e.message,e));return u.createElement(ut,{className:e.className,style:{...l,...n,...e.style}},typeof i=="function"?i({icon:s,message:o}):u.createElement(u.Fragment,null,s,o))});Ae(u.createElement);var pt=({id:e,className:r,style:n,onHeightUpdate:i,children:l})=>{let s=u.useCallback(o=>{if(o){let c=()=>{let f=o.getBoundingClientRect().height;i(e,f)};c(),new MutationObserver(c).observe(o,{subtree:!0,childList:!0,characterData:!0})}},[e,i]);return u.createElement("div",{ref:s,className:r,style:n},l)},mt=(e,r)=>{let n=e.includes("top"),i=n?{top:0}:{bottom:0},l=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:ve()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${r*(n?1:-1)}px)`,...i,...l}},yt=X`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,W=16,xt=({reverseOrder:e,position:r="top-center",toastOptions:n,gutter:i,children:l,toasterId:s,containerStyle:o,containerClassName:c})=>{let{toasts:f,handlers:m}=Ve(n,s);return u.createElement("div",{"data-rht-toaster":s||"",style:{position:"fixed",zIndex:9999,top:W,left:W,right:W,bottom:W,pointerEvents:"none",...o},className:c,onMouseEnter:m.startPause,onMouseLeave:m.endPause},f.map(y=>{let d=y.position||r,h=m.calculateOffset(y,{reverseOrder:e,gutter:i,defaultPosition:r}),b=mt(d,h);return u.createElement(pt,{id:y.id,key:y.id,onHeightUpdate:m.updateHeight,className:y.visible?yt:"",style:b},y.type==="custom"?Z(y.message,y):l?l(y):u.createElement(ft,{toast:y,position:d}))}))},G=["light","dark"],ie="(prefers-color-scheme: dark)",ht=typeof window>"u",xe=u.createContext(void 0),Et=e=>u.useContext(xe)?e.children:u.createElement(gt,{...e}),vt=["light","dark"],gt=({forcedTheme:e,disableTransitionOnChange:r=!1,enableSystem:n=!0,enableColorScheme:i=!0,storageKey:l="theme",themes:s=vt,defaultTheme:o=n?"system":"light",attribute:c="data-theme",value:f,children:m,nonce:y})=>{let[d,h]=u.useState(()=>pe(l,o)),[b,O]=u.useState(()=>pe(l)),D=f?Object.values(f):s,j=u.useCallback(w=>{let R=w;if(!R)return;w==="system"&&n&&(R=me());let A=f?f[R]:R,U=r?$t():null,F=document.documentElement;if(c==="class"?(F.classList.remove(...D),A&&F.classList.add(A)):A?F.setAttribute(c,A):F.removeAttribute(c),i){let te=G.includes(o)?o:null,V=G.includes(R)?R:te;F.style.colorScheme=V}U?.()},[]),P=u.useCallback(w=>{let R=typeof w=="function"?w(w):w;h(R);try{localStorage.setItem(l,R)}catch{}},[e]),I=u.useCallback(w=>{let R=me(w);O(R),d==="system"&&n&&!e&&j("system")},[d,e]);u.useEffect(()=>{let w=window.matchMedia(ie);return w.addListener(I),I(w),()=>w.removeListener(I)},[I]),u.useEffect(()=>{let w=R=>{if(R.key!==l)return;let A=R.newValue||o;P(A)};return window.addEventListener("storage",w),()=>window.removeEventListener("storage",w)},[P]),u.useEffect(()=>{j(e??d)},[e,d]);let x=u.useMemo(()=>({theme:d,setTheme:P,forcedTheme:e,resolvedTheme:d==="system"?b:d,themes:n?[...s,"system"]:s,systemTheme:n?b:void 0}),[d,P,e,b,n,s]);return u.createElement(xe.Provider,{value:x},u.createElement(bt,{forcedTheme:e,disableTransitionOnChange:r,enableSystem:n,enableColorScheme:i,storageKey:l,themes:s,defaultTheme:o,attribute:c,value:f,children:m,attrs:D,nonce:y}),m)},bt=u.memo(({forcedTheme:e,storageKey:r,attribute:n,enableSystem:i,enableColorScheme:l,defaultTheme:s,value:o,attrs:c,nonce:f})=>{let m=s==="system",y=n==="class"?`var d=document.documentElement,c=d.classList;${`c.remove(${c.map(O=>`'${O}'`).join(",")})`};`:`var d=document.documentElement,n='${n}',s='setAttribute';`,d=l?G.includes(s)&&s?`if(e==='light'||e==='dark'||!e)d.style.colorScheme=e||'${s}'`:"if(e==='light'||e==='dark')d.style.colorScheme=e":"",h=(O,D=!1,j=!0)=>{let P=o?o[O]:O,I=D?O+"|| ''":`'${P}'`,x="";return l&&j&&!D&&G.includes(O)&&(x+=`d.style.colorScheme = '${O}';`),n==="class"?D||P?x+=`c.add(${I})`:x+="null":P&&(x+=`d[s](n,${I})`),x},b=e?`!function(){${y}${h(e)}}()`:i?`!function(){try{${y}var e=localStorage.getItem('${r}');if('system'===e||(!e&&${m})){var t='${ie}',m=window.matchMedia(t);if(m.media!==t||m.matches){${h("dark")}}else{${h("light")}}}else if(e){${o?`var x=${JSON.stringify(o)};`:""}${h(o?"x[e]":"e",!0)}}${m?"":"else{"+h(s,!1,!1)+"}"}${d}}catch(e){}}()`:`!function(){try{${y}var e=localStorage.getItem('${r}');if(e){${o?`var x=${JSON.stringify(o)};`:""}${h(o?"x[e]":"e",!0)}}else{${h(s,!1,!1)};}${d}}catch(t){}}();`;return u.createElement("script",{nonce:f,dangerouslySetInnerHTML:{__html:b}})}),pe=(e,r)=>{if(ht)return;let n;try{n=localStorage.getItem(e)||void 0}catch{}return n||r},$t=()=>{let e=document.createElement("style");return e.appendChild(document.createTextNode("*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}")),document.head.appendChild(e),()=>{window.getComputedStyle(document.body),setTimeout(()=>{document.head.removeChild(e)},1)}},me=e=>(e||(e=window.matchMedia(ie)),e.matches?"dark":"light");export{xt as F,wt as R,Oe as a,ke as g,C as n,u as r,Et as z};
