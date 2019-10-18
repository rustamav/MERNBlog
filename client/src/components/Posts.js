import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';
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
        const res = await axios.get('/api/posts');
        res.data.map((item, key) => {
          console.log(item);
          setFormData(formData => [...formData, item]);
        });
      } catch (error) {
        console.error(error);
      }
    };

    getPosts();
  }, []);

  const onEditButtonClick = id => {
    console.log('id: ' + id);
  };
  const posts = formData.map(item => {
    return (
      <div>
        <HTMLRenderer key={item._id} state={item.content} plugins={eplugins} />
        <Link to={'posts/' + item._id}>
          <Button onClick={() => onEditButtonClick(item._id)}>Edit</Button>
        </Link>
      </div>
    );
  });
  return <div>{posts}</div>;
};

export default Posts;
