import React, { Component } from 'react'
import styles from './PostCard.module.css'

class PostCard extends Component {
   render() {
      const { data: post } = this.props
      return (
         <div className={styles.card}>
            <img alt='post-img' src={post.src}></img>
            <div className={styles['card-footer']}>
               <span>{post.title}</span>
               <span>{post.author}</span>
            </div>
         </div>
      )
   }
}

export default PostCard
