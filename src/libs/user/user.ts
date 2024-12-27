import baseRequest from "../axios.ts";
import {UserInfor} from "../types/user.ts";

export const getUser = async () => {
    const response = await baseRequest('get', '/api/user');
    return response.data.user as UserInfor;
}