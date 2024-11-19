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
        console.log("Your token is:", token)
        const response = await fetch(API_URL + url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
        });
        return handleResponse(response);
    };

    const postFetch = async (url: string, body: unknown) => {
        const token = await getToken();
        console.log("Your token is:", token)
        const response = await fetch(API_URL + url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(body)
        });
        return handleResponse(response);
    };

    const putFetch = async (url: string, body: unknown) => {
        const token = await getToken();
        console.log("Your token is:", token)
        const response = await fetch(API_URL + url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(body)
        });
        return handleResponse(response);
    };

    const deleteFetch = async (url: string) => {
        const token = await getToken();
        console.log("Your token is:", token)
        const response = await fetch(API_URL + url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
        });
        return handleResponse(response);
    };

    async function handleResponse(response: Response) {
        const responseJson = await response.json();
        console.log("Backend response:", responseJson);
        if (!response.ok) {
            console.log("Something went wrong when fetching the data: ", responseJson.message);
            return Promise.reject(responseJson.message);
        }
        return responseJson.data;
    }

    return { getFetch, postFetch, putFetch, deleteFetch };
}
