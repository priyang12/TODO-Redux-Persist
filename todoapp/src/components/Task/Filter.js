import React, { Fragment, useRef } from 'react';
import { Button, Form, Col } from 'react-bootstrap';
import { FilterTasks } from '../../Actions/TaskAction';
import { useDispatch } from 'react-redux';
import { useForm } from '../../Utilis/form';

const Filter = () => {
  const dispatch = useDispatch();
  const [Filter, setFilter] = useForm({
    serach: '',
    sort: '',
    deadline: '',
  });
  const { serach, sort } = Filter;
  const searchref = useRef(null);
  const filtersubmit = (e) => {
    e.preventDefault();
    dispatch(FilterTasks(Filter.serach, Filter.sort));
  };
  return (
    <Fragment>
      <h1>Filter Task</h1>
      <Col>
        <Form onSubmit={filtersubmit}>
          <Form.Group>
            <Form.Control
              type='text'
              placeholder='Search by Task'
              name='serach'
              onChange={setFilter}
              value={serach}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              as='select'
              onChange={setFilter}
              name='sort'
              value={sort}
            >
              <option>Select Importance</option>
              <option value='1'>Red</option>
              <option value='-1'>Green</option>
            </Form.Control>
          </Form.Group>
          <Button variant='primary' type='submit' ref={searchref}>
            Filter
          </Button>
        </Form>
      </Col>
    </Fragment>
  );
};

export default Filter;
