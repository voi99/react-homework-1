import React, { Component } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Header from './components/Header'
import AddPost from './components/AddPost'
import PostList from './components/PostList'
import Post from './components/Post'
import LoadingSpinner from './components/LoadingSpinner'

class ThirdTask extends Component {
   constructor() {
      super()
      this.state = {
         postList: [],
         update: false,
         loading: true,
      }
   }

   updatePosts = () => {
      this.setState((prevState) => ({ update: !prevState.update }))
   }

   fetchPosts = async () => {
      try {
         const response = await fetch(
            'https://jsonblob.com/api/931892711712374784'
         )
         const posts = await response.json()

         this.setState({ postList: posts, loading: false })
      } catch (err) {
         console.log(err)
      }
   }

   async componentDidMount() {
      await this.fetchPosts()
   }

   async componentDidUpdate(prevProps, prevState) {
      if (prevState.update !== this.state.update) {
         await this.fetchPosts()
      }
   }

   render() {
      return (
         <main>
            <Header />
            <Routes>
               <Route path='/' element={<Navigate to='/task-3/posts' />} />
               <Route
                  path='posts'
                  element={
                     this.state.loading ? (
                        <LoadingSpinner />
                     ) : (
                        <PostList posts={this.state.postList} />
                     )
                  }
               />
               <Route
                  path='add-post'
                  element={<AddPost update={this.updatePosts} />}
               ></Route>
               <Route
                  path=':id'
                  element={<Post posts={this.state.postList} />}
               ></Route>
            </Routes>
         </main>
      )
   }
}

export default ThirdTask
