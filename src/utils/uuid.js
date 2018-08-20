/* eslint-disable no-bitwise, no-mixed-operators */

const uuid = () => {
  let _uuid = '';
  let i;
  let random;
  for (i = 0; i < 32; i += 1) {
    random = Math.random() * 16 | 0;

    if (i === 8 || i === 12 || i === 16 || i === 20) {
      _uuid += '-';
    }
    let sum = 0;
    if (i === 12) {
      sum = 4;
    } else if (i === 16) {
      sum = random & 3 | 8;
    } else {
      sum = random;
    }
    _uuid += (sum).toString(16);
  }
  return _uuid;
};

export default uuid;
