export async function httpClient<T>(
  input: RequestInfo | URL,
  init?: RequestInit
) {
  const response = await fetch(input, init)

  if (!response.ok) {
    throw new Error('La solicitud no pudo completarse')
  }

  return (await response.json()) as T
}
