/**
 * GM Mode toggle for The Antiquarians campaign wiki.
 * Password: pacKrat  (change this string to update the password)
 * Stored in localStorage as 'gm_mode' = 'active'.
 * The inline script in <head> disables player.css before first paint — no flash.
 */
(function () {
  var GM_PASSWORD = 'pacKrat';
  var isGM = localStorage.getItem('gm_mode') === 'active';

  // Inject a small GM toggle button into the nav
  document.addEventListener('DOMContentLoaded', function () {
    var nav = document.querySelector('nav');
    if (!nav) return;

    var btn = document.createElement('button');
    btn.id = 'gm-btn';
    btn.textContent = isGM ? 'GM \u2713' : 'GM';
    btn.title = isGM ? 'GM mode active \u2014 click to lock' : 'Unlock GM view';
    btn.style.cssText = [
      'background: none',
      'border: 1px solid ' + (isGM ? '#7a2a40' : 'var(--border)'),
      'color: ' + (isGM ? '#c04060' : 'var(--text-muted)'),
      'font-size: 0.72rem',
      'font-weight: 700',
      'letter-spacing: 0.1em',
      'text-transform: uppercase',
      'padding: 0.2em 0.6em',
      'border-radius: 3px',
      'cursor: pointer',
      'margin-left: 2rem',
      'font-family: inherit',
      'line-height: 1'
    ].join('; ');

    btn.addEventListener('click', function () {
      if (isGM) {
        if (confirm('Exit GM mode? The page will reload in player view.')) {
          localStorage.removeItem('gm_mode');
          location.reload();
        }
      } else {
        var pw = prompt('GM password:');
        if (pw === null) return; // cancelled
        if (pw === GM_PASSWORD) {
          localStorage.setItem('gm_mode', 'active');
          location.reload();
        } else {
          alert('Incorrect password.');
        }
      }
    });

    nav.appendChild(btn);
  });
})();
