import React, { Component } from "react";
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import PostsContainer from "../PostsContainer/PostsContainer";
import "whatwg-fetch";

const TITLE = "Page management";
const LOGO_SRC = "http://via.placeholder.com/100x100";
const API_URL = "http://jsonplaceholder.typicode.com";
const API_HEADRES = {
  'Content-Type': 'application/json'
};

class Page extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      allPosts:  [],
      filteredPosts: []
    };
  }

  componentDidMount() {
    this.getAllPosts();
  }
  getAllPosts() {
    fetch(API_URL + '/posts', {headers: API_HEADRES})
      .then( (response) => response.json() )
      .then( (responseData) => {
          this.setState({
            allPosts: responseData,
            filteredPosts: responseData
          });
      } )
      .catch( (err) => console.error(err) );
  }
  searchPosts(value) {
    if(value === undefined || value.length === 0) {
      this.setState( (prevState) => {
        return {
          allPosts: prevState.allPosts,
          filteredPosts: prevState.allPosts
        };
      } );
      return ;
    }
    let allPosts = this.state.allPosts;
    let newPostArray = allPosts.filter( (post) => {
        return post.title.indexOf(value) !== -1;
    });
    this.setState((prevState) => {
      return { allPosts: prevState.allPosts, filteredPosts: newPostArray };
    });
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <Header title={TITLE} logoSrc={LOGO_SRC} />
        </div>
        <div className="row">
          <PostsContainer searchPosts={this.searchPosts.bind(this)} posts={this.state.filteredPosts}/>
        </div>
        <div className="row">
          <Footer/>
        </div>
      </div>
    );
  }
}

export default Page;
