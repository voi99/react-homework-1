import React, { Component } from 'react'
import withRouter from '../../withRouter'

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
      return <div>{this.state.post.text}</div>
   }
}

export default withRouter(Post)
