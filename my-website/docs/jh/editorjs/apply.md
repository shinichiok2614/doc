```js title="ParagraphUpdate.tsx"
import EditorComponent from 'app/component/EditorComponent';

export const ParagraphUpdate = () => {
  const [content, setContent] = useState({});
  const [isContentLoaded, setIsContentLoaded] = useState(false);

useEffect(() => {
  if (!isNew && paragraphEntity.content) {
    try {
      const parsedContent = JSON.parse(paragraphEntity.content);
      if (parsedContent && typeof parsedContent === 'object' && parsedContent.blocks) {
        setContent(parsedContent);
        setIsContentLoaded(true);
      } else {
        console.error('Invalid content structure', parsedContent);
      }
    } catch (e) {
      console.error('Failed to parse paragraph content', e);
    }
  } else if (isNew) {
    setIsContentLoaded(true); // For new entities, no need to load existing content
  }
}, [paragraphEntity.content, isNew]);

  const saveEntity = values => {
    const entity = {
      ...paragraphEntity,
      ...values,
      content: JSON.stringify(content),
      user: users.find(it => it.id.toString() === values.user?.toString()),
    };
  };

  return (
    {isContentLoaded && <EditorComponent data={content} onChange={setContent} />}
};

export default ParagraphUpdate;
```