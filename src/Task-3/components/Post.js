import React, { Component } from 'react'
import withRouter from '../../withRouter'
import styles from "./Post.module.css";

class Post extends Component {
   state = {
      post: {},
   }

   componentDidMount() {
      const post = this.props.posts.filter(
         (post) => post.id === this.props.params.id
      )[0]

      this.setState({ post: post })
   }

   render() {
      return (
         <div className={styles['onePost']}>
            <div className={styles['card-footer']}>
               <span className={styles['post-title']}>{this.state.post.title}</span>
               <span className={styles['post-author']}>{this.state.post.author}</span>
            </div>
            <div className={styles['post-img center']}><img alt='post-img' src={this.state.post.src}/></div>
            <p className={styles['post-content']}>{this.state.post.content}</p>
         </div>
      )
   }
}

export default withRouter(Post)

