import React, { Component } from 'react'
import withRouter from '../../withRouter'
import styles from './Post.module.css'
import LoadingSpinner from './LoadingSpinner'

class Post extends Component {
   state = {
      post: {},
      loading: true,
   }

   async componentDidMount() {
      try {
         const response = await fetch(
            'https://jsonblob.com/api/930078800407183360'
         )
         const posts = await response.json()

         const post = posts.filter(
            (post) => post.id === this.props.params.id
         )[0]

         this.setState({ post: post, loading: false })
      } catch (err) {
         console.log(err)
      }
   }

   render() {
      return this.state.loading ? (
         <LoadingSpinner />
      ) : (
         <div className={styles.post}>
            <div className={styles.banner}>
               <img src={this.state.post.src} alt='post-img' />
               <p className={styles.author}>{this.state.post.author}</p>
            </div>
            <div className={styles.text}>
               <h3 className={styles.title}>{this.state.post.title}</h3>
               <p className={styles.content}>{this.state.post.content}</p>
            </div>
         </div>
      )
   }
}

export default withRouter(Post)
