import React from 'react';
import s from './Post.module.css';

export type PostType = {
    id: number
    message: string | undefined
    likesCount: number
}

function Post(props: PostType) {
    return (
        <div>
            <div className={s.item}>
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
}

export default Post;