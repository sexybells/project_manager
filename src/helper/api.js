import { GET, POST } from "./network";

export async function user_login(params) {
    const results = await GET('users?email=' + params.email);
    return results;
}