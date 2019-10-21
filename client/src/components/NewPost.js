import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import axios from 'axios';

// The editor core
import { createEmptyState } from '@react-page/core';

const NewPost = props => {
  const [formData, setFormData] = useState({
    postLoaded: false,
    _id: null,
    title: 'New post',
    content: createEmptyState(),
    author: ''
  });

  useEffect(() => {
    console.log('Entered Post new Post');
    const createPost = async () => {
      try {
        console.log('Api request to a new post');
        const config = {
          headers: {
            'Content-type': 'application/json'
          }
        };
        const body = JSON.stringify(formData);

        const res = await axios.post(`/api/posts/`, body, config);
        console.log('Created new Post');
        console.log(res.data);
        setFormData({ ...formData, _id: res.data._id, postLoaded: true });
      } catch (error) {
        console.error(error);
      }
    };
    createPost();
  }, []);

  return (
    <div>
      {formData.postLoaded ? <Redirect to={'posts/' + formData._id} /> : null};
    </div>
  );
};

export default NewPost;
