import React from 'react';
import styles from './MyPosts.module.css';
import Post from './Post/Post';
import PostForm, {PostFormDataType} from './PostForm/PostForm';

export type PostsType = {
    posts: Array<PostType>
    addPost: (newPostBody: string) => void
}

export type PostType = {
    id: string
    message: string
    likesCounter: number
}

// 1. example PureComponent. It can be used instead shouldComponentUpdate
//class MyPosts extends React.PureComponent<PostsType> {


// 2. example shouldComponentUpdate for class Component
// shouldComponentUpdate(nextProps: Readonly<PostsType>, nextState: Readonly<{}>): boolean {
// 	return nextProps != this.props || nextState != this.state
// }


const MyPosts = React.memo((props: PostsType) => {
    let postsElements = props.posts.map(post =>
        <Post
            key={post.id}
            id={post.id}
            message={post.message}
            likesCounter={post.likesCounter}
        />)

    const onSubmit = (formData: PostFormDataType) => {
        props.addPost(formData.newPostBody)
    }

    return (
        <div className={styles.myPosts}>
            <h2>My Posts</h2>

            <PostForm onSubmit={onSubmit}/>

            <div className={styles.postsList}>
                {postsElements}
            </div>
        </div>
    )
})

export default MyPosts;

