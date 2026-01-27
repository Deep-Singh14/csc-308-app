const myFunctions = require("./sample-functions.js");

test("positive numbers", () => {
  expect(myFunctions.div(10, 2)).toBe(5);
});

test("negative numbers", () => {
  expect(myFunctions.div(-9, 3)).toBe(-3);
});

test("dividing 0", () => {
  expect(myFunctions.div(0, 5)).toBe(0);
});

test("decimals", () => {
  expect(myFunctions.div(1, 2)).toBe(0.5);
});

test("dividing by 0", () => {
  expect(myFunctions.div(5, 0)).toBe(Infinity);
});








test("string contains a digit", () => {
  expect(myFunctions.containsNumbers("abc3def")).toBe(true);
});

test("string contains no digits", () => {
  expect(myFunctions.containsNumbers("abcdef")).toBe(false);
});

test("string is only digits", () => {
  expect(myFunctions.containsNumbers("12345")).toBe(true);
});

test("empty string", () => {
  expect(myFunctions.containsNumbers("")).toBe(false);
});

test("whitespace", () => {
 // should be false but !isNaN(" ") === true
  expect(myFunctions.containsNumbers(" ")).toBe(false);
});

test("letters and spaces with no digits", () => {
  expect(myFunctions.containsNumbers("hello world")).toBe(false);
});
