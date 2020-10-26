module.exports = ({ data: bits, nbits }) => {
  const results = [];
  let current;
  for (let i = 0; i < bits.length; i++) {
    const bit = bits[i];
    if (bit === 0) {
      current = bits.substr(i + 1, nbits);
      i = i + 1 + nbits;
    }
    results.push(current);
  }
  return results;
};
