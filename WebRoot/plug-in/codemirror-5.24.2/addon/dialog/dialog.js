(function(A){if(typeof exports=="object"&&typeof module=="object"){A(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],A)}else{A(CodeMirror)}}})(function(C){function A(G,F,H){var E=G.getWrapperElement();var D;D=E.appendChild(document.createElement("div"));if(H){D.className="CodeMirror-dialog CodeMirror-dialog-bottom"}else{D.className="CodeMirror-dialog CodeMirror-dialog-top"}if(typeof F=="string"){D.innerHTML=F}else{D.appendChild(F)}return D}function B(E,D){if(E.state.currentNotificationClose){E.state.currentNotificationClose()}E.state.currentNotificationClose=D}C.defineExtension("openDialog",function(D,E,J){if(!J){J={}}B(this,null);var G=A(this,D,J.bottom);var K=false,L=this;function F(M){if(typeof M=="string"){I.value=M}else{if(K){return}K=true;G.parentNode.removeChild(G);L.focus();if(J.onClose){J.onClose(G)}}}var I=G.getElementsByTagName("input")[0],H;if(I){I.focus();if(J.value){I.value=J.value;if(J.selectValueOnOpen!==false){I.select()}}if(J.onInput){C.on(I,"input",function(M){J.onInput(M,I.value,F)})}if(J.onKeyUp){C.on(I,"keyup",function(M){J.onKeyUp(M,I.value,F)})}C.on(I,"keydown",function(M){if(J&&J.onKeyDown&&J.onKeyDown(M,I.value,F)){return}if(M.keyCode==27||(J.closeOnEnter!==false&&M.keyCode==13)){I.blur();C.e_stop(M);F()}if(M.keyCode==13){E(I.value,M)}});if(J.closeOnBlur!==false){C.on(I,"blur",F)}}else{if(H=G.getElementsByTagName("button")[0]){C.on(H,"click",function(){F();L.focus()});if(J.closeOnBlur!==false){C.on(H,"blur",F)}H.focus()}}return F});C.defineExtension("openConfirm",function(D,G,I){B(this,null);var N=A(this,D,I&&I.bottom);var M=N.getElementsByTagName("button");var J=false,K=this,E=1;function F(){if(J){return}J=true;N.parentNode.removeChild(N);K.focus()}M[0].focus();for(var H=0;H<M.length;++H){var L=M[H];(function(O){C.on(L,"click",function(P){C.e_preventDefault(P);F();if(O){O(K)}})})(G[H]);C.on(L,"blur",function(){--E;setTimeout(function(){if(E<=0){F()}},200)});C.on(L,"focus",function(){++E})}});C.defineExtension("openNotification",function(G,F){B(this,D);var J=A(this,G,F&&F.bottom);var E=false,I;var H=F&&typeof F.duration!=="undefined"?F.duration:5000;function D(){if(E){return}E=true;clearTimeout(I);J.parentNode.removeChild(J)}C.on(J,"click",function(K){C.e_preventDefault(K);D()});if(H){I=setTimeout(D,H)}return D})});