```
yarn add @editorjs/editorjs @editorjs/header @editorjs/list @editorjs/image
```


```js title="EditorComponent.tsx"
import React, { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import ImageTool from '@editorjs/image';


const EditorComponent = ({ data, onChange,readOnly }) => {
  const editorInstance = useRef(null);

  useEffect(() => {
    if (!editorInstance.current) {
      editorInstance.current = new EditorJS({
        holder: 'editorjs',
        tools: {
          header: Header,
          list: List,
          image: {
            class: ImageTool,
            config: {
              endpoints: {
                byFile: '/api/images/uploadFile', // Your backend file upload endpoint
                byUrl: '/api/images/fetchUrl', // Your endpoint that provides image by URL
              },
            },
          },
        },
        data,
        readOnly,
        onReady: () => {
          console.log('Editor.js is ready to work!');
        },
        onChange: async () => {
          const content = await editorInstance.current.save();
          onChange(content);
        },
      });
    } else {
      editorInstance.current.render(data);
    }

    return () => {
      if (editorInstance.current && editorInstance.current.isReady) {
        editorInstance.current.isReady
          .then(() => {
            editorInstance.current.destroy();
            editorInstance.current = null;
          })
          .catch(error => console.error('Error destroying Editor.js instance:', error));
      }
    };
  }, []);

  return <div id="editorjs" />;
};

export default EditorComponent;
```