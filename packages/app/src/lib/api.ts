// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'
const API_URL = 'http://localhost:3000/api'

export type ApiResponse<T> = {
  data: T
  error: null
} | {
  data: null
  error: {
    message: string
    code?: string
  }
}

export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })
    const data = await response.json()
    return response.ok
      ? { data, error: null }
      : { data: null, error: data }
  } catch (error) {
    return {
      data: null,
      error: {
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      },
    }
  }
}
