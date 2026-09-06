import { NativeModules, Platform } from 'react-native';
import type { ApiErrorShape } from './types';

const API_PORT = 4000;

/**
 * Resolution order:
 *  1. EXPO_PUBLIC_API_URL, if set (explicit override, e.g. a deployed API).
 *  2. The LAN host the app itself was served from — so a physical device running
 *     through Expo Go reaches the API on the same machine with no extra config.
 *  3. Platform defaults: 10.0.2.2 for the Android emulator, localhost otherwise.
 */
function resolveBaseUrl(): string {
  const fromEnv = process.env.EXPO_PUBLIC_API_URL;
  if (fromEnv && fromEnv.length > 0) {
    return fromEnv.replace(/\/$/, '');
  }

  const scriptURL: string | undefined = NativeModules?.SourceCode?.scriptURL;
  const servedFromHost = scriptURL?.match(/^https?:\/\/([^/:]+)/)?.[1];
  if (servedFromHost && servedFromHost !== 'localhost' && servedFromHost !== '127.0.0.1') {
    return `http://${servedFromHost}:${API_PORT}`;
  }

  const host = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
  return `http://${host}:${API_PORT}`;
}

export const API_BASE_URL = resolveBaseUrl();

export class ApiRequestError extends Error {
  status: number;
  code: string;

  constructor(status: number, message: string, code = 'ERROR') {
    super(message);
    this.name = 'ApiRequestError';
    this.status = status;
    this.code = code;
  }
}

export async function apiGet<T>(path: string): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`);
  } catch {
    throw new ApiRequestError(0, 'Could not reach the server. Check your connection and try again.', 'NETWORK');
  }

  const raw = await response.text();
  const parsed: unknown = raw.length > 0 ? safeJsonParse(raw) : undefined;

  if (!response.ok) {
    const body = parsed as ApiErrorShape | undefined;
    throw new ApiRequestError(
      response.status,
      body?.error?.message ?? `Request failed with status ${response.status}`,
      body?.error?.code ?? 'HTTP_ERROR',
    );
  }

  return parsed as T;
}

function safeJsonParse(raw: string): unknown {
  try {
    return JSON.parse(raw);
  } catch {
    return undefined;
  }
}
