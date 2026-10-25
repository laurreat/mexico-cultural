document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', function() {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');

  if (toggle && nav) {
    var setOpen = function(open) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      nav.classList.toggle('is-open', open);
    };

    toggle.addEventListener('click', function() {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    nav.addEventListener('click', function(event) {
      if (event.target.closest('a')) {
        setOpen(false);
      }
    });

    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) {
        setOpen(false);
        toggle.focus();
      }
    });

    window.addEventListener('resize', function() {
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
    });
  }

  var raw = (window.location.pathname.split('/').pop() || 'index.html').split('#')[0].split('?')[0].toLowerCase();
  if (raw === '' || raw === '/') raw = 'index.html';
  function norm(f) { return f.toLowerCase().replace('-en.html', '.html'); }
  var cur = norm(raw);
  document.querySelectorAll('.nav-link').forEach(function(link) {
    var href = (link.getAttribute('href') || '').split('#')[0].split('?')[0];
    var file = href.split('/').pop().toLowerCase();
    if (!file) return;
    var isActive = false;
    if (file === raw || norm(file) === cur) isActive = true;
    if (cur.includes('festival') && file.includes('festival')) isActive = true;
    if (cur.includes('gastronom') && file.includes('gastronom')) isActive = true;
    if (isActive) { link.classList.add('active'); link.setAttribute('aria-current', 'page'); }
    else { link.classList.remove('active'); link.removeAttribute('aria-current'); }
  });
});
