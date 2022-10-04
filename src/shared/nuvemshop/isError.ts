import AppError from '../errors/AppError';

export interface NuvemError {
  code: number;
  message: string;
  description: string;
}

export function isNuvemError(arg: unknown): arg is NuvemError {
  return Boolean(arg && typeof arg === 'object' && 'code' in arg);
}

export function sendAppError(payload: NuvemError): AppError {
  return new AppError(
    `Nuvem informa: ${payload.message} - ${payload.description}`,
    payload.code,
  );
}
