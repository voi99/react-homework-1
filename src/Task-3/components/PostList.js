import React, { Component } from 'react'
import PostCard from './PostCard'
import styles from './PostList.module.css'
import { Link } from 'react-router-dom'
import Animate from '../../Animate'

const noData = () => {
   return (
      <div>
         <h2>No posts available</h2>
      </div>
   )
}

class PostList extends Component {
   render() {
      return (
         <Animate>
            <h3 className={styles.title}>All posts</h3>
            {this.props.posts.length > 0 ? (
               <div className={styles.posts}>
                  {this.props.posts.reverse().map((post) => {
                     return (
                        <Link
                           to={`/task-3/${post.id}`}
                           className={styles.link}
                           key={post.id}
                        >
                           <PostCard data={post} key={post.id}></PostCard>
                        </Link>
                     )
                  })}
               </div>
            ) : (
               noData()
            )}
         </Animate>
      )
   }
}

export default PostList
