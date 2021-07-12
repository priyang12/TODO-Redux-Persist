import React, { Fragment, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import TodoItem from './TodoItem';
import AddTask from './AddTask';
import { useDispatch, useSelector } from 'react-redux';
import { LoadTasks } from '../../Actions/TaskAction';
import Spinner from '../layout/Spinner';
import Message from '../layout/Message';
import Loader from '../layout/Spinner';

const Todo = () => {
  const dispatch = useDispatch();
  const TasksState = useSelector((state) => state.Tasks);
  const { Tasks, alert, loading } = TasksState;
  useEffect(() => {
    if (!Tasks) {
      dispatch(LoadTasks());
    }
  }, [Tasks, dispatch]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Container>
          <Row>
            <Col sm={12} md={6} lg={4} xl={4} className='my-5 px-5'>
              <AddTask />
            </Col>
            {Tasks?.length <= 0 && (
              <Col className='m-5'>
                <h1>No Tasks</h1>
              </Col>
            )}
          </Row>
          {alert && (
            <Message variant='danger' className='m-5'>
              {alert}
            </Message>
          )}
          <Row>
            {Tasks?.length > 0 &&
              Tasks.map((task, index) => (
                <Col sm={6} md={6} lg={4} xl={4} key={index}>
                  <TodoItem Task={task} index={index} />
                </Col>
              ))}
          </Row>
        </Container>
      )}
    </Fragment>
  );
};

export default Todo;
