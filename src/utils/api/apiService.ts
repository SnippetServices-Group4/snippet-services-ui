import { auth_audience, BACKEND_URL } from "../constants.ts";
import { useAuth0 } from "@auth0/auth0-react";

const API_URL = BACKEND_URL;

export function useApiService() {
    const { getAccessTokenSilently } = useAuth0();

    const getToken = async () => {
        return await getAccessTokenSilently({ authorizationParams: { audience: auth_audience } });
    };

    const getFetch = async (url: string) => {
        const token = await getToken();
        console.log("Token: ", token);
        return await fetch(API_URL + url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
        });
    };

    const postFetch = async (url: string, body: any) => {
        const token = await getToken();
        const response = await fetch(API_URL + url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(body)
        });
        return response.json();
    };

    const putFetch = async (url: string, body: any) => {
        const token = await getToken();
        const response = await fetch(API_URL + url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(body)
        });
        return response.json();
    };

    const deleteFetch = async (url: string) => {
        const token = await getToken();
        const response = await fetch(API_URL + url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
        });
        return response.json();
    };

    return { getFetch, postFetch, putFetch, deleteFetch };
}
