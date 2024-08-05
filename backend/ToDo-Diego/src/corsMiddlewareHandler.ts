import { MiddlewareHandler } from 'hono';
import cors, { CorsOptions } from 'cors';
import { Request, Response } from 'hono';

export const corsMiddleware = (options?: CorsOptions): MiddlewareHandler => {
  const corsHandler = cors(options);

  return async (c, next) => {
    const req = c.req as unknown as Request & { raw: Request };
    const res = c.res as unknown as Response & { raw: Response };

    await new Promise<void>((resolve, reject) => {
      corsHandler(req.raw, res.raw, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    await next();
  };
};
