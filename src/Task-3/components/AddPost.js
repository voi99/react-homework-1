import React, { Component } from 'react'
import withRouter from '../../withRouter'
import styles from './AddPost.module.css'
import Animate from '../../Animate'

class Addpost extends Component {
   state = {
      title: '',
      src: '',
      author: '',
      content: '',
      sendingRequest: false,
      error: false,
   }

   async fetchLatestPosts() {
      const response = await fetch(
         'https://jsonblob.com/api/931892711712374784'
      )
      const posts = await response.json()
      return posts
   }

   inputHandler = (e) => {
      this.setState({ [e.target.name]: e.target.value })
   }

   submitForm = async (e) => {
      e.preventDefault()
      this.setState({ sendingRequest: true })
      const latestPosts = await this.fetchLatestPosts()
      let newPost
      const cloneState = Object.assign(
         {},
         {
            title: this.state.title,
            src: this.state.src,
            author: this.state.author,
            content: this.state.content,
         }
      )

      try {
         let latestId = latestPosts[latestPosts.length - 1].id
         newPost = {
            id: `${++latestId}`,
            ...cloneState,
         }
      } catch {
         newPost = {
            id: '1',
            ...cloneState,
         }
      }
      const dataToPut = [...latestPosts, { ...newPost }]

      fetch('https://jsonblob.com/api/931892711712374784', {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(dataToPut),
      })
         .then((res) => {
            this.setState({ sendingRequest: false })
            if (res.ok) {
               this.props.update()
               this.props.navigate('/task-3')
            } else {
               this.setState({ error: true })
            }
         })
         .catch(() => {
            this.setState({ error: true })
         })
   }

   render() {
      return (
         <Animate>
            <h2>Add Post</h2>
            <form onSubmit={this.submitForm} className={styles.form}>
               <label htmlFor='title'>Enter Title</label>
               <input
                  type='text'
                  name='title'
                  className='title'
                  id='title'
                  onChange={this.inputHandler}
                  maxLength={20}
                  required
               />
               <label htmlFor='src'>Enter Image Source</label>
               <input
                  type='text'
                  name='src'
                  className='src'
                  id='src'
                  onChange={this.inputHandler}
                  required
               />
               <label htmlFor='author'>Enter Author</label>
               <input
                  type='text'
                  name='author'
                  className='author'
                  id='author'
                  onChange={this.inputHandler}
                  maxLength={20}
                  required
               />
               <label htmlFor='content'>Enter Content</label>
               <textarea
                  name='content'
                  id='content'
                  cols='30'
                  rows='10'
                  onChange={this.inputHandler}
                  maxLength={500}
                  required
               ></textarea>
               {this.state.sendingRequest ? (
                  <span className={styles.sending}>Adding Post...</span>
               ) : this.state.error ? (
                  <span className={styles.error}>Error! Try again later!</span>
               ) : (
                  <button className={styles.button}>Add</button>
               )}
            </form>
         </Animate>
      )
   }
}

export default withRouter(Addpost)
