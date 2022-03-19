import axios from 'axios';

// axios general settings, axios params -> baseUrl and config
// instance makes auto concat for baseUrl and another axios config
export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers: {
        'API-KEY': '7e5b4528-2880-4677-b629-b878b7697787'
    }
})


export type APIResponseType<D = {}, RC = ResultCodeStatus> = {
    data: D
    messages: Array<string>
    resultCode: RC
}
export enum ResultCodeStatus {
    'success' = 0,
    'error' = 1,
    'captchaIsRequired' = 10
}