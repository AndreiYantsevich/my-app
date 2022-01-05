import {UsersStructureType} from '../../types/types';

export const updateObjectInArray = (items: Array<UsersStructureType>, itemId: string, objPropName: keyof UsersStructureType, newObjProps: Object) => {
    return items.map(u => {
        if (u[objPropName] === itemId) {
            return {...u, ...newObjProps}
        }
        return u
    })
}