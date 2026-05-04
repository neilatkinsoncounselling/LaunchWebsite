function parseContent(raw){
 if(!raw)return '';
 const lines=raw.split('\n');
 const output=[];
 let listBuffer=[];
 let paragraphLines=[];
 function inlineFormat(text){
 return text
 .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
 .replace(/\*(?!\*)(.+?)(?<!\*)\*/g,'<em>$1</em>');
}
 function flushList(){
 if(listBuffer.length){
 output.push(`<ul class="post__list">${listBuffer.map(i=>`<li>${i}</li>`).join('')}</ul>`);
 listBuffer=[];
}
}
 function flushParagraph(){
 if(paragraphLines.length){
 const text=inlineFormat(paragraphLines.join(' ').trim());
 if(text)output.push(`<p>${text}</p>`);
 paragraphLines=[];
}
}
 for(const line of lines){
 const trimmed=line.trim();
 
 if(trimmed===''){
 flushList();
 flushParagraph();
 continue;
}
 
 if(trimmed.startsWith('## ')){
 flushList();
 flushParagraph();
 output.push(`<h2 class="post__subheading">${inlineFormat(trimmed.slice(3).trim())}</h2>`);
 continue;
}
 
 if(trimmed.startsWith('>')){
 flushList();
 flushParagraph();
 output.push(`<blockquote class="post__callout">${inlineFormat(trimmed.slice(2).trim())}</blockquote>`);
 continue;
}
 
 if(trimmed.startsWith('-')){
 flushParagraph();
 listBuffer.push(inlineFormat(trimmed.slice(2).trim()));
 continue;
}
 
 flushList();
 paragraphLines.push(trimmed);
}
 flushList();
 flushParagraph();
 return output.join('\n');
}
function buildBlogPost(){
 const params=new URLSearchParams(window.location.search);
 const slug=params.get('post');
 const post=POSTS.find(p=>p.slug===slug);
 if(!post){
 window.location.href='index.html';
 return;
}
 
 document.title=`${post.title}--Neil Atkinson Counselling`;
 const metaDesc=document.querySelector('meta[name="description"]');
 if(metaDesc)metaDesc.setAttribute('content',post.excerpt);
 const author=getAuthor(post.author);
 const ogImage=post.ogImage||'../img/og-image.png';
 const ogImageFull=ogImage.startsWith('http')?ogImage:`https://www.neilatkinsoncounselling.co.uk/${ogImage.replace(/^\.\.\//, '')}`;
 [['og:image','twitter:image',ogImageFull],
  ['og:title','twitter:title',`${post.title} — Neil Atkinson Counselling`],
  ['og:description','twitter:description',post.excerpt]
 ].forEach(([og,tw,val])=>{
  const ogEl=document.querySelector(`meta[property="${og}"]`);
  if(ogEl)ogEl.setAttribute('content',val);
  const twEl=document.querySelector(`meta[name="${tw}"]`);
  if(twEl)twEl.setAttribute('content',val);
 });
 
 const titleEl=document.getElementById('post-title');
 if(titleEl)titleEl.textContent=post.title;
 
 const dateEl=document.getElementById('post-date');
 if(dateEl){
 dateEl.textContent=formatDate(post.date);
 dateEl.setAttribute('datetime',post.date);
}
 
 const tagsEl=document.getElementById('post-tags');
 if(tagsEl&&post.tags&&post.tags.length){
 tagsEl.innerHTML=post.tags.map(t=>`<li class="post__tag">${t}</li>`).join('');
}
 
 const authorEl=document.getElementById('post-author');
 if(authorEl&&author){
 const pos=author.photoPosition||'center 20%';
 const avatar=author.photo
 ? `<img class="post__author-photo" src="../${author.photo}" alt="${author.name}" width="48" height="48" loading="lazy" style="object-position:${pos}">`
:`<div class="post__author-emoji" aria-hidden="true">${author.emoji}</div>`;
 authorEl.innerHTML=`
 ${avatar}
<div>
<span class="post__author-name">${author.name}</span>
<span class="post__author-role">${author.role}</span>
</div>
 `;
}
 
 if(post.image){
 const wrap=document.getElementById('post-image-wrap');
 const img=document.getElementById('post-image');
 if(wrap&&img){
 img.src=`../${post.image}`;
 img.alt=post.title;
 wrap.style.display='';
}
}
 
 const bodyEl=document.getElementById('post-body');
 if(bodyEl)bodyEl.innerHTML=parseContent(post.content);
 
 const authorCard=document.getElementById('post-author-card');
 if(authorCard&&author){
 const pos=author.photoPosition||'center 20%';
 const avatar=author.photo
 ? `<img class="author-card__photo" src="../${author.photo}" alt="${author.name}" width="80" height="80" loading="lazy" style="object-position:${pos}">`
:`<div class="author-card__emoji" aria-hidden="true">${author.emoji}</div>`;
 authorCard.innerHTML=`
<p class="author-card__eyebrow">About the author</p>
<div class="author-card__inner">
 ${avatar}
<div class="author-card__content">
<p class="author-card__name">${author.name}</p>
<p class="author-card__role">${author.role}</p>
<p class="author-card__bio">${author.bio}</p>
<a href="../about.html${author.slug}.html" class="author-card__link">
 View full profile
<svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M2 7h10M8 4l4 3-4 3"/></svg>
</a>
</div>
</div>
 `;
}
}
if(document.readyState==='loading'){
 document.addEventListener('DOMContentLoaded',buildBlogPost);
}else{
 buildBlogPost();
}