class StockPortfolio {
  constructor() {
    this.holdings = new Map();
  }

  isEmpty() {
    return this.holdings.size === 0;
  }

  purchase(symbol, shares) {
    this.validateSymbol(symbol);
    this.validateShares(shares);

    const current = this.holdings.get(symbol) ?? 0;
    this.holdings.set(symbol, current + shares);
  }

  sell(symbol, shares) {
    this.validateSymbol(symbol);
    this.validateShares(shares);

    const current = this.holdings.get(symbol) ?? 0;

    if (shares > current) {
      throw new Error("Can't sell this number of shares.");
    }

    const remaining = current - shares;
    if (remaining === 0) {
      this.holdings.delete(symbol); // keep only owned symbols
    } else {
      this.holdings.set(symbol, remaining);
    }
  }

  uniqueSymbolCount() {
    return this.holdings.size;
  }

  sharesOf(symbol) {
    this.validateSymbol(symbol);
    return this.holdings.get(symbol) ?? 0;
  }

  validateSymbol(symbol) {
    if (typeof symbol !== "string" || symbol.trim() === "") {
      throw new Error("Symbol must be a non-empty string.");
    }
  }

  validateShares(shares) {
    if (!Number.isInteger(shares) || shares <= 0) {
      throw new Error("Shares must be a positive integer.");
    }
  }
}

module.exports = { StockPortfolio };
