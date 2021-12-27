import React, {FC} from 'react';
import style from './MyPosts.module.css';
import Post, {PostType} from './Post/Post';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {maxLengthCreator, requiredField} from '../../../utils/validators/Validators';
import {Textarea} from '../../common/FormsControls/FormsControls';

type PropsType = {
    posts: PostType[]
    addPost: (newPostText: string) => void
}

type FormDataType = {
    newPostText: string
}

const maxLength10 = maxLengthCreator(10);

class MyPosts extends React.PureComponent<PropsType> {

    /*shouldComponentUpdate(nextProps: PropsType, nextState: {}): boolean {
        return nextProps !== this.props || nextState !== this.state;
    }*/

    render() {

        const postsElements = this.props.posts.map(p => <Post id={p.id}
                                                              message={p.message}
                                                              likesCount={p.likesCount}/>)

        const addNewPost = (formData: FormDataType) => {
            this.props.addPost(formData.newPostText)
        }

        return (
            <div className={style.postsBlock}>
                <h3>My posts</h3>
                <AddNewPostFormRedux onSubmit={addNewPost}/>
                <div className={style.posts}>
                    {postsElements}
                </div>
            </div>
        );
    }
};

const AddNewPostForm: FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name={'newPostText'}
                       placeholder={'Enter your post'}
                       validate={[requiredField, maxLength10]}/>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    );
};

const AddNewPostFormRedux = reduxForm<FormDataType>({form: 'profileAddPostForm'})(AddNewPostForm)

export default MyPosts;