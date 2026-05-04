function buildBlogListing(){
  var grid = document.getElementById('blog-grid');
  if(!grid) return;
  if(!POSTS || !POSTS.length){
    grid.innerHTML = '<li class="blog-empty">No posts yet — check back soon.</li>';
    return;
  }

  // Only show blog posts — guides are hidden from the listing
  var visiblePosts = POSTS.filter(function(p){ return p.category === 'blog'; });
  if(!visiblePosts.length){
    grid.innerHTML = '<li class="blog-empty">No posts yet — check back soon.</li>';
    return;
  }

  // Palette cycles through site colours
  var tabColours = [
    'var(--colour-sage)',
    'var(--colour-slate)',
    'var(--colour-forest)',
    'var(--colour-rose)',
    'var(--colour-moss)',
    'var(--colour-umber)',
    'var(--colour-taupe)',
    'var(--colour-brown)',
  ];

  grid.innerHTML = visiblePosts.map(function(post, index){
    var author    = getAuthor(post.author);
    var authorPos = (author && author.photoPosition) || 'center 20%';
    var authorAvatar = author && author.photo
      ? '<img class="blog-card__author-photo" src="../' + author.photo + '" alt="' + author.name + '" width="36" height="36" loading="lazy" style="object-position:' + authorPos + '">'
      : '<div class="blog-card__author-emoji" aria-hidden="true">' + (author ? author.emoji : '✍️') + '</div>';

    var tagPills = post.tags && post.tags.length
      ? post.tags.map(function(t){ return '<span class="blog-card__tag">' + t + '</span>'; }).join('')
      : '';

    var colour = tabColours[index % tabColours.length];

    var wordCount = ((post.excerpt || '').split(/\s+/).length) + 150;
    var readMins  = Math.max(1, Math.round(wordCount / 200));
    var readTime  = '<span class="blog-card__read-time">' + readMins + ' min read</span>';

    var delay = (index * 0.1).toFixed(1);

    return '<li class="blog-card" style="opacity:0;transform:translateY(24px);transition:opacity 0.55s ' + delay + 's ease,transform 0.55s ' + delay + 's ease,box-shadow 0.3s">'
      + '<a href="' + post.slug + '.html" class="blog-card__link" aria-label="Read: ' + post.title + '">'
      + '<div class="blog-card__tab" style="background:' + colour + '" aria-hidden="true">'
      + '<h2 class="blog-card__title">' + post.title + '</h2>'
      + '</div>'
      + '<div class="blog-card__body">'
      + '<div class="blog-card__pills">' + tagPills + '</div>'
      + '<p class="blog-card__excerpt">' + post.excerpt + '</p>'
      + '<div class="blog-card__footer">'
      + '<div class="blog-card__author">'
      + authorAvatar
      + '<div><span class="blog-card__author-name">' + post.author + '</span>'
      + '<time class="blog-card__date" datetime="' + post.date + '">' + formatDate(post.date) + '</time></div>'
      + '</div>'
      + '<div style="display:flex;align-items:center;gap:0.8rem;">'
      + readTime
      + '<span class="blog-card__read-more" aria-hidden="true">Read '
      + '<svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 7h10M8 4l4 3-4 3"/></svg></span>'
      + '</div></div></div></a></li>';
  }).join('');

  var cards = grid.querySelectorAll('.blog-card');
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(!entry.isIntersecting) return;
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.1 });
  cards.forEach(function(c){ obs.observe(c); });
}

if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', buildBlogListing);
} else {
  buildBlogListing();
}
