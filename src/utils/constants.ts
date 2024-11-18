// Hard code the values for the constants for cypress
export const FRONTEND_URL = process.env.VITE_FRONTEND_URL as string ?? "http:/localhost:5173"
export const BACKEND_URL = process?.env?.BACKEND_URL as string ?? "http:/localhost:80"
export const AUTH0_USERNAME = process?.env?.AUTH0_USERNAME as string ?? ""
export const AUTH0_PASSWORD = process?.env?.AUTH0_PASSWORD as string ?? ""
export const auth_audience: string = process?.env?.VITE_AUTH0_AUDIENCE as string ?? ""