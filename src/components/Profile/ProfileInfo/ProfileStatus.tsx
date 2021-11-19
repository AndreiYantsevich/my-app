import React from 'react';

type PropsType = {
    status: string;
}

class ProfileStatus extends React.Component<PropsType> {
    state = {
        editMode: false
    }

    activateEditMode = () => {
        this.setState( {
           editMode: true,
        })
    }
    deactivateEditMode = () => {
        this.setState( {
            editMode: false,
        })
    }

    render() {
        return (
            <div>
                {!this.state.editMode
                    ? <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status}</span>
                    </div>
                    : <div>
                        <input onBlur={this.deactivateEditMode} autoFocus value={this.props.status}/>
                    </div>
                }
            </div>
        );
    }
}

export default ProfileStatus;