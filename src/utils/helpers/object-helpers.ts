import {UserType} from '../../types/types';

export const updateObjectInArray = (items: Array<UserType>, itemId: string, objPropName: keyof UserType, newObjProps: Object) => {
    return items.map(u => {
        if (u[objPropName] === itemId) {
            return {...u, ...newObjProps}
        }
        return u
    })
}