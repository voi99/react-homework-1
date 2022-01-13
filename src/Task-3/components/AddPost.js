import React, { Component } from 'react'
import withRouter from '../../withRouter'
import styles from './AddPost.module.css'

class Addpost extends Component {
   state = {
      title: '',
      src: '',
      author: '',
      content: '',
   }

   async fetchLatestPosts() {
      const response = await fetch(
         'https://jsonblob.com/api/930078800407183360'
      )
      const posts = await response.json()
      return posts
   }

   inputHandler = (e) => {
      this.setState({ [e.target.name]: e.target.value })
   }

   submitForm = async (e) => {
      e.preventDefault()
      const latestPosts = await this.fetchLatestPosts()
      let newPost
      try {
         let latestId = latestPosts[latestPosts.length - 1].id
         newPost = {
            id: `${++latestId}`,
            ...this.state,
         }
      } catch {
         newPost = {
            id: '1',
            ...this.state,
         }
      }
      const dataToPut = [...latestPosts, { ...newPost }]

      fetch('https://jsonblob.com/api/930078800407183360', {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(dataToPut),
      })
      this.props.update()
      this.props.navigate('/task-3')
   }

   render() {
      return (
         <div>
            <h2>Add Post</h2>
            <form onSubmit={this.submitForm} className={styles.form}>
               <label htmlFor='title'>Enter Title</label>
               <input
                  type='text'
                  name='title'
                  className='title'
                  id='title'
                  onChange={this.inputHandler}
               />
               <label htmlFor='title'>Enter Image Source</label>
               <input
                  type='text'
                  name='src'
                  className='src'
                  id='src'
                  onChange={this.inputHandler}
               />
               <label htmlFor='title'>Enter Author</label>
               <input
                  type='text'
                  name='author'
                  className='author'
                  id='author'
                  onChange={this.inputHandler}
               />
               <label htmlFor='content'>Enter Content</label>
               <textarea
                  name='content'
                  id='content'
                  cols='30'
                  rows='10'
                  onChange={this.inputHandler}
               ></textarea>
               <button className={styles.button}>Add</button>
            </form>
         </div>
      )
   }
}

export default withRouter(Addpost)
