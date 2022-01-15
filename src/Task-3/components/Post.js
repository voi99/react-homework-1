import React, { Component } from 'react'
import withRouter from '../../withRouter'
import styles from './Post.module.css'
import LoadingSpinner from './LoadingSpinner'
import Animate from '../../Animate'

class Post extends Component {
   state = {
      post: {},
      loading: true,
   }

   async componentDidMount() {
      try {
         const response = await fetch(
            'https://jsonblob.com/api/931892711712374784'
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
         <Animate className={styles.post}>
            <div className={styles.banner}>
               <img src={this.state.post.src} alt='post-img' />
               <p className={styles.author}>{this.state.post.author}</p>
            </div>
            <div className={styles.text}>
               <h3 className={styles.title}>{this.state.post.title}</h3>
               <p className={styles.content}>{this.state.post.content}</p>
            </div>
         </Animate>
      )
   }
}

export default withRouter(Post)
