(function(){

 /* ── Hero: CSS fade-in on title (no JS text manipulation) ──────────── */
 function initHeroTitle(){
   var titleEl = document.querySelector('.hero__title--light');
   if(!titleEl) return;
   // Just trigger the CSS animation — text stays untouched in the HTML
   titleEl.classList.add('hero__title--animated');
 }

 /* ── Nav: always cream ── */
 function initNavScroll(){}

 /* ── Parallax nature-band image ──────────────────────────────────── */
 function initParallax(){
   var img = document.querySelector('.approach__nature-img');
   if(!img) return;
   function onScroll(){
     var wrap = img.parentElement;
     var rect = wrap.getBoundingClientRect();
     var vh   = window.innerHeight;
     if(rect.bottom < 0 || rect.top > vh) return;
     var progress = (vh - rect.top) / (vh + rect.height);
     var offset   = (progress - 0.5) * 60;
     img.style.transform = 'translateY(' + offset + 'px)';
   }
   window.addEventListener('scroll', onScroll, { passive: true });
   onScroll();
 }

 /* ── Counting stats animation ────────────────────────────────────── */
 function initCountingStats(){
   /* Auto-update counsellor count from TEAM data */
   var countEl = document.getElementById('counsellor-count');
   if(countEl && typeof TEAM !== 'undefined'){
     countEl.textContent = TEAM.length;
     countEl.dataset.target = TEAM.length;
   }

   var stats = document.querySelectorAll('.stat__number[data-target]');
   if(!stats.length) return;
   var observer = new IntersectionObserver(function(entries){
     entries.forEach(function(entry){
       if(!entry.isIntersecting) return;
       var el     = entry.target;
       var target = parseFloat(el.dataset.target);
       var isInt  = Number.isInteger(target);
       var suffix = el.dataset.suffix || '';
       var duration = 1600;
       var start  = performance.now();
       function tick(now){
         var elapsed = now - start;
         var progress = Math.min(elapsed / duration, 1);
         var ease = 1 - Math.pow(1 - progress, 3);
         var value = target * ease;
         el.textContent = (isInt ? Math.round(value) : value.toFixed(0)) + suffix;
         if(progress < 1) requestAnimationFrame(tick);
       }
       requestAnimationFrame(tick);
       observer.unobserve(el);
     });
   }, { threshold: 0.5 });
   stats.forEach(function(el){ observer.observe(el); });
 }

 /* ── Staggered service & team cards ─────────────────────────────── */
 function initStaggeredCards(){
   var cards = document.querySelectorAll('.services-grid .service-card, .team-grid .team-card');
   if(!cards.length) return;
   var observer = new IntersectionObserver(function(entries){
     entries.forEach(function(entry){
       if(!entry.isIntersecting) return;
       entry.target.classList.add('is-visible');
       observer.unobserve(entry.target);
     });
   }, { threshold: 0.1 });
   cards.forEach(function(card){ observer.observe(card); });
 }

 /* ── Back to top button ──────────────────────────────────────────── */
 function initBackToTop(){
   var btn = document.getElementById('back-to-top');
   if(!btn) return;
   window.addEventListener('scroll', function(){
     btn.classList.toggle('is-visible', window.scrollY > 400);
   }, { passive: true });
   btn.addEventListener('click', function(){
     window.scrollTo({ top: 0, behavior: 'smooth' });
   });
 }

 function initScrollReveal(){
   var revealEls=document.querySelectorAll('.reveal');
   if(!revealEls.length)return;
   var observer=new IntersectionObserver(function(entries){
     entries.forEach(function(entry){
       if(!entry.isIntersecting)return;
       var siblings=[...entry.target.parentElement.querySelectorAll('.reveal')];
       var idx=siblings.indexOf(entry.target);
       entry.target.style.transitionDelay=idx*0.1+'s';
       entry.target.classList.add('is-visible');
       observer.unobserve(entry.target);
     });
   },{threshold:0.12});
   revealEls.forEach(function(el){ observer.observe(el); });
 }

 function initMobileNav(){
   var toggle=document.querySelector('.nav__toggle');
   var links=document.querySelector('.nav__links');
   if(!toggle||!links)return;
   links.id='nav-links';
   toggle.setAttribute('aria-expanded','false');
   toggle.setAttribute('aria-controls','nav-links');
   toggle.addEventListener('click',function(){
     var isOpen=links.classList.toggle('nav__links--open');
     toggle.setAttribute('aria-expanded',isOpen?'true':'false');
   });
   links.querySelectorAll('a').forEach(function(link){
     link.addEventListener('click',function(){
       links.classList.remove('nav__links--open');
       toggle.setAttribute('aria-expanded','false');
     });
   });
   document.addEventListener('click',function(e){
     if(!toggle.contains(e.target)&&!links.contains(e.target)){
       links.classList.remove('nav__links--open');
       toggle.setAttribute('aria-expanded','false');
     }
   });
 }

 function getNavHeight(){
   var nav=document.querySelector('.nav');
   return nav?nav.offsetHeight:100;
 }

 function scrollToTarget(target){
   window.scrollTo({
     top:target.getBoundingClientRect().top+window.scrollY-getNavHeight(),
     behavior:'smooth'
   });
 }

 function initSmoothScroll(){
   document.querySelectorAll('a[href^="#"]').forEach(function(anchor){
     anchor.addEventListener('click',function(e){
       var target=document.querySelector(anchor.getAttribute('href'));
       if(!target)return;
       e.preventDefault();
       scrollToTarget(target);
     });
   });
   if(window.location.hash){
     var target=document.querySelector(window.location.hash);
     if(target){
       setTimeout(function(){
         var navH=getNavHeight();
         var top=0;
         var el=target;
         while(el){top+=el.offsetTop;el=el.offsetParent;}
         window.scrollTo({top:Math.max(0,top-navH),behavior:'instant'});
       },300);
     }
   }
 }

 function init(){
   initHeroTitle();
   initNavScroll();
   initParallax();
   initCountingStats();
   initStaggeredCards();
   initBackToTop();
   initScrollReveal();
   initMobileNav();
   initSmoothScroll();
 }

 if(document.readyState==='loading'){
   document.addEventListener('DOMContentLoaded',init);
 }else{
   init();
 }
})();