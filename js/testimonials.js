const TESTIMONIALS=[
{
 quote:"I always felt safe, respected, and understood. Your ability to find a balance between being professional and caring made it easy for me to open up, grow and ultimately be my true self. I would definitely recommend counselling to anyone and everyone.",
 initial:'S',
 name:'Anonymous',
 detail:'Online Client of Neil Atkinson',
},

{
 quote:"You helped me tremendously with our 1:1 counselling sessions, you helped me do a lot of personal reflection to recognise myself and how my life has shaped me.  Words cannot explain just how much you've helped me to get to this point so a huge thank you is the least I can offer.",
 initial:'S',
 name:'Anonymous',
 detail:'Face-to-face Client of Neil Atkinson',
},

];
function buildStars(count){
 const n=Math.min(5,Math.max(1,count ?? 5));
 return '★'.repeat(n)+'☆'.repeat(5-n);
}
function buildTestimonialCards(){
 const grid=document.querySelector('.testimonials-grid');
 if(!grid)return;
 grid.innerHTML=TESTIMONIALS.map((t)=>`
<li class="testimonial-card reveal">
<div class="testimonial-card__stars" aria-label="${t.stars ?? 5} out of 5 stars">
 ${buildStars(t.stars)}
</div>
<blockquote class="testimonial-card__quote">
 "${t.quote}"
</blockquote>
<footer class="testimonial-card__author">
<div class="testimonial-card__avatar" aria-hidden="true">${t.initial}</div>
<div>
<p class="testimonial-card__name">${t.name}</p>
<p class="testimonial-card__detail">${t.detail}</p>
</div>
</footer>
</li>
 `).join('');
}
if(document.readyState==='loading'){
 document.addEventListener('DOMContentLoaded',buildTestimonialCards);
}else{
 buildTestimonialCards();
}