import{a as S,S as E,i}from"./assets/vendor-DvfmeZXB.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const q="https://pixabay.com/api/",P="53361848-9c0672c52b1512c0ed401e412";async function p(s,a=1){const o={key:P,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:a,per_page:15},{data:r}=await S.get(q,{params:o});return r}const g=document.querySelector(".gallery"),d=document.querySelector(".loader"),f=document.querySelector(".load-more"),R=new E(".gallery a",{captions:!0,captionsData:"alt",captionPosition:"bottom",captionDelay:250});function y(s){const a=s.map(({webformatURL:o,largeImageURL:r,tags:e,likes:t,views:n,comments:L,downloads:w})=>`
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
            <span class="meta-value">${L}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Downloads</span>
            <span class="meta-value">${w}</span>
          </div>
        </div>
      </li>`).join("");g.insertAdjacentHTML("beforeend",a),R.refresh()}function $(){g.innerHTML=""}function h(){d.classList.remove("hidden"),d.setAttribute("aria-busy","true")}function b(){d.classList.add("hidden"),d.setAttribute("aria-busy","false")}function B(){f.classList.remove("hidden")}function v(){f.classList.add("hidden")}const m=document.querySelector(".form"),C=document.querySelector(".load-more");let l="",c=1,u=0;m.addEventListener("submit",async s=>{if(s.preventDefault(),l=(new FormData(m).get("search-text")||"").trim(),!l){i.warning({title:"Warning",message:"Please enter a search query.",position:"topRight",timeout:2500});return}h(),$(),v(),c=1;try{const o=await p(encodeURIComponent(l),c),{hits:r=[],totalHits:e=0}=o;if(u=e,!r.length){i.info({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",messageColor:"#fafafb",messageSize:"16",backgroundColor:"#ef4040",progressBarColor:"#b51b1b",timeout:3e3,maxWidth:432});return}y(r),B(),i.success({title:"Success",message:`Found ${u} images for "${l}".`,position:"topRight",timeout:2e3})}catch{i.error({title:"Error",message:"Something went wrong. Please try again later.",position:"topRight",timeout:3e3})}finally{b(),m.reset()}});C.addEventListener("click",async()=>{c+=1,h();try{const s=await p(encodeURIComponent(l),c),{hits:a=[]}=s;y(a);const{height:o}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:o*2,behavior:"smooth"}),c*15>=u&&(v(),i.info({title:"End",message:"We're sorry, but you've reached the end of search results.",position:"topRight",timeout:3e3}))}catch{i.error({title:"Error",message:"Something went wrong. Please try again later.",position:"topRight",timeout:3e3})}finally{b()}});
//# sourceMappingURL=index.js.map
