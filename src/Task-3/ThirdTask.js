import React, { Component } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Header from './components/Header'
import AddPost from './components/AddPost'
import PostList from './components/PostList'
import Post from './components/Post'
import "./styles.css";

class ThirdTask extends Component {
   state = {
      postList: [],
   }

   async componentDidMount() {
      try {
         const response = await fetch(
            'https://jsonblob.com/api/930078800407183360'
         )
         const posts = await response.json()

         this.setState({ postList: posts })
      } catch (err) {
         console.log(err)
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
                  element={<PostList posts={this.state.postList} />}
               />
               <Route path='add-post' element={<AddPost />}></Route>
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
