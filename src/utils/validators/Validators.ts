export const requiredField = (value: any) => {
    return value ? undefined : 'Field is required'
}

export const maxLengthCreator = (maxLength: number) => (value: any) => {
    return value.length > maxLength ? `Max length is ${maxLength} symbols` : undefined
}