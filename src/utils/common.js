const focusNextFocusableElement = (currentElement, next = true) => {
  currentElement.blur();

  const { body, activeElement } = document;
  const forceFocusNextElement = activeElement === currentElement || activeElement === body;

  if (forceFocusNextElement) {
    const selector = 'input:not([disabled]),button:not([disabled]):not(.mb-input__inner-button)';
    const inputs = document.querySelectorAll(selector);
    const inputList = Array.prototype.slice.call(inputs);
    const nextIndex = inputList.indexOf(currentElement) + (next ? 1 : -1);
    if (nextIndex < 0) {
      inputList[inputList.length + nextIndex].focus();
    } else if (nextIndex >= inputList.length) {
      inputList[nextIndex % inputList.length].focus();
    } else {
      inputList[nextIndex].focus();
    }
  }
};

const composeClassNames = items =>
  items
    .filter(item => item !== true && item !== false && item !== undefined && item !== null)
    .join(' ');

const getParentOverflow = (elem) => {
  const { overflowY } = window.getComputedStyle(elem.parentNode);
  if (overflowY === 'hidden') {
    return elem.parentNode;
  }
  if (overflowY === 'scroll') {
    if (elem.getBoundingClientRect().height > elem.parentNode.offsetHeight) {
      return elem.parentNode;
    }
    return elem;
  }
  if (elem.parentNode === document.body) {
    return document.body;
  }
  return getParentOverflow(elem.parentNode);
};

const getSpaceAvailability = (defaultHeight, handle, wrapper) => {
  const wrapperRect = wrapper.getBoundingClientRect();
  const { top, bottom } = handle.getBoundingClientRect();

  const lowerWrapper = wrapperRect.height + wrapperRect.top - top;
  const lowerInner = window.innerHeight - bottom;
  const maxLowerHeight = Math.min(lowerWrapper, lowerInner) - 10;

  const upperWrapper = top - wrapperRect.top - wrapper.parentNode.scrollTop - 45;
  const maxUpperHeight = Math.min(top, upperWrapper) - 10;
  return {
    maxLowerHeight,
    maxUpperHeight,
  };
};

export { focusNextFocusableElement, composeClassNames, getParentOverflow, getSpaceAvailability };
