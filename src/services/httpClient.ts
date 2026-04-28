export class HttpError extends Error {
  status: number

  data?: unknown

  constructor(message: string, status: number, data?: unknown) {
    super(message)
    this.name = 'HttpError'
    this.status = status
    this.data = data
  }
}

export async function httpClient<T>(
  input: RequestInfo | URL,
  init?: RequestInit
) {
  const response = await fetch(input, init)

  if (!response.ok) {
    let errorMessage = 'La solicitud no pudo completarse'
    let errorData: unknown

    try {
      errorData = await response.json()

      if (
        typeof errorData === 'object' &&
        errorData !== null &&
        'message' in errorData &&
        typeof errorData.message === 'string'
      ) {
        errorMessage = errorData.message
      }
    } catch {
      errorData = undefined
    }

    throw new HttpError(errorMessage, response.status, errorData)
  }

  return (await response.json()) as T
}
