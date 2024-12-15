let menu = document.querySelector('.menu');
let nav = document.querySelector('nav');
let dropdown = document.querySelector('.dropdown');
let linkMenu = document.querySelectorAll('.nav-list a');
let navList = document.querySelector('.nav-list');
let trigger = document.querySelector('.dropbtn');
let submenu = document.querySelector('.dropdown-content');

function isMobile() {
  return window.innerWidth <= 768;
}


menu.addEventListener('click', function () {
  if (isMobile()) {
    if (menu.classList.contains('open')) {
      menu.classList.remove('open');
      nav.classList.remove('nav-open');
      dropdown.classList.remove('active');

      navList.style.display = 'none';
    }
    else {
      menu.classList.toggle('open');
      nav.classList.toggle('nav-open');

      navList.style.display = 'flex';
    }
  }
});

dropdown.addEventListener('click', function () {
  if (isMobile()) {
    if (dropdown.classList.contains('active') && menu.classList.contains('open')) {
      dropdown.classList.remove('active');
    }
    else if (!dropdown.classList.contains('active') && menu.classList.contains('open')) {
      dropdown.classList.toggle('active');
    }
  }
});

linkMenu.forEach(function (link) {
  if (isMobile()) {
    link.addEventListener('click', function () {
      menu.classList.remove('open');
      nav.classList.remove('nav-open');
      dropdown.classList.remove('active');

      navList.style.display = 'none';
    });
  }
});


document.addEventListener('DOMContentLoaded', function () {
  if (isMobile()) {
    function toggleMenu() {
      submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
    }

    trigger.addEventListener('click', toggleMenu);
    trigger.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();
      }
    });

    menu.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        menu.click();
      }
    });
  }
});
