(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{FLRI:function(e,a,t){"use strict";t.r(a);t("91GP"),t("f3/d");var r=t("q1tI"),s=t.n(r),l=t("6QdR"),o=t("Wbzz"),n=t("Zttt");a.default=function(){var e=Object(r.useState)({email:"",password:"",passwordConfirm:""}),a=e[0],t=e[1],c=Object(r.useState)(""),m=c[0],d=c[1],i=function(e){var a=e.target.value,r=e.target.name;t((function(e){var t;return Object.assign({},e,((t={})[r]=a,t))})),d("")},p="",u=" rounded-full p-1 fill-current mr-2 ";return a.password===a.passwordConfirm&&a.password.length>=6&&(p+=" text-green-700 ",u+=" bg-green-200 text-green-700 "),(a.password!==a.passwordConfirm||a.password.length<6)&&(p+=" text-red-700 ",u+=" bg-red-200 text-red-700 "),s.a.createElement(n.a,null,s.a.createElement("div",{className:"container max-w-full mx-auto md:py-5 px-6"},s.a.createElement("div",{className:"max-w-sm mx-auto px-6"},s.a.createElement("div",{className:"relative flex flex-wrap"},s.a.createElement("div",{className:"w-full relative"},s.a.createElement("div",{className:"md:mt-0"},s.a.createElement("div",{className:"text-center font-semibold text-black"},"Create your account"),s.a.createElement("div",{className:"text-center font-base text-black"},"You can start using SmarFrame for free."),s.a.createElement("form",{className:"mt-2","x-data":"{password: '',password_confirm: ''}"},s.a.createElement("div",{className:"mx-auto max-w-lg "},s.a.createElement("div",{className:"py-1"},s.a.createElement("span",{className:"px-1 text-sm text-gray-600"},"Email"),s.a.createElement("input",{className:"text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none",placeholder:"",type:"email",name:"email",value:a.email,onChange:i})),s.a.createElement("div",{className:"py-1"},s.a.createElement("span",{className:"px-1 text-sm text-gray-600"},"Password"),s.a.createElement("input",{className:"text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none",placeholder:"",type:"password","x-model":"password",name:"password",value:a.password,onChange:i})),s.a.createElement("div",{className:"py-1"},s.a.createElement("span",{className:"px-1 text-sm text-gray-600"},"Password Confirm"),s.a.createElement("input",{className:"text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none",placeholder:"",type:"password","x-model":"password_confirm",name:"passwordConfirm",value:a.passwordConfirm,onChange:i})),s.a.createElement("div",{className:"flex justify-start mt-3 ml-4 p-1"},s.a.createElement("ul",null,s.a.createElement("li",{className:"flex items-center py-1"},s.a.createElement("div",{className:u},s.a.createElement("svg",{className:"w-4 h-4",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},a.password===a.passwordConfirm&&s.a.createElement("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"}),a.password!==a.passwordConfirm&&s.a.createElement("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M6 18L18 6M6 6l12 12"}))),s.a.createElement("span",{className:p},a.password===a.passwordConfirm&&a.password.length>=6&&"Passwords match",a.password===a.passwordConfirm&&a.password.length<6&&"Password must be at least 6 characters long",a.password!==a.passwordConfirm&&"Passwords do not match")),m&&s.a.createElement("li",{className:"flex items-center py-1"},s.a.createElement("div",{className:"rounded-full p-1 fill-current bg-red-200 text-red-700 mr-2"},s.a.createElement("svg",{className:"w-4 h-4",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},s.a.createElement("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M6 18L18 6M6 6l12 12"}))),s.a.createElement("span",{className:p},m)))),s.a.createElement("div",{className:"flex justify-start"},s.a.createElement("label",{className:"block text-gray-500 font-bold my-4 flex items-center"},s.a.createElement("input",{className:"leading-loose text-pink-600 top-0",type:"checkbox"}),s.a.createElement("span",{className:"ml-2 text-sm py-2 text-gray-600 text-left"},"Accept the",s.a.createElement(o.a,{className:"font-semibold text-black border-b-2 border-gray-200 hover:border-gray-500",to:"/"},"Terms and Conditions of the site"),"and",s.a.createElement(o.a,{className:"font-semibold text-black border-b-2 border-gray-200 hover:border-gray-500",to:"/"},"the information data policy.")))),s.a.createElement("button",{className:"mt-1 text-lg font-semibold bg-gray-800 w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black",type:"button",onClick:function(){d(""),a.password.length>=6&&a.password===a.passwordConfirm&&l.a.auth().createUserWithEmailAndPassword(a.email,a.password).then((function(){Object(o.b)("/app")})).catch((function(e){d(e.message)}))}},"Register"))),s.a.createElement("div",{className:"text-sm font-semibold block py-4 flex justify-center"},s.a.createElement(o.a,{className:"text-black font-normal border-b-2 border-gray-200 hover:border-teal-500",to:"/sign-in"},"You're already member?",s.a.createElement("span",{className:"text-black font-semibold ml-2"},"Login")))))))))}}}]);
//# sourceMappingURL=component---src-pages-create-account-js-613c0a202f9c74a52440.js.map