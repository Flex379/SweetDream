import{S as l,N as u,P as d,a as f,A as b,i as m,b as g}from"./assets/vendor-DxdsXMaT.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function a(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(t){if(t.ep)return;t.ep=!0;const s=a(t);fetch(t.href,s)}})();new l(".about-us-swiper",{modules:[u,d],enabled:!1,slidesPerView:1,spaceBetween:24,navigation:{nextEl:".about-us-button-next",prevEl:".about-us-button-prev"},pagination:{el:".about-us-pagination",clickable:!0},breakpoints:{768:{enabled:!0,slidesPerView:2,spaceBetween:24},1440:{enabled:!0,slidesPerView:2,spaceBetween:24}}});const w="https://deserts-store.b.goit.study/api",h={CATEGORIES:"/categories",DESSERTS:"/desserts",FEEDBACKS:"/feedbacks",DESSERT_BY_ID:"/desserts/",ORDERS:"/orders"},y=10;f.defaults.baseURL=w;async function E(e=1){const{data:r}=await f(`${h.FEEDBACKS}?limit=${y}&page=${e}`);return r}const p=document.querySelector(".feedback-list"),o=document.querySelector(".feedback");p&&o&&S();async function S(){o.setAttribute("aria-busy","true");try{const e=await E(),r=Array.isArray(e)?e:e.data??e.feedbacks??e.results??[];if(!r.length)throw new Error("No feedbacks received");p.innerHTML=r.map(v).join(""),new l(".feedback-swiper",{modules:[u,d,b],slidesPerView:1,spaceBetween:16,speed:400,watchOverflow:!0,navigation:{nextEl:".feedback-button-next",prevEl:".feedback-button-prev"},pagination:{el:".feedback-pagination",clickable:!0},breakpoints:{768:{slidesPerView:3,spaceBetween:12},1440:{slidesPerView:3,spaceBetween:24}}})}catch{m.error({title:"Помилка",message:"Не вдалося завантажити відгуки. Спробуйте пізніше.",position:"topRight"})}finally{o.removeAttribute("aria-busy")}}function v(e){const r=c(e.name??e.author??e.userName??"Клієнт"),a=c(e.description??e.comment??e.text??""),i=Math.max(0,Math.min(5,Number(e.rate??e.rating??0)||0));return`
    <li class="swiper-slide feedback-card">
      <div class="feedback-stars"
           role="img"
           aria-label="Рейтинг: ${i} з 5">
        ${A(i)}
      </div>
      <p class="feedback-text">${a}</p>
      <p class="feedback-author">${r}</p>
    </li>
  `}function A(e){return Array.from({length:5},(r,a)=>{const i=Math.max(0,Math.min(1,e-a))*100;return`
      <svg width="20" height="20"
           viewBox="0 0 24 24"
           aria-hidden="true">
        <defs>
          <linearGradient id="feedback-star-${a}-${Math.round(e*10)}">
            <stop offset="${i}%" stop-color="#080c0c"/>
            <stop offset="${i}%" stop-color="#d0cbc8"/>
          </linearGradient>
        </defs>
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"
          fill="url(#feedback-star-${a}-${Math.round(e*10)})"
        />
      </svg>
    `}).join("")}function c(e){return String(e).replace(/[&<>"']/g,r=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[r])}new g(".faq-list",{duration:300,elementClass:"faq-item",triggerClass:"faq-trigger",panelClass:"faq-panel"});
//# sourceMappingURL=index.js.map
