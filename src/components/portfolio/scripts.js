import { showPopup, closePopup } from './../popup/scripts';

const portfolioButtons = document.querySelectorAll('.portfolio__button');

const handlePorttoflioButton = (evt) => {
  const button = evt.target.closest('button');
  const img = button.dataset.image;
  const isImage = !/null/.test(img);

  const popupPic = document.querySelector('.popup__picture');

  if (isImage) {
    const imageTemplate = `<source
        media="(min-width: 1024px)"
        type="image/webp"
        srcset="img/popup/${img}-popup-lg@1x.webp 1x, img/popup/${img}-popup-lg@2x.webp 2x"
      >
      <source
        media="(min-width: 1024px)"
        srcset="img/popup/${img}-popup-lg@1x.jpg 1x, img/popup/${img}-popup-lg@2x.jpg 2x"
      >
      <source
        type="image/webp"
        srcset="img/popup/${img}-popup-sm@1x.webp 1x, img/popup/${img}-popup-sm@2x.webp 2x"
      >
      <img
        src="img/popup/${img}-popup-sm@1x.jpg"
        srcset="img/popup/${img}-popup-sm@2x.jpg 2x"
        width="280"
        height="209"
        loading="lazy"
        decoding="async"
        alt=""
        class="popup__img"
      >
    `;

    popupPic.innerHTML = imageTemplate;
  } else {
    const placeholderTemplate = document.querySelector("#placeholder");
    const placeholder = placeholderTemplate.content.cloneNode(true);

    popupPic.innerHTML = '';
    popupPic.appendChild(placeholder);
  }

  showPopup();
}

const initPortfolioButtons = () => {
  portfolioButtons.forEach(button => button.addEventListener('click', handlePorttoflioButton));
}

export { initPortfolioButtons }
