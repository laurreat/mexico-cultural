document.addEventListener('DOMContentLoaded', function() {
  var raw = (window.location.pathname.split('/').pop() || 'index.html').split('#')[0].split('?')[0].toLowerCase();
  if (raw === '' || raw === '/') raw = 'index.html';
  function norm(f) { return f.toLowerCase().replace('-en.html', '.html'); }
  var cur = norm(raw);
  document.querySelectorAll('.nav-link').forEach(function(link) {
    var href = (link.getAttribute('href') || '').split('#')[0].split('?')[0];
    var file = href.split('/').pop().toLowerCase();
    if (!file || file === '') return;
    var isActive = false;
    if (file === raw || norm(file) === cur) isActive = true;
    if ((cur === 'index.html') && (file === '#inicio' || href === '#inicio' || href === 'index.html#inicio')) isActive = true;
    if (cur.includes('festival') && file.includes('festival')) isActive = true;
    if (cur.includes('gastronom') && file.includes('gastronom')) isActive = true;
    if (isActive) { link.classList.add('active'); link.setAttribute('aria-current', 'page'); }
    else { link.classList.remove('active'); link.removeAttribute('aria-current'); }
  });
});
