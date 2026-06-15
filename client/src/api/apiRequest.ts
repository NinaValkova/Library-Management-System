export async function apiRequest<T>(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<T> {
  const response = await fetch(input, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });

  const contentType = response.headers.get("content-type");
  const isJson = contentType?.includes("application/json");

  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    const message =
      data?.message || data?.error || "Something went wrong";
    throw new Error(message);
  }

  return data as T;
}