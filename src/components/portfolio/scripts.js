const portfolioButtons = document.querySelectorAll('.portfolio__button');

const handlePorttoflioButton = (evt) => {
  const button = evt.target.closest('button');
  const img = button.dataset.image;
  const isImage = !/null/.test(img);
  console.log(isImage);
}

const initPortfolioButtons = () => {
  portfolioButtons.forEach(button => button.addEventListener('click', handlePorttoflioButton));
}

export { initPortfolioButtons }
