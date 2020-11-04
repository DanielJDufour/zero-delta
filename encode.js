/*
    Assumptions:
    - data is an array of numbers from 0 ... N
*/
const fastMax = require("fast-max");

/*
  Output will be in the form
  1 - correct
  0 (incorrect) correction (0 padded nbits)
*/

module.exports = ({ data: nums, debug, max }) => {
  // console.log("nums:", nums.slice(0, 10));
  if (max === undefined || max === null) max = fastMax(nums);
  if (debug) console.log("[zero-delta] max:", max);

  const nbits = max.toString(2).length;
  if (debug) console.log("[zero-delta] nbits:", nbits);

  // determine how many mistakes
  let deltas = 0;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1]) deltas++;
  }
  if (debug) console.log("[zero-delta] deltas:", deltas);
  if (debug) console.log("[zero-delta] mistakes:", deltas / nums.length);

  const bitLength = 1 * (nums.length - deltas) + (1 + nbits) * deltas;
  if (debug) console.log("[zero-delta] bitLength:", bitLength);

  const byteLength = Math.ceil(bitLength / 8);
  if (debug) console.log("[zero-delta] byteLength:", byteLength);

  let position = 0;
  const output = new Uint8Array(byteLength);
  if (debug) console.log("[zero-delta] output:", output);

  let bits = "0" + nums[0].toString(2).padStart(nbits, "0");

  let previous = nums[0];
  for (let i = 1; i < nums.length; i++) {
    const current = nums[i];
    if (current === previous) {
      bits += "1";
    } else {
      bits += "0" + current.toString(2).padStart(nbits, "0");
    }
    previous = current;

    while (bits.length >= 8) {
      output[position] = parseInt(bits.substr(0, 8), 2);
      bits = bits.substring(8);
      position++;
    }
  }
  const data = output.buffer;
  if (debug) console.log("data:", data);
  return { data, deltas, max };
};
/*
module.exports = ({ data: nums, debug }) => {
  const max = fastMax(nums);
  if (debug) console.log("[zero-delta] max:", max);

  const nbits = max.toString(2).length;
  if (debug) console.log("[zero-delta] nbits:", nbits);

  let bits = "0" + nums[0].toString(2).padStart(nbits, "0");

  let previous = nums[0];
  for (let i = 1; i < nums.length; i++) {
    const current = nums[i];
    if (current === previous) {
      bits += "1";
    } else {
      bits += "0" + current.toString(2).padStart(nbits, "0");
    }
    previous = current;
  }

  return { nbits, data: bits };
};
*/
