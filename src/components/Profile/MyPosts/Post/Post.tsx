import React from 'react';
import style from './Post.module.css';

export type PostType = {
    id: number
    message: string | undefined
    likesCount: number
}

const Post: React.FC<PostType> = React.memo((props) => {
    return (
        <div>
            <div className={style.item}>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxLkbtTa0kfmKizxJgqECQLdlt_xq1R2jEQQ&usqp=CAU"
                    alt=""/>
                {props.message}
                <div>
                    <span>like {props.likesCount}</span>
                </div>
            </div>
        </div>
    );
});

export default Post;