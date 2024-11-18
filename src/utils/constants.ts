// Hard code the values for the constants for cypress
export const BACKEND_URL = process?.env?.VITE_BACKEND_URL as string ?? "http:/localhost:80"
export const auth_audience: string = process?.env?.VITE_AUTH0_AUDIENCE as string ?? ""