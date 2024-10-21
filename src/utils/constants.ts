export const FRONTEND_URL = process?.env?.FRONTEND_URL ?? "http://localhost:5173"
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:8081"
export const AUTH0_USERNAME = process?.env?.AUTH0_USERNAME ?? ""
export const AUTH0_PASSWORD = process?.env?.AUTH0_PASSWORD ?? ""
export const auth_audience: string = import.meta.env.VITE_AUTH0_AUDIENCE ?? "";