(function(A){if(typeof exports=="object"&&typeof module=="object"){A(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],A)}else{A(CodeMirror)}}})(function(J){J.defineSimpleMode=function(L,K){J.defineMode(L,function(M){return J.simpleMode(M,K)})};J.simpleMode=function(K,L){C(L,"start");var T={},O=L.meta||{},U=false;for(var Q in L){if(Q!=O&&L.hasOwnProperty(Q)){var M=T[Q]=[],V=L[Q];for(var R=0;R<V.length;R++){var N=V[R];M.push(new B(N,L));if(N.indent||N.dedent){U=true}}}}var S={startState:function(){return{state:"start",pending:null,local:null,localState:null,indent:U?[]:null}},copyState:function(Y){var W={state:Y.state,pending:Y.pending,local:Y.local,localState:null,indent:Y.indent&&Y.indent.slice(0)};if(Y.localState){W.localState=J.copyState(Y.local.mode,Y.localState)}if(Y.stack){W.stack=Y.stack.slice(0)}for(var X=Y.persistentStates;X;X=X.next){W.persistentStates={mode:X.mode,spec:X.spec,state:X.state==Y.localState?W.localState:J.copyState(X.mode,X.state),next:W.persistentStates}}return W},token:G(T,K),innerMode:function(W){return W.local&&{mode:W.local.mode,state:W.localState}},indent:I(T,O)};if(O){for(var P in O){if(O.hasOwnProperty(P)){S[P]=O[P]}}}return S};function C(K,L){if(!K.hasOwnProperty(L)){throw new Error("Undefined state "+L+" in simple mode")}}function D(M,K){if(!M){return/(?:)/}var L="";if(M instanceof RegExp){if(M.ignoreCase){L="i"}M=M.source}else{M=String(M)}return new RegExp((K===false?"":"^")+"(?:"+M+")",L)}function E(M){if(!M){return null}if(typeof M=="string"){return M.replace(/\./g," ")}var L=[];for(var K=0;K<M.length;K++){L.push(M[K]&&M[K].replace(/\./g," "))}return L}function B(L,K){if(L.next||L.push){C(K,L.next||L.push)}this.regex=D(L.regex);this.token=E(L.token);this.data=L}function G(K,L){return function(T,Q){if(Q.pending){var M=Q.pending.shift();if(Q.pending.length==0){Q.pending=null}T.pos+=M.text.length;return M.token}if(Q.local){if(Q.local.end&&T.match(Q.local.end)){var N=Q.local.endToken||null;Q.local=Q.localState=null;return N}else{var N=Q.local.mode.token(T,Q.localState),U;if(Q.local.endScan&&(U=Q.local.endScan.exec(T.current()))){T.pos=T.start+U.index}return N}}var P=K[Q.state];for(var V=0;V<P.length;V++){var R=P[V];var S=(!R.data.sol||T.sol())&&T.match(R.regex);if(S){if(R.data.next){Q.state=R.data.next}else{if(R.data.push){(Q.stack||(Q.stack=[])).push(Q.state);Q.state=R.data.push}else{if(R.data.pop&&Q.stack&&Q.stack.length){Q.state=Q.stack.pop()}}}if(R.data.mode){H(L,Q,R.data.mode,R.token)}if(R.data.indent){Q.indent.push(T.indentation()+L.indentUnit)}if(R.data.dedent){Q.indent.pop()}if(S.length>2){Q.pending=[];for(var O=2;O<S.length;O++){if(S[O]){Q.pending.push({text:S[O],token:R.token[O-1]})}}T.backUp(S[0].length-(S[1]?S[1].length:0));return R.token[0]}else{if(R.token&&R.token.join){return R.token[0]}else{return R.token}}}}T.next();return null}}function F(N,L){if(N===L){return true}if(!N||typeof N!="object"||!L||typeof L!="object"){return false}var M=0;for(var K in N){if(N.hasOwnProperty(K)){if(!L.hasOwnProperty(K)||!F(N[K],L[K])){return false}M++}}for(var K in L){if(L.hasOwnProperty(K)){M--}}return M==0}function H(K,P,N,O){var R;if(N.persistent){for(var L=P.persistentStates;L&&!R;L=L.next){if(N.spec?F(N.spec,L.spec):N.mode==L.mode){R=L}}}var Q=R?R.mode:N.mode||J.getMode(K,N.spec);var M=R?R.state:J.startState(Q);if(N.persistent&&!R){P.persistentStates={mode:Q,spec:N.spec,state:M,next:P.persistentStates}}P.localState=M;P.local={mode:Q,end:N.end&&D(N.end),endScan:N.end&&N.forceEnd!==false&&D(N.end,false),endToken:O&&O.join?O[O.length-1]:O}}function A(M,L){for(var K=0;K<L.length;K++){if(L[K]===M){return true}}}function I(K,L){return function(P,N,M){if(P.local&&P.local.mode.indent){return P.local.mode.indent(P.localState,N,M)}if(P.indent==null||P.local||L.dontIndentStates&&A(P.state,L.dontIndentStates)>-1){return J.Pass}var R=P.indent.length-1,O=K[P.state];scan:for(;;){for(var T=0;T<O.length;T++){var Q=O[T];if(Q.data.dedent&&Q.data.dedentIfLineStart!==false){var S=Q.regex.exec(N);if(S&&S[0]){R--;if(Q.next||Q.push){O=K[Q.next||Q.push]}N=N.slice(S[0].length);continue scan}}}break}return R<0?0:P.indent[R]}}});