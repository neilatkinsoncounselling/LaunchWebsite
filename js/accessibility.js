(function() {
  'use strict';

  var PREFS_KEY = 'cc-a11y';
  var panel, btn;

  var defaults = { largeText: false, highContrast: false, reduceMotion: false };

  function loadPrefs() {
    try {
      return JSON.parse(localStorage.getItem(PREFS_KEY)) || {};
    } catch(e) { return {}; }
  }

  function savePrefs(prefs) {
    try { localStorage.setItem(PREFS_KEY, JSON.stringify(prefs)); } catch(e) {}
  }

  function applyPrefs(prefs) {
    var html = document.documentElement;
    html.classList.toggle('a11y-large-text',    !!prefs.largeText);
    html.classList.toggle('a11y-high-contrast', !!prefs.highContrast);
    html.classList.toggle('a11y-reduce-motion', !!prefs.reduceMotion);
  }

  function updatePanel(prefs) {
    if (!panel) return;
    panel.querySelector('[data-pref="largeText"]').setAttribute('aria-pressed', !!prefs.largeText);
    panel.querySelector('[data-pref="highContrast"]').setAttribute('aria-pressed', !!prefs.highContrast);
    panel.querySelector('[data-pref="reduceMotion"]').setAttribute('aria-pressed', !!prefs.reduceMotion);

    panel.querySelector('[data-pref="largeText"]').classList.toggle('a11y-toggle--on', !!prefs.largeText);
    panel.querySelector('[data-pref="highContrast"]').classList.toggle('a11y-toggle--on', !!prefs.highContrast);
    panel.querySelector('[data-pref="reduceMotion"]').classList.toggle('a11y-toggle--on', !!prefs.reduceMotion);
  }

  function buildWidget() {
    // Floating button
    btn = document.createElement('button');
    btn.className = 'a11y-btn';
    btn.setAttribute('aria-label', 'Accessibility options');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', 'a11y-panel');
    btn.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="4" r="2"/><path d="M12 7v5m0 0l-3 5m3-5l3 5M9 12H5m14 0h-4"/></svg><span class="a11y-btn__label">Accessibility</span>';

    // Panel
    panel = document.createElement('div');
    panel.className = 'a11y-panel';
    panel.id = 'a11y-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Accessibility options');
    panel.setAttribute('hidden', '');
    panel.innerHTML =
      '<p class="a11y-panel__title">Accessibility</p>' +
      '<button class="a11y-toggle" data-pref="largeText" aria-pressed="false">' +
        '<span class="a11y-toggle__track"><span class="a11y-toggle__thumb"></span></span>' +
        '<span class="a11y-toggle__label">Larger text</span>' +
      '</button>' +
      '<button class="a11y-toggle" data-pref="highContrast" aria-pressed="false">' +
        '<span class="a11y-toggle__track"><span class="a11y-toggle__thumb"></span></span>' +
        '<span class="a11y-toggle__label">High contrast</span>' +
      '</button>' +
      '<button class="a11y-toggle" data-pref="reduceMotion" aria-pressed="false">' +
        '<span class="a11y-toggle__track"><span class="a11y-toggle__thumb"></span></span>' +
        '<span class="a11y-toggle__label">Reduce motion</span>' +
      '</button>' +
      '<button class="a11y-reset">Reset all</button>';

    // Wrap
    var wrap = document.createElement('div');
    wrap.className = 'a11y-wrap';
    wrap.appendChild(panel);
    wrap.appendChild(btn);
    document.body.appendChild(wrap);

    // Events
    btn.addEventListener('click', function() {
      var open = panel.hasAttribute('hidden');
      if (open) {
        panel.removeAttribute('hidden');
        btn.setAttribute('aria-expanded', 'true');
        btn.classList.add('a11y-btn--open');
        panel.querySelector('.a11y-toggle').focus();
      } else {
        panel.setAttribute('hidden', '');
        btn.setAttribute('aria-expanded', 'false');
        btn.classList.remove('a11y-btn--open');
      }
    });

    panel.addEventListener('click', function(e) {
      var toggle = e.target.closest('[data-pref]');
      if (toggle) {
        var key = toggle.getAttribute('data-pref');
        var prefs = loadPrefs();
        prefs[key] = !prefs[key];
        savePrefs(prefs);
        applyPrefs(prefs);
        updatePanel(prefs);
        return;
      }
      if (e.target.closest('.a11y-reset')) {
        savePrefs(defaults);
        applyPrefs(defaults);
        updatePanel(defaults);
      }
    });

    // Close on outside click
    document.addEventListener('click', function(e) {
      if (!panel.hasAttribute('hidden') && !e.target.closest('.a11y-wrap')) {
        panel.setAttribute('hidden', '');
        btn.setAttribute('aria-expanded', 'false');
        btn.classList.remove('a11y-btn--open');
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && !panel.hasAttribute('hidden')) {
        panel.setAttribute('hidden', '');
        btn.setAttribute('aria-expanded', 'false');
        btn.classList.remove('a11y-btn--open');
        btn.focus();
      }
    });
  }

  // Apply prefs immediately (before paint) to avoid flash
  applyPrefs(loadPrefs());

  // Build widget after DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      buildWidget();
      updatePanel(loadPrefs());
    });
  } else {
    buildWidget();
    updatePanel(loadPrefs());
  }
})();
