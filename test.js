const fs = require("fs");
const test = require("ava");
const vectorize = require("vectorizer/vectorize");
const toTypedArray = require("to-typed-array");
const encode = require("./encode");
const decode = require("./decode");

test("round trip list of years", (t) => {
  const content = fs.readFileSync("./test_data/years.txt", "utf-8");
  const rows = content.split(/\r?\n/g);
  const { array: vector, max } = toTypedArray({ data: vectorize(rows).vector });
  console.log("vector:", vector);
  console.log("max:", max);
  const { data, deltas } = encode({ data: vector, debug: true, max });
  t.is(deltas, 504698);
  t.is(data.byteLength, 1503204);
  t.deepEqual(new Set(new Uint8Array(data)).size, 194);
});
