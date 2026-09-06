import { NextFunction, Request, Response } from 'express';
import { ApiErrorBody } from '../types';

export class ApiError extends Error {
  statusCode: number;
  code: string;

  constructor(statusCode: number, message: string, code = 'ERROR') {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.code = code;
  }
}

export function notFoundHandler(req: Request, res: Response<ApiErrorBody>): void {
  res.status(404).json({
    error: {
      code: 'NOT_FOUND',
      message: `No route for ${req.method} ${req.originalUrl}`,
    },
  });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response<ApiErrorBody>,
  _next: NextFunction,
): void {
  const isApiError = err instanceof ApiError;
  const statusCode = isApiError ? err.statusCode : 500;
  const code = isApiError ? err.code : 'INTERNAL_ERROR';
  const message = isApiError
    ? err.message
    : err instanceof Error
      ? err.message
      : 'Something went wrong';

  if (statusCode >= 500) {
    console.error('[error]', err);
  }

  res.status(statusCode).json({ error: { code, message } });
}
