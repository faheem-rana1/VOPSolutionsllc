'use strict';

const toggle = document.querySelector('.mobile-toggle');
const nav = document.querySelector('.navlinks');
const mobileLayout = window.matchMedia('(max-width: 1050px)');

if (toggle && nav) {
  nav.id = 'primary-navigation';
  nav.setAttribute('aria-label', 'Primary navigation');
  toggle.type = 'button';
  toggle.setAttribute('aria-controls', nav.id);
  toggle.setAttribute('aria-expanded', 'false');
  const dropdowns = [...nav.querySelectorAll('.dropdown')];

  function closeDropdowns(except) {
    dropdowns.forEach(dropdown => {
      if (dropdown === except) return;
      dropdown.classList.remove('is-open');
      dropdown.querySelector('.dropbtn').setAttribute('aria-expanded', 'false');
    });
  }

  function closeNavigation() {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
    closeDropdowns();
  }

  toggle.addEventListener('click', () => {
    const open = !nav.classList.contains('open');
    closeNavigation();
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });

  dropdowns.forEach((dropdown, index) => {
    const button = dropdown.querySelector('.dropbtn');
    const menu = dropdown.querySelector('.dropdown-menu');
    button.type = 'button';
    menu.id = `navigation-submenu-${index}`;
    button.setAttribute('aria-controls', menu.id);
    button.setAttribute('aria-expanded', 'false');
    button.addEventListener('click', () => {
      const open = !dropdown.classList.contains('is-open');
      closeDropdowns();
      dropdown.classList.toggle('is-open', open);
      button.setAttribute('aria-expanded', String(open));
    });
    dropdown.addEventListener('keydown', event => {
      if (event.key === 'Escape' && dropdown.classList.contains('is-open')) {
        event.stopPropagation();
        closeDropdowns();
        button.focus();
      }
      if (event.key === 'ArrowDown' && event.target === button) {
        event.preventDefault();
        closeDropdowns(dropdown);
        dropdown.classList.add('is-open');
        button.setAttribute('aria-expanded', 'true');
        menu.querySelector('a').focus();
      }
    });
    dropdown.addEventListener('focusout', event => {
      if (!dropdown.contains(event.relatedTarget)) {
        dropdown.classList.remove('is-open');
        button.setAttribute('aria-expanded', 'false');
      }
    });
  });

  document.addEventListener('click', event => {
    if (!nav.contains(event.target) && !toggle.contains(event.target)) closeNavigation();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      const wasOpen = nav.classList.contains('open');
      closeNavigation();
      if (wasOpen) toggle.focus();
    }
  });
  nav.addEventListener('click', event => {
    if (event.target.closest('a')) closeNavigation();
  });
  mobileLayout.addEventListener('change', closeNavigation);
  document.documentElement.classList.add('nav-enhanced');

  const currentPath = window.location.pathname.replace(/\/$/, '/index.html');
  nav.querySelectorAll('a').forEach(link => {
    if (new URL(link.href).pathname === currentPath) {
      link.setAttribute('aria-current', 'page');
      const parent = link.closest('.dropdown');
      if (parent) parent.querySelector('.dropbtn').classList.add('has-current-page');
    }
  });
}

const main = document.querySelector('main');
if (main) {
  main.id = main.id || 'main-content';
  main.tabIndex = -1;
  const skip = document.createElement('a');
  skip.className = 'skip-link';
  skip.href = `#${main.id}`;
  skip.textContent = 'Skip to content';
  document.body.prepend(skip);
  skip.addEventListener('click', () => main.focus({preventScroll:true}));
}
