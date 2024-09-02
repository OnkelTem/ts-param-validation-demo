# Proper parameters validation in a TypeScript library 

This repository is an appendix to an article:
[**Parameters validation in TypeScript**](https://gist.github.com/OnkelTem/eee8150868d0ed08ae2a2e8fd5dd178b)

It shows a validation example using [ArkType](https://arktype.io/) library, but it could be 
as well [Zod](https://zod.dev/) or another JavaScript run-time data validator.

## The `Calc` class

This package exports a trivial `Calc` class with the following interface:

```ts
class Calc {
  constructor(params: { base: number });
  add: (x: number) => number;
}
```

The idea is to make the constructor as strict in run-time as in TypeScrip, 
as if TypeScript would exist in run-time.

To save you click here is the final code from [src/calc.mts](src/calc.mts):

```ts
import { type } from "arktype";

// Defined both our data and type validation
const $params = type({ base: "number" });

// Extract the type
type Params = typeof $params.infer;

// A validation helper
function validateParams(params: unknown) {
  const res = $params(params);
  if (res instanceof type.errors) {
    throw res.summary;
  }
  return res;
}

export default class Calc {
  #base: number;
  constructor(params: Params) {
    this.#base = validateParams(params).base;
  }
  add = (x: number) => this.#base + x;
}

```


## `Calc` in run-time

Check out [src/calc.test.mts](src/calc.test.mts) for an exhaustive demonstration 
of "improper" uses of the class in run-time.

The format of tests is chosen for a reason: to once again highlight how many 
unit tests we save when writing code in TypeScript.

## Final words

1) **Write proper TypeScript**

   Don't use `// @ts-ignore`, `any` and other bad things. You can 
find a lot of information on how to avoid those in the internet.
 
   Use type assertions with caution.

2) **Trust your data types in TypeScript-only environment**

   Don't validate parameters in TypeScript that is to be used from TypeScript.

3) **Don't trust data types in JavaScript environment** 

   If a library is to be used _also_ from JavaScript, provide 
all necessary run-time parameter checks.
   
   Use TypeScript validators like **ArkType** or **Zod** to make it right.

  



