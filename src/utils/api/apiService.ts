import {BACKEND_URL} from "../constants.ts";

const API_URL = BACKEND_URL;

export async function getFetch(url: string, token: string) {
    console.log("Token: ", token);
    return await fetch(API_URL + url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
    });
}

export async function postFetch(url: string, body: any, token: string) {
    const response = await fetch(API_URL + url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(body)
    });
    return response.json();
}

export async function putFetch(url: string, body: any, token: string) {
    const response = await fetch(API_URL + url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(body)
    });
    return response.json();
}

export async function deleteFetch(url: string, token: string) {
    const response = await fetch(API_URL + url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
    });
    return response.json();
}