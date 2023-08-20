export const isSafariInit = () => {
  let isSafari = false;

  if (window && document) {
    isSafari = /^(?:(?!chrome|android).)*safari/i.test(navigator.userAgent);
    const body = document.body;
    const classNeeded = body && isSafari;

    classNeeded && body.classList.add('is-safari');
  }
}
