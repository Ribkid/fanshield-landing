import { NextResponse } from "next/server";

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

// Simple in-memory rate limiter
// Limit: max requests per windowMs
export function rateLimit(ip: string, limit: number = 10, windowMs: number = 60000) {
  const now = Date.now();
  const record = store[ip];

  if (!record) {
    store[ip] = {
      count: 1,
      resetTime: now + windowMs,
    };
    return { success: true };
  }

  if (now > record.resetTime) {
    store[ip] = {
      count: 1,
      resetTime: now + windowMs,
    };
    return { success: true };
  }

  if (record.count >= limit) {
    return { success: false, resetTime: record.resetTime };
  }

  record.count += 1;
  return { success: true };
}

// Cleanup old entries periodically (every 5 minutes)
setInterval(() => {
  const now = Date.now();
  for (const key in store) {
    if (now > store[key].resetTime) {
      delete store[key];
    }
  }
}, 300000);
