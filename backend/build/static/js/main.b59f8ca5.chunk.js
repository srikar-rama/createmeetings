(this.webpackJsonpassignment=this.webpackJsonpassignment||[]).push([[0],{23:function(e,t,n){},43:function(e,t,n){},44:function(e,t,n){},69:function(e,t,n){"use strict";n.r(t);var c=n(1),a=n.n(c),s=n(34),l=n.n(s),i=(n(43),n(36)),r=n(2),o=(n(44),n(17)),d=n(22),j=n(10),b=n(9),u=n.n(b),h=n(16),m=n(14),x=(n(23),n(35)),p=n.n(x),O=n(15),f=n.n(O),g=n(38),v=n(0),y={gmeet:"Google Meet",zmeet:"Zoom"},w=function(e){var t=e.id,n=e.type,c=e.title,a=e.meetLink,s=e.cred_req,l=e.password,i=e.duration,r=e.desc,o=e.start_time,d=e.end_time,j=(e.date,e.time,e.deleteMeet);return Object(v.jsxs)("div",{className:"card col-11 p-2 mb-2 meetinglink",style:{height:"fit-content"},children:[Object(v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[Object(v.jsx)("h4",{style:{color:"black"},children:c}),Object(v.jsxs)("h5",{children:["Venue: ",Object(v.jsx)("span",{style:{color:"black"},children:y[n]})]})]}),Object(v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[Object(v.jsxs)("h6",{style:{marginRight:"2px"},children:["Duration: ",Object(v.jsx)("span",{style:{color:"black"},children:i})]}),Object(v.jsxs)("div",{style:{position:"absolute",display:"flex",right:"0"},children:[Object(v.jsxs)("h6",{style:{marginRight:"7px",color:"black"},children:[new Date(o).toLocaleString(),Object(v.jsx)("span",{style:{color:"black"},children:" - "})]}),Object(v.jsx)("h6",{style:{marginRight:"7px",color:"black"},children:new Date(d).toLocaleString()})]})]}),Object(v.jsx)("div",{children:Object(v.jsxs)("h6",{children:["Description:",Object(v.jsx)("span",{style:{color:"black"},children:r})]})}),Object(v.jsx)("div",{children:s?Object(v.jsxs)("h6",{children:["Password: ",Object(v.jsx)("span",{style:{color:"black"},children:l})]}):Object(v.jsx)(v.Fragment,{})}),Object(v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[Object(v.jsx)("button",{className:"btn btn-secondary",onClick:function(){return window.open(a,"_blank")},target:"_blank",style:{width:"49%"},children:"JOIN"}),Object(v.jsx)("button",{className:"btn btn-dark",onClick:function(e){e.preventDefault(),j(t,n)},style:{width:"49%"},children:Object(v.jsx)(g.a,{style:{fontSize:"1.5em"}})})]})]})},k=["request"],N=["request"],C="/api",D=function(){var e=Object(m.a)(u.a.mark((function e(t){var n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f.a.get("/api/meets");case 2:n=e.sent,console.log(n.data),t(Object(h.a)(n.data.meetups));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();var S=p()((function(e){return{winHeight:e.height,winWidth:e.width}}))((function(e){var t=Object(c.useState)([]),n=Object(j.a)(t,2),a=n[0],s=n[1],l=Object(c.useState)(""),i=Object(j.a)(l,2),r=i[0],b=i[1],x=Object(c.useState)(""),p=Object(j.a)(x,2),O=p[0],g=p[1],y=Object(c.useState)("gmeet"),S=Object(j.a)(y,2),M=S[0],L=S[1],F=6e4*(new Date).getTimezoneOffset(),I=new Date(Date.now()-F).toISOString().slice(0,-1).substr(0,16),T=Object(c.useState)(I),q=Object(j.a)(T,2),_=q[0],z=q[1];Object(c.useEffect)((function(){D(s)}),[]);var E=function(){var e=Object(m.a)(u.a.mark((function e(t,n){var c,a,l;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,f.a.delete("".concat(C,"/meets/").concat(t,"?type=").concat(n));case 3:c=e.sent.data,s((function(e){return Object(h.a)(e.filter((function(e){return e.id!=t})))})),alert(c.data),e.next=13;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0),(a=e.t0.response)&&(a.request,l=Object(d.a)(a,k),console.log(l.data.message),alert(l.data.message));case 13:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t,n){return e.apply(this,arguments)}}(),R=function(){var e=Object(m.a)(u.a.mark((function e(t){var n,c,a,l,i,b,m,x;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),n=_.split("T"),c=Object(j.a)(n,2),a=c[0],l=c[1],i={title:r,type:M,desc:O,date:a,time:l},console.log(i),e.prev=4,e.next=7,f.a.post("".concat(C,"/meets?type=").concat(M),i);case 7:b=e.sent.data,console.log(b.data),s((function(e){return[Object(o.a)(Object(o.a)({},b.data),{},{id:b.id})].concat(Object(h.a)(e))})),e.next=18;break;case 12:e.prev=12,e.t0=e.catch(4),m=e.t0.response,m.request,x=Object(d.a)(m,N),console.log(x.data.message),alert(x.data.message);case 18:case"end":return e.stop()}}),e,null,[[4,12]])})));return function(t){return e.apply(this,arguments)}}();return Object(v.jsxs)("div",{style:{justifyContent:"center",display:"flex",alignItems:"center",flexDirection:"column"},children:[Object(v.jsx)("button",{type:"button",class:"btn btn-primary","data-bs-toggle":"modal","data-bs-target":"#exampleModal",style:{margin:"10px"},children:"Generate Meeting"}),Object(v.jsx)("div",{className:"col-12 col-md-7 links p-2",style:{height:e.winHeight,display:"flex",flexDirection:"column",alignItems:"center"},children:0==a.length?Object(v.jsx)("h1",{children:"No meetings scheduled!"}):Object(v.jsx)(v.Fragment,{children:a.map((function(e){return Object(v.jsx)(w,Object(o.a)({deleteMeet:E},e),e.id)}))})}),Object(v.jsx)("div",{class:"modal fade",id:"exampleModal",tabindex:"-1","aria-labelledby":"exampleModalLabel","aria-hidden":"true",children:Object(v.jsx)("div",{class:"modal-dialog",children:Object(v.jsxs)("div",{class:"modal-content",children:[Object(v.jsxs)("div",{class:"modal-header",children:[Object(v.jsx)("h5",{class:"modal-title",id:"exampleModalLabel",children:Object(v.jsx)("legend",{children:"Create Meeting"})}),Object(v.jsx)("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})]}),Object(v.jsx)("div",{class:"modal-body",children:Object(v.jsxs)("form",{children:[Object(v.jsxs)("fieldset",{children:[Object(v.jsxs)("div",{className:"mb-3",children:[Object(v.jsx)("label",{className:"form-label",children:"Meeting Title"}),Object(v.jsx)("input",{type:"text",value:r,onChange:function(e){return b(e.target.value)},className:"form-control",placeholder:"title"})]}),Object(v.jsxs)("div",{className:"mb-3",children:[Object(v.jsx)("label",{className:"form-label",children:"Description"}),Object(v.jsx)("input",{type:"text",value:O,onChange:function(e){return g(e.target.value)},className:"form-control",placeholder:"description"})]}),Object(v.jsxs)("div",{className:"mb-3",children:[Object(v.jsx)("label",{className:"form-label",children:"Schedule On"}),Object(v.jsx)("input",{type:"datetime-local",min:I,value:_,onChange:function(e){new Date(e.target.value).toLocaleDateString().split("/");console.log(e.target.value),z(e.target.value)},className:"form-control",placeholder:"description"})]}),Object(v.jsxs)("div",{className:"mb-3",children:[Object(v.jsx)("label",{className:"form-label",children:"which meeting?"}),Object(v.jsxs)("select",{id:"Select",value:M,onChange:function(e){return L(e.target.value)},className:"form-select","aria-label":"Default select example",children:[Object(v.jsx)("option",{value:"gmeet",children:"Google meet"}),Object(v.jsx)("option",{value:"zmeet",children:"Zoom"})]})]})]}),Object(v.jsx)("div",{style:{display:"flex",justifyContent:"center"},children:Object(v.jsx)("button",{type:"submit",onClick:R,className:"btn btn-info","data-bs-dismiss":"modal",style:{width:"50%"},children:"CREATE"})})]})})]})})})]})}));var M=function(){return Object(v.jsx)(v.Fragment,{children:Object(v.jsx)(i.a,{children:Object(v.jsx)(r.c,{children:Object(v.jsx)(r.a,{path:"/",exact:!0,component:S})})})})},L=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,71)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,s=t.getLCP,l=t.getTTFB;n(e),c(e),a(e),s(e),l(e)}))};l.a.render(Object(v.jsx)(a.a.StrictMode,{children:Object(v.jsx)(M,{})}),document.getElementById("root")),L()}},[[69,1,2]]]);
//# sourceMappingURL=main.b59f8ca5.chunk.js.map