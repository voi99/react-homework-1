import React, { Component } from "react";
import withRouter from '../../withRouter'
import styles from "./AddPost.module.css";
//import TextField from '@mui/material/TextField';

class Addpost extends Component {
  state = {
    src: "",
    title: "",
    author: "",
    content: ""
  };

  async fetchLatestPosts() {
    const response = await fetch("https://jsonblob.com/api/930078800407183360");
    const posts = await response.json();
    return posts;
  }

  inputHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitForm = async (e) => {
    e.preventDefault();
    const latestPosts = await this.fetchLatestPosts();
    let newPost;
    try {
      let latestId = latestPosts[latestPosts.length - 1].id;
      newPost = {
        id: `${++latestId}`,
        ...this.state
      };
    } catch {
      newPost = {
        id: "1",
        ...this.state
      };
    }
    const dataToPut = [...latestPosts, { ...newPost }];

    fetch("https://jsonblob.com/api/930078800407183360", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dataToPut)
    });

   
    this.props.navigate("/task-3");
  };

  render() {
    return (
      <div>
        <h2>Add Post</h2>
        <form onSubmit={this.submitForm} className={styles.form}>
        <label htmlFor="src">Enter Image URL</label>
          <input
            type="text"
            name="src"
            placeholder="Type URL here.."
            className="src"
            id="src"
            onChange={this.inputHandler}
            required
          />
          <label htmlFor="title">Enter Title</label>
          <input
            type="text"
            name="title"
            placeholder="Type a title here.. (max 20 char.)"
            className="title"
            id="title"
            onChange={this.inputHandler}
            required
            maxlength="20"
          />
          <label htmlFor="author">Enter Author</label>
          <input
            type="text"
            name="author"
            placeholder="E.g. John Doe (max 20 char.)"
            className="author"
            id="author"
            onChange={this.inputHandler}
            required
            maxlength="20"
          />
          <label htmlFor="content">Enter Content</label>
          <textarea
            name="content"
            id="content"
            cols="30"
            rows="10"
            onChange={this.inputHandler}
            placeholder="Write your content here... (max 250 char.)"
            maxlength="250"
            required
          ></textarea>
          <button className={styles.button}>Add</button>
        </form>
      </div>
    );
  }
}

export default withRouter(Addpost)
