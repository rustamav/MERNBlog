import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { HTMLRenderer } from '@react-page/renderer';

import image from '@react-page/plugins-image';
import '@react-page/plugins-image/lib/index.css';

// Load some exemplary plugins:
import slate from '@react-page/plugins-slate'; // The rich text area plugin
import '@react-page/plugins-slate/lib/index.css'; // Stylesheets for the rich text area plugin

const Posts = props => {
  const [formData, setFormData] = useState([]);

  const eplugins = {
    content: [slate(), image] // Define plugins for content cells. To import multiple plugins, use [slate(), image, spacer, divider]
  };

  useEffect(() => {
    const getPosts = async () => {
      try {
        console.log('GET list of posts.');
        const res = await axios.get('/api/posts');
        console.log(res.data);
        res.data.map((item, key) => {
          console.log('setting item');
          console.log(item);
          setFormData(formData => [...formData, item]);
        });
        console.log('Form data');
        console.log(formData);
      } catch (error) {
        console.error(error);
      }
    };

    getPosts();
  }, []);

  const posts = formData.map(item => {
    return (
      <HTMLRenderer
        key={item.content.id}
        state={item.content}
        plugins={eplugins}
      />
    );
  });
  return <div>{posts}</div>;
};

export default Posts;
