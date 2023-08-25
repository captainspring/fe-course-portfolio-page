import { media } from './../../js/utils/const';

const handleMobileMenu = () => {
  const button = document.querySelector('.header__button');
  const menu = document.querySelector('.header__contacts');
  const socialsLinks = document.querySelectorAll('.header__link');

  // Menu
  const menuHeight = menu.offsetHeight;
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
  const desktop = window.matchMedia(`(min-width: ${media.LG}px)`);

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

export { handleMobileMenu }
