const DEFAULT_BASE_URL = "http://localhost:3000/api/v1";

export function getApiBaseUrl(): string {
  return process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_BASE_URL;
}

type RequestConfig = {
  method?: "GET" | "POST";
  body?: unknown;
  token?: string | null;
};

export async function apiFetch<T>(
  path: string,
  config: RequestConfig = {},
): Promise<T> {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    method: config.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      ...(config.token ? { Authorization: `Bearer ${config.token}` } : {}),
    },
    body: config.body ? JSON.stringify(config.body) : undefined,
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      payload && typeof payload.message === "string"
        ? payload.message
        : "Request failed";
    throw new Error(message);
  }

  return payload as T;
}
