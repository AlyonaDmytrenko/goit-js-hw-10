import"./assets/style-8d46c55f.js";import{f as l,i as d}from"./assets/vendor-77e16229.js";const f={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){e[0]<=new Date?(d.error({title:"Error",message:"Please choose a date in the future"}),document.querySelector("[data-start]").disabled=!0):document.querySelector("[data-start]").disabled=!1}};l("#datetime-picker",f);const h=document.querySelector(".timer .value[data-days]"),y=document.querySelector(".timer .value[data-hours]"),D=document.querySelector(".timer .value[data-minutes]"),S=document.querySelector(".timer .value[data-seconds]"),c=document.querySelector("[data-start]");c.addEventListener("click",g);function g(){const e=l.parseDate(document.getElementById("datetime-picker").value,"Y-m-d H:i"),n=new Date;if(e<=n){d.error({title:"Error",message:"Please choose a date in the future"});return}c.disabled=!0,document.getElementById("datetime-picker").disabled=!0;let t=e.getTime()-n.getTime();const u=setInterval(()=>{const{days:i,hours:r,minutes:a,seconds:s}=p(t);h.textContent=o(i),y.textContent=o(r),D.textContent=o(a),S.textContent=o(s),t-=1e3,t<0&&(clearInterval(u),d.success({title:"Countdown Finished",message:"The countdown has ended."}),c.disabled=!1,document.getElementById("datetime-picker").disabled=!1)},1e3)}function p(e){const r=Math.floor(e/864e5),a=Math.floor(e%864e5/36e5),s=Math.floor(e%864e5%36e5/6e4),m=Math.floor(e%864e5%36e5%6e4/1e3);return{days:r,hours:a,minutes:s,seconds:m}}function o(e){return String(e).padStart(2,"0")}
//# sourceMappingURL=commonHelpers.js.map
