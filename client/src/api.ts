import { User } from "./User";

export const USER_API_URL = 'https://localhost:7195/user';

export const getUsers = async (): Promise<User[] | null>  => {
    try {
        const response = await fetch(USER_API_URL);
        if(!response.ok) return null;
        const data: User[] = await response.json() as User[] ?? [];
        return data;
    }
    catch {
        return null;
    }
}

export const addUser = async (user: User): Promise<boolean> => {
    try {
        const response = await fetch(USER_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        return response.ok;
    }
    catch {
        return false;
    }
}