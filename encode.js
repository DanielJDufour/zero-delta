/*
    Assumptions:
    - data is an array of numbers from 0 ... N
*/
const fastMax = require("fast-max");

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
