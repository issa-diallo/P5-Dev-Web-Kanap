/**
 * @jest-environment jsdom
 */

const {productItemElement} = require("../js/script");

describe("Product", () => {
  it("should show element", () => {
      const product = {
          _id:1
      }
    expect(productItemElement(product)).toContain(
      '<a href="./product.html?id=1">');
  });
});
