import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

import axios from 'axios';

// The editor core
import Editor, { Editable, createEmptyState } from '@react-page/core';
import '@react-page/core/lib/index.css'; // we also want to load the stylesheets

// Require our ui components (optional). You can implement and use your own ui too!
import EditorUI from '@react-page/ui';
import '@react-page/ui/lib/index.css';

import image from '@react-page/plugins-image';
import '@react-page/plugins-image/lib/index.css';

// Load some exemplary plugins:
import slate from '@react-page/plugins-slate'; // The rich text area plugin
import '@react-page/plugins-slate/lib/index.css'; // Stylesheets for the rich text area plugin

import '../sass/react-page.css';

const ReactPageContainer = props => {
  const [formData, setFormData] = useState({
    title: 'Test title',
    content: createEmptyState(),
    author: 'Rustam'
  });

  const { content } = formData;
  // Define which plugins we want to use. We only have slate and parallax available, so load those.
  const plugins = {
    content: [slate(), image] // Define plugins for content cells. To import multiple plugins, use [slate(), image, spacer, divider]
  };

  // Creates an empty editable
  // Instantiate the editor
  const editor = new Editor({
    plugins,
    // pass the content state - you can add multiple editables here
    editables: [formData.content]
  });

  const onContentChange = content => {
    setFormData({ ...formData, content });
  };

  const onSaveButtonClick = async () => {
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    };
    const body = JSON.stringify(formData);

    try {
      console.log('Saving post to the database.');
      const res = await axios.post('/api/posts', body, config);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='editorCon tainer React-Page'>
      {/* Content area */}
      <Editable
        editor={editor}
        id={content.id}
        onChange={state => onContentChange(state)}
      />

      {/*  Default user interface  */}
      <EditorUI editor={editor} />
      <Button onClick={() => onSaveButtonClick()}>Save</Button>
    </div>
  );
};

export default ReactPageContainer;
