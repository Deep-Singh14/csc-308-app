// stockPortfolio.test.js

const { StockPortfolio } = require("./stockPortfolio");

/*
Reflection on TDD:
Mostly yes — I was able to follow red-green-refactor for each increment by writing a failing test first,
then adding the smallest real implementation to pass, and  then cleaning things up.
The hardest part was resisting the urge to jump ahead and code the later parts first.
After doing this assignment, TDD feels useful for discovering and solving edge cases,
but it does feel slower at first because of switching between tests and implementation.
*/

test("2.1", () => {
  const p = new StockPortfolio();
  expect(p.isEmpty()).toBe(true);
  expect(p.uniqueSymbolCount()).toBe(0);
});

test("2.2", () => {
  const p = new StockPortfolio();
  expect(p.isEmpty()).toBe(true);

  p.purchase("GME", 1);
  expect(p.isEmpty()).toBe(false);
});

test("2.3", () => {
  const p = new StockPortfolio();

  p.purchase("RBLX", 10);
  expect(p.sharesOf("RBLX")).toBe(10);

  p.purchase("RBLX", 5);
  expect(p.sharesOf("RBLX")).toBe(15);
});

test("2.4", () => {
  const p = new StockPortfolio();

  p.purchase("GME", 10);
  p.sell("GME", 3);

  expect(p.sharesOf("GME")).toBe(7);
});

test("2.5", () => {
  const p = new StockPortfolio();

  p.purchase("GME", 5);
  p.purchase("RBLX", 10);

  expect(p.uniqueSymbolCount()).toBe(2);

  p.purchase("GME", 100);
  expect(p.uniqueSymbolCount()).toBe(2);
});

test("2.6", () => {
  const p = new StockPortfolio();

  p.purchase("GME", 2);
  expect(p.uniqueSymbolCount()).toBe(1);

  p.sell("GME", 2); // should remove symbol entirely
  expect(p.uniqueSymbolCount()).toBe(0);
  expect(p.isEmpty()).toBe(true);
});

test("2.7", () => {
  const p = new StockPortfolio();

  expect(p.sharesOf("NVDA")).toBe(0);

  p.purchase("NVDA", 4);
  expect(p.sharesOf("NVDA")).toBe(4);

  p.sell("NVDA", 4);
  expect(p.sharesOf("NVDA")).toBe(0);
});

test("2.8", () => {
  const p = new StockPortfolio();

  p.purchase("AAPL", 3);

  expect(() => p.sell("AAPL", 4)).toThrow(
    "Can't sell this number of shares.",
  );

  // also applies when you own none
  expect(() => p.sell("TSLA", 1)).toThrow(
    "Can't sell this number of shares.",
  );
});
