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
