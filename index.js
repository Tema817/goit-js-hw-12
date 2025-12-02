import{a as E,S as q,i}from"./assets/vendor-DvfmeZXB.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const P="https://pixabay.com/api/",R="#";async function g(s,a=1){const o={key:R,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:a,per_page:15},{data:r}=await E.get(P,{params:o});return r}const f=document.querySelector(".gallery"),m=document.querySelector(".loader"),y=document.querySelector(".load-more"),$=new q(".gallery a",{captions:!0,captionsData:"alt",captionPosition:"bottom",captionDelay:250});function h(s){const a=s.map(({webformatURL:o,largeImageURL:r,tags:e,likes:t,views:n,comments:w,downloads:S})=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${r}">
          <img class="gallery-image" src="${o}" alt="${e}" loading="lazy" />
        </a>
        <div class="meta">
          <div class="meta-item">
            <span class="meta-label">Likes</span>
            <span class="meta-value">${t}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Views</span>
            <span class="meta-value">${n}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Comments</span>
            <span class="meta-value">${w}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Downloads</span>
            <span class="meta-value">${S}</span>
          </div>
        </div>
      </li>`).join("");f.insertAdjacentHTML("beforeend",a),$.refresh()}function B(){f.innerHTML=""}function b(){m.classList.remove("hidden"),m.setAttribute("aria-busy","true")}function v(){m.classList.add("hidden"),m.setAttribute("aria-busy","false")}function p(){y.classList.remove("hidden")}function L(){y.classList.add("hidden")}const u=document.querySelector(".form"),C=document.querySelector(".load-more");let l="",c=1,d=0;u.addEventListener("submit",async s=>{if(s.preventDefault(),l=(new FormData(u).get("search-text")||"").trim(),!l){i.warning({title:"Warning",message:"Please enter a search query.",position:"topRight",timeout:2500});return}b(),B(),L(),c=1;try{const o=await g(encodeURIComponent(l),c),{hits:r=[],totalHits:e=0}=o;if(d=e,!r.length){i.info({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",messageColor:"#fafafb",messageSize:"16",backgroundColor:"#ef4040",progressBarColor:"#b51b1b",timeout:3e3,maxWidth:432});return}h(r),d>15&&p(),i.success({title:"Success",message:`Found ${d} images for "${l}".`,position:"topRight",timeout:2e3})}catch{i.error({title:"Error",message:"Something went wrong. Please try again later.",position:"topRight",timeout:3e3})}finally{v(),u.reset()}});C.addEventListener("click",async()=>{c+=1,L(),b();try{const s=await g(encodeURIComponent(l),c),{hits:a=[]}=s;h(a);const{height:o}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:o*2,behavior:"smooth"}),c*15<d?p():i.info({title:"End",message:"We're sorry, but you've reached the end of search results.",position:"topRight",timeout:3e3})}catch{i.error({title:"Error",message:"Something went wrong. Please try again later.",position:"topRight",timeout:3e3}),p()}finally{v()}});
//# sourceMappingURL=index.js.map
