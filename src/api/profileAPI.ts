import {PhotosType, ProfileType} from '../types/types';
import {APIResponseType, instance} from './api';

export const profileAPI = {
    getUser(userId: string) {
        return instance.get<ProfileType>(`/profile/${userId}`)
            .then(response => response.data)
    },

    getStatus(userId: string) {
        return instance.get<string>(`/profile/status/${userId}`)
            .then(response => response.data)
    },

    updateStatus(status: string) {
        return instance.put<APIResponseType>(`/profile/status`, {status})
            .then(response => response.data)
    },

    savePhoto(file: File) {
        let formData = new FormData()
        formData.append('image', file)
        return instance.put<APIResponseType<{ photos: PhotosType }>>(`/profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => response.data)
    },

    saveProfile(profile: ProfileType) {
        return instance.put<APIResponseType>(`/profile`, profile)
            .then(response => response.data)
    }
}