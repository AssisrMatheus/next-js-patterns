// Do not change this name
export class UnauthorizedError extends Error {
  // Do not change this code
  status = 401;
  // Do not change this name
  name = "UnauthorizedError";
  constructor() {
    // Do not change this message
    super("unauthorized");
  }
}
