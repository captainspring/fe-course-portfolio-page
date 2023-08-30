import { media } from './../../js/utils/const';

const header = document.querySelector('.header');
const desktop = window.matchMedia(`(min-width: ${media.LG}px)`);

const handleMobileMenu = () => {
  const button = header.querySelector('.header__button');
  const menu = header.querySelector('.header__contacts');
  const socialsLinks = header.querySelectorAll('.header__link');

  // Menu
  const menuHeight = 44;
  let isMenuOpen = false;

  const toggleLinksTabindex = (enable) => {
    socialsLinks.forEach((link) => {
      link.tabIndex = enable ? '0' : '-1';
    });
  }

  const buttonClickHandler = () => {
    menu.style.height = `${isMenuOpen ? 0 : menuHeight}px`;

    button.classList.toggle('header__button--open');
    menu.classList.toggle('header__contacts--closed');
    menu.classList.toggle('header__contacts--open');

    toggleLinksTabindex(!isMenuOpen);

    isMenuOpen = !isMenuOpen;
  }

  // Media
  const mediaChangeListener = () => {
    toggleLinksTabindex(desktop.matches);

    if (desktop.matches) {
      menu.removeAttribute('style');
      menu.classList.remove('header__contacts--closed');
      menu.classList.remove('header__contacts--open');
      button.removeEventListener('click', buttonClickHandler);
      button.setAttribute('disabled', '');
    } else {
      menu.style.height = '0px';
      menu.classList.add('header__contacts--closed');
      button.addEventListener('click', buttonClickHandler)
      button.removeAttribute('disabled');
    }
  }

  mediaChangeListener();
  desktop.addEventListener('change', mediaChangeListener);
}

const handleScrollHeader = () => {
  let prevScrollpos = window.pageYOffset;

  const handleScroll = () => {
    let currentScrollPos = window.pageYOffset;
    const headerHeight = header.offsetHeight;

    if (prevScrollpos > currentScrollPos) {
      header.style.top = '0';
    } else {
      header.style.top = `-${headerHeight}px`;
    }

    prevScrollpos = currentScrollPos;
  }

  window.addEventListener('scroll', handleScroll);
}

export { handleMobileMenu, handleScrollHeader }
