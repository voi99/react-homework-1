import React, { Component } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Header from './components/Header'
import AddPost from './components/AddPost'
import PostList from './components/PostList'
import Post from './components/Post'
import LoadingSpinner from './components/LoadingSpinner'
import { Helmet } from 'react-helmet-async'
import { AnimatePresence } from 'framer-motion'
import withRouter from '../withRouter'

class ThirdTask extends Component {
   constructor() {
      super()
      this.state = {
         postList: [],
         update: false,
         loading: true,
      }
   }

   interval = null

   updatePosts = () => {
      console.log('uslo')
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
      const intervalId = setInterval(() => {
         this.updatePosts()
      }, 10000)

      this.interval = intervalId
   }

   async componentDidUpdate(prevProps, prevState) {
      if (prevState.update !== this.state.update) {
         await this.fetchPosts()
      }
   }

   componentWillUnmount() {
      clearInterval(this.interval)
   }

   render() {
      return (
         <main>
            <Helmet>
               <title>Task-3</title>
            </Helmet>
            <Header />
            <AnimatePresence exitBeforeEnter>
               <Routes
                  location={this.props.location}
                  key={this.props.location.key}
               >
                  {/* <Route path='/' element={<Navigate to='posts' />} /> */}
                  <Route
                     path='/'
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
            </AnimatePresence>
         </main>
      )
   }
}

export default withRouter(ThirdTask)
