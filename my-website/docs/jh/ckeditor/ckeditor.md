```js title="readonly"
import React, { useEffect, useState } from 'react';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './ParagraphTable.css';

const ParagraphTable = ({ paragraphList, openFile, loading, postId }) => {
  const [contentMap, setContentMap] = useState({});

  useEffect(() => {
    if (paragraphList && paragraphList.length > 0) {
      const initialContentMap = {};
      paragraphList.forEach(paragraph => {
        if (paragraph.content) {
          initialContentMap[paragraph.id] = paragraph.content; // Use content directly
        }
      });
      setContentMap(initialContentMap);
    }
  }, [paragraphList]);

  return (
    <div className="ParagraphTable">
      {paragraphList && paragraphList.length > 0
        ? paragraphList.map(paragraph => (
            <div key={`entity-${paragraph.id}`} className="paragraph-container">
              {paragraph.image && paragraph.imageContentType && (
                <div className="image-container">
                  <a
                    onClick={openFile(
                      paragraph.imageContentType,
                      paragraph.image,
                    )}
                  >
                    <img
                      src={`data:${paragraph.imageContentType};base64,${paragraph.image}`}
                      alt={paragraph.caption}
                      className="centered-image"
                    />
                  </a>
                </div>
              )}
              <div className="caption-container">{paragraph.caption}</div>

              <div id={`editorjs-${paragraph.id}`} className="editor-container">
                {contentMap[paragraph.id] && (
                  <CKEditor
                    editor={ClassicEditor}
                    data={contentMap[paragraph.id]} // Directly use content without parsing
                    config={{
                      toolbar: [], // Hide toolbar for read-only mode
                    }}
                    onReady={editor => {
                      // Code runs when editor is ready
                      editor.enableReadOnlyMode('read-only-mode');
                    }}
                  />
                )}
              </div>

              <div className="btn-group flex-btn-group-container">
                <Button
                  tag={Link}
                  to={`/paragrapheditupdatepage/${paragraph.id}?postId=${postId}`}
                  color="primary"
                  size="sm"
                  data-cy="entityEditButton"
                >
                  <FontAwesomeIcon icon="pencil-alt" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.edit">Edit</Translate>
                  </span>
                </Button>
                <Button
                  onClick={() =>
                    (window.location.href = `/paragraph/${paragraph.id}/delete`)
                  }
                  color="danger"
                  size="sm"
                  data-cy="entityDeleteButton"
                >
                  <FontAwesomeIcon icon="trash" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.delete">
                      Delete
                    </Translate>
                  </span>
                </Button>
              </div>
            </div>
          ))
        : !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="seaportApp.paragraph.home.notFound">
                No Paragraphs found
              </Translate>
            </div>
          )}
    </div>
  );
};

export default ParagraphTable;
```

```js title="edit"
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import {
  isNumber,
  Translate,
  translate,
  ValidatedField,
  ValidatedForm,
  ValidatedBlobField,
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  convertDateTimeFromServer,
  convertDateTimeToServer,
  displayDefaultDateTime,
} from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IPost } from 'app/shared/model/post.model';
import {
  getEntity as getPost,
  getEntities as getPosts,
} from 'app/entities/post/post.reducer';
import { IParagraph } from 'app/shared/model/paragraph.model';
import {
  reset,
  getEntity,
  updateEntity,
  createEntity,
} from 'app/entities/paragraph/paragraph.reducer';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export const ParagraphEditUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined || id === 'new';

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const postId = searchParams.get('postId');
  const posts = useAppSelector(state => state.post.entities);
  const postEntity = useAppSelector(state => state.post.entity);
  const paragraphEntity = useAppSelector(state => state.paragraph.entity);
  const loading = useAppSelector(state => state.paragraph.loading);
  const updating = useAppSelector(state => state.paragraph.updating);
  const updateSuccess = useAppSelector(state => state.paragraph.updateSuccess);
  const handleClose = () => {
    navigate(`/paragrapheditpage/${postId}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    console.log('Paragraph ID:', id);
    console.log('Post ID:', postId);
    // dispatch(getPosts({}));
    dispatch(getPost(postId));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const [content, setContent] = useState('');
  const [isContentLoaded, setIsContentLoaded] = useState(false);

  useEffect(() => {
    if (!isNew && paragraphEntity.content) {
      setContent(paragraphEntity.content);
      setIsContentLoaded(true);
    } else if (isNew) {
      setIsContentLoaded(true); // Đối với các thực thể mới, không cần tải nội dung hiện có
    }
  }, [paragraphEntity.content, isNew]);

  const saveEntity = values => {
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }
    values.createdAt = convertDateTimeToServer(values.createdAt);
    values.updatedAt = convertDateTimeToServer(values.updatedAt);

    const entity = {
      ...paragraphEntity,
      ...values,
      content,
      paragraph: postEntity,
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      : {
          ...paragraphEntity,
          createdAt: convertDateTimeFromServer(paragraphEntity.createdAt),
          updatedAt: convertDateTimeFromServer(paragraphEntity.updatedAt),
          paragraph: paragraphEntity?.paragraph?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2
            id="seaportApp.paragraph.home.createOrEditLabel"
            data-cy="ParagraphCreateUpdateHeading"
          >
            <Translate contentKey="seaportApp.paragraph.home.createOrEditLabel">
              Create or edit a Paragraph
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm
              defaultValues={defaultValues()}
              onSubmit={saveEntity}
            >
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="paragraph-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedBlobField
                label={translate('seaportApp.paragraph.image')}
                id="paragraph-image"
                name="image"
                data-cy="image"
                isImage
                accept="image/*"
              />
              <ValidatedField
                label={translate('seaportApp.paragraph.caption')}
                id="paragraph-caption"
                name="caption"
                data-cy="caption"
                type="text"
              />
              {isContentLoaded && (
                <CKEditor
                  editor={ClassicEditor}
                  data={content}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setContent(data);
                  }}
                />
              )}
              <Button
                color="primary"
                id="save-entity"
                data-cy="entityCreateSaveButton"
                type="submit"
                disabled={updating}
              >
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ParagraphEditUpdate;
```