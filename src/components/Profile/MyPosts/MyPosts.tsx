import React, {ChangeEvent} from 'react';
import style from './MyPosts.module.css';
import Post, { PostType } from './Post/Post';

type MyPostsPropsType = {
    posts: PostType[]
    newPostText: string
    updateNewPostText: (payload: string) => void
    addPost: () => void
}

const MyPosts: React.FC<MyPostsPropsType> = React.memo((props) => {

    const postsElements = props.posts.map(p => <Post id={p.id} message={p.message} likesCount={p.likesCount}/>)

    const onPostChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
       let newText = event.currentTarget.value
        props.updateNewPostText(newText)
    }

    const onAddPostHandler = () => {
        props.addPost()
    }

    return (
        <div className={style.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea value={props.newPostText} onChange={onPostChangeHandler}/>
                </div>
                <div>
                    <button onClick={onAddPostHandler}>Add post</button>
                    <button>Remove</button>
                </div>
            </div>
            <div className={style.posts}>
                {postsElements}
            </div>
        </div>
    );
});

export default MyPosts;