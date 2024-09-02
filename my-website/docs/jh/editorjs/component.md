```
yarn add @editorjs/editorjs @editorjs/image @editorjs/header @editorjs/list
```


```js title="EditorComponent.tsx"
import React, { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';

const EditorComponent = ({ data, onChange }) => {
  const editorInstance = useRef(null);

  useEffect(() => {
    if (!editorInstance.current) {
      editorInstance.current = new EditorJS({
        holder: 'editorjs',
        tools: {
          header: Header,
          list: List,
        },
        data,
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