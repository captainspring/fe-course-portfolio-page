export const getFocusableElements = (el) => {
  return [
    ...el.querySelectorAll(
      'a[href], button:not(:disabled), input:not(:disabled), textarea:not(:disabled), select:not(:disabled), details, [tabindex]:not([tabindex="-1"])'
    ),
  ].filter(el => getComputedStyle(el).display !== 'none' && !el.getAttribute('aria-hidden'));
}

