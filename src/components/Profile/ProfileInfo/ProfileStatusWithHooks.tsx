import React, {ChangeEvent, FC, useEffect, useState} from 'react';

type PropsType = {
    status: string;
    updateUserStatus: (status: string) => void
}

const ProfileStatusWithHooks: FC<PropsType> = (props) => {

    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const onChangeModeHandler = () => {
        setEditMode(!editMode)
        props.updateUserStatus(status)
    }

    const onStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            {!editMode &&
                <div>
                        <span onDoubleClick={onChangeModeHandler}>{props.status || '---'}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input autoFocus onBlur={onChangeModeHandler} onChange={onStatusChangeHandler}
                    value={status}/>
                </div>
            }
        </div>
    );

}

export default ProfileStatusWithHooks;