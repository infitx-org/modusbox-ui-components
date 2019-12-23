const FOCUSABLE_ELEMENTS = [
  '.mb-input__input:not([disabled])',
  '.input-button__input:not([disabled]):not(.mb-input__inner-button)',
];

const getNextFocusableElement = (currentElement, next = true) => {
  const { body, activeElement } = document;
  const forceFocusNextElement = currentElement || activeElement === body;

  if (!forceFocusNextElement) {
    return null;
  }
  const inputs = document.querySelectorAll(FOCUSABLE_ELEMENTS.join(','));
  const inputList = Array.prototype.slice.call(inputs);
  const nextIndex = inputList.indexOf(currentElement) + (next ? 1 : -1);
  let nextInput = null;
  if (nextIndex < 0) {
    nextInput = inputList[inputList.length + nextIndex];
  } else if (nextIndex >= inputList.length) {
    nextInput = inputList[nextIndex % inputList.length];
  } else {
    nextInput = inputList[nextIndex];
  }
  if (nextInput) {
    return nextInput;
  }
  return null;
};

const focusNextFocusableElement = (currentElement, next = true) => {
  const nextInput = getNextFocusableElement(currentElement, next);
  if (nextInput) {
    nextInput.focus();
  }
};

const composeClassNames = items =>
  items
    .filter(item => item !== true && item !== false && item !== undefined && item !== null)
    .join(' ');

const getParentOverflow = elem => {
  if (!elem.parentNode) {
    return document.body;
  }
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

const getScrollParent = node => {
  if (node == null || node === document.body) {
    return document.body;
  }

  const { overflowY } = window.getComputedStyle(node);
  const isScrollable = overflowY === 'scroll' || overflowY === 'auto';
  if (isScrollable && node.scrollHeight > node.clientHeight) {
    return node;
  }
  return getScrollParent(node.parentNode);
};

const getScrollParents = node => {
  const parentNodes = [];
  if (!node) {
    return [];
  }
  let currentNode = node;
  while (getScrollParent(currentNode.parentNode) !== document.body) {
    currentNode = getScrollParent(currentNode.parentNode);
    parentNodes.push(currentNode);
  }
  return parentNodes;
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

export {
  getNextFocusableElement,
  focusNextFocusableElement,
  composeClassNames,
  getParentOverflow,
  getScrollParent,
  getScrollParents,
  getSpaceAvailability,
};
