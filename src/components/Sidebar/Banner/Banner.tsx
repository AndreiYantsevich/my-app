import React from 'react';
import styles from './Banner.module.css';

type BannerType = {
    title?: string
    image: string
}

const Banner = (props: BannerType) => {
    return (
        <div className={styles.banner}>
            <img src={props.image} alt={props.title}/>
        </div>
    )
}

export default Banner;