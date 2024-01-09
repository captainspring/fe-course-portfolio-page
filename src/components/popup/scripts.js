import getFocusableElements from './../../js/utils/getFocusableElements';

const popup = document.querySelector('.popup');
const focusTrap = popup.querySelector('.popup__focustrap');
const keyboardfocusableElements = getFocusableElements(popup);
const closeButton = popup.querySelector('.popup__close');

const wrapFocus = () => {
  const firstFocusableEl = keyboardfocusableElements[0];
  firstFocusableEl.focus()
}

const closePopup = () => {
  document.body.classList.remove('scroll-lock');

  popup.classList.remove('popup--show');

  focusTrap.removeEventListener('blur', wrapFocus);
  closeButton.removeEventListener('click', closePopup);
}

const showPopup = () => {
  document.body.classList.add('scroll-lock');

  popup.classList.add('popup--show');
  focusTrap.focus();

  focusTrap.addEventListener('blur', wrapFocus);
  closeButton.addEventListener('click', closePopup);
}

export { showPopup }
