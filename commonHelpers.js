import"./assets/style-8d46c55f.js";import{f as i,i as d}from"./assets/vendor-77e16229.js";const h={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){e[0]<=new Date?(d.error({title:"Error",message:"Please choose a date in the future"}),document.querySelector("[data-start]").disabled=!0):document.querySelector("[data-start]").disabled=!1}};i("#datetime-picker",h);const f=document.querySelector(".timer .value[data-days]"),y=document.querySelector(".timer .value[data-hours]"),v=document.querySelector(".timer .value[data-minutes]"),D=document.querySelector(".timer .value[data-seconds]"),s=document.querySelector("[data-start]");s.addEventListener("click",()=>{const e=i.parseDate(document.getElementById("datetime-picker").value,"Y-m-d H:i"),n=new Date;if(e<=n){d.error({title:"Error",message:"Please choose a date in the future"});return}s.disabled=!0,document.getElementById("datetime-picker").disabled=!0;const t=e.getTime()-n.getTime();countdownInterval=setInterval(()=>{const{days:c,hours:u,minutes:r,seconds:a}=S(t);f.textContent=o(c),y.textContent=o(u),v.textContent=o(r),D.textContent=o(a),t-=1e3,t<0&&(clearInterval(countdownInterval),d.success({title:"Countdown Finished",message:"The countdown has ended."}),s.disabled=!1,document.getElementById("datetime-picker").disabled=!1)},1e3)});function S(e){const r=Math.floor(e/864e5),a=Math.floor(e%864e5/36e5),l=Math.floor(e%864e5%36e5/6e4),m=Math.floor(e%864e5%36e5%6e4/1e3);return{days:r,hours:a,minutes:l,seconds:m}}function o(e){return String(e).padStart(2,"0")}
//# sourceMappingURL=commonHelpers.js.map
