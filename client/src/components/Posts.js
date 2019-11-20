import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { HTMLRenderer } from '@react-page/renderer';
import { connect } from 'react-redux';
import { setAlert } from '../actions/alert';
import { getPosts } from '../actions/post';
import PropTypes from 'prop-types';
import Spinner from './Layout/Spinner';

import image from '@react-page/plugins-image';
import '@react-page/plugins-image/lib/index.css';

// Load some exemplary plugins:
import slate from '@react-page/plugins-slate'; // The rich text area plugin
import '@react-page/plugins-slate/lib/index.css'; // Stylesheets for the rich text area plugin

import '../sass/react-page.css';
const Posts = props => {
  const isAuthenticated = props.isAuthenticated;
  const posts = props.posts;
  const eplugins = {
    content: [slate(), image] // Define plugins for content cells. To import multiple plugins, use [slate(), image, spacer, divider]
  };

  useEffect(() => {
    props.getPosts();
  }, []);

  const loggedInButtons = () => <div></div>;
  const postsList = posts.map(item => {
    return (
      <div key={item._id} className={'react-page'}>
        <HTMLRenderer key={item._id} state={item.content} plugins={eplugins} />
        {isAuthenticated ? (
          <Link key={`link-${item._id}`} to={'posts/' + item._id}>
            <Button key={`button-${item._id}`}>Edit</Button>
          </Link>
        ) : null}
      </div>
    );
  });
  return props.postsLoading ? <Spinner></Spinner> : <div>{postsList}</div>;
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  postsLoading: PropTypes.bool.isRequired,
  posts: PropTypes.array.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  posts: state.post.posts,
  postsLoading: state.post.postsLoading
});

export default connect(
  mapStateToProps,
  { setAlert, getPosts }
)(Posts);
