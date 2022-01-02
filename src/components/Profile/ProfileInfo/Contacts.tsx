import {FC} from 'react';

type PropsType = {
    title: string
    value: any | null
}

export const Contacts: FC<PropsType> = ({title,value}) => {
    return <div><b>{title}</b>: {value}</div>
}