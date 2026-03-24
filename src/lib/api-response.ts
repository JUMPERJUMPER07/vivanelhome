import { NextResponse } from "next/server";

export function apiOk<T>(data: T, init?: ResponseInit) {
  return NextResponse.json(data, init);
}

export function apiCreated<T>(data: T) {
  return NextResponse.json(data, { status: 201 });
}

export function apiError(message: string, status = 400, details?: unknown) {
  return NextResponse.json(
    {
      error: {
        message,
        details: details ?? null,
      },
    },
    { status },
  );
}
