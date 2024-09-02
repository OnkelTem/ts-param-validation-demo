import { expect } from "chai";
import Calc from "./calc.mjs";

const primitives = [
  [null, "null"],
  [undefined, "undefined"],
  ["foo", "a string"],
  [3, "a number"],
  [true, "boolean"],
  [Symbol(), "a symbol"],
] as const;

describe("Calc class tests", () => {
  it("Should accept correct parameters", async () => {
    const res = new Calc({ base: 3 }).add(1);
    expect(res).eql(4);
  });
  it("Should throw on primitives: must be an object (was %thePrimitive%)", async () => {
    for (const [val, label] of primitives) {
      // @ts-ignore
      expect(() => new Calc(val).add(1)).to.throw(
        `must be an object (was ${label})`,
      );
    }
  });
  it("Should throw on objects w/o 'base': base must be a number (was missing)", async () => {
    for (const val of [[], {}, () => 3]) {
      // @ts-ignore
      expect(() => new Calc(val).add(1)).to.throw(
        "base must be a number (was missing)",
      );
    }
  });
  it("Should throw on objects with a wrong primitive 'base': base must be a number (was %theWrong%)", async () => {
    for (const [val, label] of primitives) {
      if (label !== "a number") {
        // @ts-ignore
        expect(() => new Calc({ base: val }).add(1)).to.throw(
          `base must be a number (was ${label})`,
        );
      }
    }
  });
  it("Should throw on objects with an object 'base': base must be a number (was an object)", async () => {
    for (const val of [{}, [], () => 3]) {
      // @ts-ignore
      expect(() => new Calc({ base: val }).add(1)).to.throw(
        "base must be a number (was an object)",
      );
    }
  });
});
