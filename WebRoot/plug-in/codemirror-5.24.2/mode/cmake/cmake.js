(function(A){if(typeof exports=="object"&&typeof module=="object"){A(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],A)}else{A(CodeMirror)}}})(function(A){A.defineMode("cmake",function(){var B=/({)?[a-zA-Z0-9_]+(})?/;function C(I,G){var F,H,E=false;while(!I.eol()&&(F=I.next())!=G.pending){if(F==="$"&&H!="\\"&&G.pending=='"'){E=true;break}H=F}if(E){I.backUp(1)}if(F==G.pending){G.continueString=false}else{G.continueString=true}return"string"}function D(G,F){var E=G.next();if(E==="$"){if(G.match(B)){return"variable-2"}return"variable"}if(F.continueString){G.backUp(1);return C(G,F)}if(G.match(/(\s+)?\w+\(/)||G.match(/(\s+)?\w+\ \(/)){G.backUp(1);return"def"}if(E=="#"){G.skipToEnd();return"comment"}if(E=="'"||E=='"'){F.pending=E;return C(G,F)}if(E=="("||E==")"){return"bracket"}if(E.match(/[0-9]/)){return"number"}G.eatWhile(/[\w-]/);return null}return{startState:function(){var E={};E.inDefinition=false;E.inInclude=false;E.continueString=false;E.pending=false;return E},token:function(F,E){if(F.eatSpace()){return null}return D(F,E)}}});A.defineMIME("text/x-cmake","cmake")});