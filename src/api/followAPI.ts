import {APIResponseType, instance} from './api';

export const followAPI = {
    unfollowUser(userId: string) {
        return instance.delete<APIResponseType>(`/follow/${userId}`)
            .then(response => response.data)
    },

    followUser(userId: string) {
        return instance.post<APIResponseType>(`/follow/${userId}`)
            .then(response => response.data)
    }

}