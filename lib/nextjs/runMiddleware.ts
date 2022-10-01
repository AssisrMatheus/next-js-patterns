import { NextApiRequest, NextApiResponse } from "next";

// Ref: https://github.com/vercel/next.js/blob/b85bbac338584dc9382a16d9d3ec9b8844f3c924/examples/api-routes-cors/pages/api/cors.ts#L12
// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
export default function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}
