import { cookies } from "next/headers";

const API = "http://127.0.0.1:5566"; 

export async function getUserOrNull() {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token");

    if (!token) return null;

    try {
        const res = await fetch(`${API}/api/users/me`, {
            method: "GET",
            headers: {
                Cookie: `access_token=${token.value}`,
            },
            cache: "no-store",
        });

        if (!res.ok) return null;

        const json = await res.json();
        
        if (json.data && json.data.user) {
            return json.data.user;
        }

        return null;

    } catch (error) {
        console.error("Auth Error:", error);
        return null;
    }
}

export async function RequireUser() {
    return await getUserOrNull();
}