(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(e,t,n){e.exports=n(39)},19:function(e,t,n){},39:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),l=n(12),r=n.n(l),m=(n(19),n(2)),o=(n(4),function(e){return c.a.createElement("div",null,c.a.createElement("h2",{className:"display-4"},"Rajaa hakua"),c.a.createElement("form",{className:"col-md-8 my-md-3"},c.a.createElement("div",{className:"form-group my-md-2"},c.a.createElement("label",{htmlFor:"nameSearch"},"Rajaa nimen mukaan:"),c.a.createElement("input",{type:"text",id:"nameSearch",className:"form-control",value:e.value,onChange:e.onChange}))))}),u=function(e){return c.a.createElement("div",null,c.a.createElement("h2",{className:"display-4"},"Lis\xe4\xe4 uusi"),c.a.createElement("form",{className:"col-md-8 my-md-3"},c.a.createElement("div",{className:"form-group my-md-2"},c.a.createElement("label",{htmlFor:"nameField"},"Nimi:"),c.a.createElement("input",{type:"text",id:"nameField",className:"form-control",value:e.valueName,onChange:e.onChangeName}),c.a.createElement("label",{htmlFor:"numberField"},"Puhelinnumero:"),c.a.createElement("input",{type:"text",id:"numberField",className:"form-control",value:e.valueNumber,onChange:e.onChangeNumber})),c.a.createElement("div",{className:"my-md-2"},c.a.createElement("button",{className:"btn btn-primary",type:"submit",onClick:e.onClick},"lis\xe4\xe4"))))},i=function(e){return c.a.createElement("div",null,c.a.createElement("h2",{className:"display-4"},"Numerot"),c.a.createElement("div",{className:"col-sm my-md-3"},e.mapNames))},s=n(3),f=n.n(s),d="/api/persons",h=function(){return f.a.get(d).then(function(e){return e.data})},v=function(e){return f.a.post(d,e).then(function(e){return e.data})},E=function(e){f.a.delete("".concat(d,"/").concat(e.id))},b=function(e,t){return f.a.put("".concat(d,"/").concat(e),t).then(function(e){return e.data})},p=function(e){var t=e.message,n=e.isError;return null===t?null:n?c.a.createElement("div",{className:"contact-error"},c.a.createElement("h4",null,t)):c.a.createElement("div",{className:"added-contact"},c.a.createElement("h4",null,t))},N=function(){var e=Object(a.useState)([]),t=Object(m.a)(e,2),n=t[0],l=t[1],r=Object(a.useState)(""),s=Object(m.a)(r,2),f=s[0],d=s[1],N=Object(a.useState)(""),y=Object(m.a)(N,2),k=y[0],g=y[1],j=Object(a.useState)(""),O=Object(m.a)(j,2),C=O[0],w=O[1],S=Object(a.useState)([]),F=Object(m.a)(S,2),x=F[0],P=F[1],L=Object(a.useState)(null),T=Object(m.a)(L,2),J=T[0],K=T[1],R=Object(a.useState)(!1),_=Object(m.a)(R,2),B=_[0],D=_[1];Object(a.useEffect)(function(){h().then(function(e){l(e),P(e)})},[]);var I=function(e){var t=n;(t=t.filter(function(t){return-1!==t.name.toLowerCase().indexOf(e.toLowerCase())})).length===n.length?P(n):P(t)};return c.a.createElement("div",{className:"container"},c.a.createElement("h2",{className:"display-3"},"Puhelinluettelo"),c.a.createElement(p,{message:J,isError:B}),c.a.createElement(o,{value:C,onChange:function(e){w(e.target.value),I(e.target.value)}}),c.a.createElement(u,{valueName:f,valueNumber:k,onChangeName:function(e){d(e.target.value)},onChangeNumber:function(e){g(e.target.value)},onClick:function(e){e.preventDefault();var t,a=!1;if(n.forEach(function(e){e.name===f&&(a=!0,t=e)}),a){if(window.confirm("".concat(f," on jo luettelossa, korvataanko vanha numero uudella?"))){var c={name:f,number:k};!function(e,t){b(e,t).catch(function(e){K("Kontakti '".concat(t.name,"' on jo poistettu tietokannasta")),D(!0),setTimeout(function(){K(null),D(!1)},5e3)})}(t.id,c),d(""),g(""),h().then(function(e){l(e),P(e)})}}else{var r={name:f,number:k};v(r).then(function(e){K("Kontakti '".concat(r.name,"' lis\xe4tty")),D(!1),l(n.concat(r)),setTimeout(function(){K(null)},5e3)}).catch(function(e){K("Nimi tai numero liian lyhyt (nimen on oltava v\xe4hint\xe4\xe4n 3 merkki\xe4 ja numeron 8 merkki\xe4 pitk\xe4)"),D(!0),setTimeout(function(){K(null),D(!1)},5e3)}),d(""),g(""),h().then(function(e){l(e),P(e)})}}}),c.a.createElement(i,{mapNames:x.map(function(e){return c.a.createElement("div",{key:e.name+"_div"},c.a.createElement("p",{key:e.name},e.name," ",e.number),c.a.createElement("button",{onClick:function(){return function(e){window.confirm("Poistetaanko ".concat(e.name,"?"))&&(E(e),h().then(function(e){l(e),P(e)}))}(e)},className:"btn btn-primary",key:e.name+"_btn"},"Poista"))})}))};r.a.render(c.a.createElement(N,null),document.getElementById("root"))}},[[13,1,2]]]);
//# sourceMappingURL=main.f1756ae5.chunk.js.map