```js title="paragraph-update.tsx"
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IParagraph } from 'app/shared/model/paragraph.model';
import { getEntity, updateEntity, createEntity, reset } from './paragraph.reducer';
import EditorComponent from 'app/component/EditorComponent';

export const ParagraphUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;
  const [content, setContent] = useState({});

  const users = useAppSelector(state => state.userManagement.users);
  const paragraphEntity = useAppSelector(state => state.paragraph.entity);
  const loading = useAppSelector(state => state.paragraph.loading);
  const updating = useAppSelector(state => state.paragraph.updating);
  const updateSuccess = useAppSelector(state => state.paragraph.updateSuccess);
  const [isContentLoaded, setIsContentLoaded] = useState(false);

  const handleClose = () => {
    navigate('/paragraph');
  };

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

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getUsers({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  // eslint-disable-next-line complexity
  const saveEntity = values => {
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }
    values.modifiedAt = convertDateTimeToServer(values.modifiedAt);
    const entity = {
      ...paragraphEntity,
      ...values,
      content: JSON.stringify(content),
      user: users.find(it => it.id.toString() === values.user?.toString()),
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
          modifiedAt: displayDefaultDateTime(),
        }
      : {
          ...paragraphEntity,
          modifiedAt: convertDateTimeFromServer(paragraphEntity.modifiedAt),
          user: paragraphEntity?.user?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="seaportApp.paragraph.home.createOrEditLabel" data-cy="ParagraphCreateUpdateHeading">
            <Translate contentKey="seaportApp.paragraph.home.createOrEditLabel">Create or edit a Paragraph</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
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
              {isContentLoaded && <EditorComponent data={content} onChange={setContent} />}
              <ValidatedField
                label={translate('seaportApp.paragraph.modifiedAt')}
                id="paragraph-modifiedAt"
                name="modifiedAt"
                data-cy="modifiedAt"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField id="paragraph-user" name="user" data-cy="user" label={translate('seaportApp.paragraph.user')} type="select">
                <option value="" key="0" />
                {users
                  ? users.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/paragraph" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
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

export default ParagraphUpdate;
```