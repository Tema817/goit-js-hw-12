import{a as p,S as f,i as n}from"./assets/vendor-DvfmeZXB.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const g="https://pixabay.com/api/",y="#";async function h(o){const s={key:y,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0},{data:a}=await p.get(g,{params:s});return a}const m=document.querySelector(".gallery"),l=document.querySelector(".loader"),b=new f(".gallery a",{captions:!0,captionsData:"alt",captionPosition:"bottom",captionDelay:250});function v(o){const s=o.map(({webformatURL:a,largeImageURL:r,tags:e,likes:t,views:i,comments:u,downloads:d})=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${r}">
          <img class="gallery-image" src="${a}" alt="${e}" loading="lazy" />
        </a>
        <div class="meta">
          <div class="meta-item">
            <span class="meta-label">Likes</span>
            <span class="meta-value">${t}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Views</span>
            <span class="meta-value">${i}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Comments</span>
            <span class="meta-value">${u}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Downloads</span>
            <span class="meta-value">${d}</span>
          </div>
        </div>
      </li>`).join("");m.insertAdjacentHTML("beforeend",s),b.refresh()}function L(){m.innerHTML=""}function w(){l.classList.remove("hidden"),l.setAttribute("aria-busy","true")}function S(){l.classList.add("hidden"),l.setAttribute("aria-busy","false")}const c=document.querySelector(".form");c.addEventListener("submit",async o=>{o.preventDefault();const a=(new FormData(c).get("search-text")||"").trim();if(!a){n.warning({title:"Warning",message:"Please enter a search query.",position:"topRight",timeout:2500});return}w(),L();try{const r=await h(encodeURIComponent(a)),{hits:e=[]}=r;if(!e.length){n.info({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",messageColor:"#fafafb",messageSize:"16",backgroundColor:"#ef4040",progressBarColor:"#b51b1b",timeout:3e3,maxWidth:432});return}v(e),n.success({title:"Success",message:`Found ${e.length} images for "${a}".`,position:"topRight",timeout:2e3})}catch{n.error({title:"Error",message:"Something went wrong. Please try again later.",position:"topRight",timeout:3e3})}finally{S(),c.reset()}});
//# sourceMappingURL=index.js.map
