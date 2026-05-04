function getSlugFromURL(){
 const filename=window.location.pathname.split('/').pop();
 return filename.replace('.html','');
}
function populateProfile(){
 const slug=getSlugFromURL();
 const person=TEAM.find(p=>p.slug===slug);
 
 if(!person){
 window.location.href='../index.html#team';
 return;
}
 
 document.title=`${person.name}— Neil Atkinson Counselling`;
 
 const photoWrap=document.getElementById('profile-photo-wrap');
 if(photoWrap){
 if(person.photo){
 photoWrap.innerHTML=`
<img class="profile-hero__photo"
 src="../${person.photo}"
 alt="Photo of ${person.name}"
 width="480" height="560"
 style="object-position:${person.photoPosition||'center 20%'}">
 `;
}else{
 photoWrap.innerHTML=`
<div class="profile-hero__emoji" aria-hidden="true">${person.emoji}</div>
 `;
}
}
 
 const nameEl=document.getElementById('profile-name');
 const roleEl=document.getElementById('profile-role');
 if(nameEl)nameEl.textContent=person.name;
 if(roleEl)roleEl.textContent=person.role;
 
 const specialismsEl=document.getElementById('profile-specialisms');
 if(specialismsEl&&person.specialisms&&person.specialisms.length){
 specialismsEl.innerHTML=person.specialisms
 .map(s=>`<li class="profile-specialism">${s}</li>`)
 .join('');
}
 
 const bioEl=document.getElementById('profile-bio');
 if(bioEl&&person.bioFull){
 bioEl.innerHTML=person.bioFull
 .split('\n\n')
 .map(p=>`<p>${p.trim()}</p>`)
 .join('');
}
 
 const actionsEl=document.getElementById('profile-actions');
 if(actionsEl){
 const actions=[];
 if(person.booking){
 actions.push(`
<a href="${person.booking}" class="btn btn--primary" target="_blank" rel="noopener noreferrer">
 Book with ${person.name.split(' ')[0]}
</a>
 `);
}
 if(person.website){
 actions.push(`
<a href="${person.website}" class="btn btn--outline" target="_blank" rel="noopener noreferrer">
 Visit website
</a>
 `);
}
 
 actions.push(`
<a href="#contact" class="btn btn--outline">
 Send a message
</a>
 `);
 actionsEl.innerHTML=actions.join('');
}
 
 const firstName=person.name.split(' ')[0];
 
 const contactNameDisplay=document.getElementById('contact-name-display');
 const contactFirstname=document.getElementById('contact-firstname');
 if(contactNameDisplay)contactNameDisplay.textContent=firstName;
 if(contactFirstname)contactFirstname.textContent=firstName;
 
 const formTo=document.getElementById('form-to');
 const formCounsellor=document.getElementById('form-counsellor');
 if(formTo)formTo.value=person.email||'';
 if(formCounsellor)formCounsellor.value=person.name;
 
 const submitBtn=document.getElementById('form-submit');
 if(submitBtn)submitBtn.textContent=`Send message to ${firstName}`;
 
 const form=document.querySelector('.profile-contact__form');
 if(form){
 
 form.setAttribute('action',`/thankyou.html?counsellor=${person.slug}`);
 form.addEventListener('submit',(e)=>{
 const fname=form.querySelector('#fname').value.trim();
 const email=form.querySelector('#email').value.trim();
 if(!fname){showFieldError('fname','Please enter your first name.');e.preventDefault();return;}
 if(!email||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
 showFieldError('email','Please enter a valid email address.');
 e.preventDefault();
 return;
}
 
});
}
}
function showFieldError(fieldId,message){
 const field=document.getElementById(fieldId);
 if(!field)return;
 const existing=field.parentElement.querySelector('.field-error');
 if(existing)existing.remove();
 const error=document.createElement('span');
 error.className='field-error';
 error.textContent=message;
 error.style.cssText='font-size:0.75rem;color:#c0392b;margin-top:0.2rem;display:block;';
 field.parentElement.appendChild(error);
 field.focus();
 field.addEventListener('input',()=>error.remove(),{once:true});
}
if(document.readyState==='loading'){
 document.addEventListener('DOMContentLoaded',populateProfile);
}else{
 populateProfile();
}