import React, { Component } from 'react'
import styles from './PostCard.module.css'

class PostCard extends Component {
   render() {
      const { data: post } = this.props
      return (
         <div className={styles.card}>
            <img alt='post-img' src={post.src}></img>
            <div className={styles['card-footer']}>
               <span>{post.autor}</span>
               <p>{post.text}</p>
            </div>
         </div>
      )
   }
}

export default PostCard
