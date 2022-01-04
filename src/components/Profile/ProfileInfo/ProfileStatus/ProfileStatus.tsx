import React, {ChangeEvent} from 'react';
import styles from './ProfileStatus.module.css';


type ProfileStatusType = {
    status: string
    updateStatus: (status: string) => void
}
type localStateType = {
    editMode: boolean
    status: string
}

class ProfileStatus extends React.Component<ProfileStatusType> {

    state: localStateType = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        // setState renders new virtual DOM
        this.setState({
            editMode: true
        })
    }

    deactivateEditMode = () => {
        // setState renders new virtual DOM
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status)
    }

    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps: Readonly<ProfileStatusType>, prevState: Readonly<{}>) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (
            <div className={styles.wrap}>
                {!this.state.editMode
                    ? <p
                        className={styles.text}
                        onDoubleClick={this.activateEditMode}>
                        {this.props.status}</p>
                    : <input
                        onChange={this.onStatusChange}
                        className={styles.input}
                        onBlur={this.deactivateEditMode}
                        value={this.state.status}
                        autoFocus={true}/>}
            </div>
        )
    }
}

export default ProfileStatus