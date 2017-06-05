import React, { Component } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import PostsContainer from "./PostsContainer";
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
      posts:  []
    };
  }

  componentDidMount(){
    fetch(API_URL + '/posts', {headers: API_HEADRES})
      .then( (response) => response.json() )
      .then( (responseData) => {
        this.setState({
          posts: responseData
        });
      } )
      .catch( (err) => console.error(err) );
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <Header title={TITLE} logoSrc={LOGO_SRC} />
        </div>
        <div className="row">
          <PostsContainer posts={this.state.posts}/>
        </div>
        <div className="row">
          <Footer/>
        </div>
      </div>
    );
  }
}

export default Page;
