import { NextFunction, Request, Response } from 'express';

/**
 * Adds a small artificial delay so the client's loading / skeleton states are
 * actually visible during development. Configure with LATENCY_MS (default 500, 0 disables).
 */
export function latency(req: Request, _res: Response, next: NextFunction): void {
  const ms = Number(process.env.LATENCY_MS ?? 500);
  if (!Number.isFinite(ms) || ms <= 0) {
    next();
    return;
  }
  setTimeout(next, ms);
}
