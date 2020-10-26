const fs = require("fs");
const test = require("ava");
const vectorize = require("vectorizer/vectorize");
const encode = require("./encode");
const decode = require("./decode");

test("round trip list of years", (t) => {
  const content = fs.readFileSync("./test_data/years.txt", "utf-8");
  const rows = content.split(/\r?\n/g);
  const { index, vector } = vectorize(rows);
  const { nbits, data: bits } = encode({ data: vector });
  t.is(bits.length, 12025636);
  const decoded = decode({ data: bits, nbits });
  t.deepEqual(vector, decoded);
});
