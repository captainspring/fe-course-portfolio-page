import { getFocusableElements } from './../../js/utils/getFocusableElements';

const popup = document.querySelector('.popup');
const popupWrapper = popup.querySelector('.popup__wrapper');
const focusTrap = popup.querySelector('.popup__focustrap');
const keyboardfocusableElements = getFocusableElements(popup);
const closeButton = popup.querySelector('.popup__close');

const handleKeys = (evt) => {
  const firstFocusableEl = keyboardfocusableElements[0];

  if (evt.keyCode == 27) {
    closePopup();
  } else if (document.activeElement === firstFocusableEl && evt.keyCode == 9 && evt.shiftKey) {
    evt.preventDefault();
    focusTrap.focus();
  } else if (document.activeElement === focusTrap && evt.keyCode == 9 && !evt.shiftKey) {
    evt.preventDefault();
    firstFocusableEl.focus();
  }
}

const handleClickOutside = (evt) => {
  const el = evt.target;

  if (el === popupWrapper) {
    closePopup();
  }
}

const closePopup = () => {
  document.body.classList.remove('scroll-lock');

  popup.classList.add('popup--hide');

  setTimeout(() => {
    popup.classList.remove('popup--show');
  }, 250)

  closeButton.removeEventListener('click', closePopup);
  popupWrapper.removeEventListener('click', handleClickOutside);
  document.removeEventListener('keydown', handleKeys);
}

const showPopup = () => {
  document.body.classList.add('scroll-lock');

  popup.classList.remove('popup--hide');
  popup.classList.add('popup--show');

  focusTrap.focus();

  closeButton.addEventListener('click', closePopup);
  popupWrapper.addEventListener('click', handleClickOutside);
  document.addEventListener('keydown', handleKeys);
}

export { showPopup }
