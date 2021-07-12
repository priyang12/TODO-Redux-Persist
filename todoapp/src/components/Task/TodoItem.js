import React, { Fragment } from 'react';
import { Card, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { DeleteTasks, EditTask } from '../../Actions/TaskAction';

const TodoItem = ({ Task, index }) => {
  const dispatch = useDispatch();
  const MarkDoneTask = (e) => {
    e.preventDefault();
    dispatch(EditTask(Task.id, { Status: true }, index));
  };
  const DeleteTask = (e) => {
    e.preventDefault();

    dispatch(DeleteTasks(Task._id));
  };
  const randomINT = Math.floor(Math.random() * 4) + 1;
  const BgrandomINT = Math.floor(Math.random() * 5) + 1;
  return (
    <Fragment>
      <Card
        className={`my-3 p-3  card-${randomINT ? randomINT : 1} bg-${
          BgrandomINT ? BgrandomINT : 1
        }`}
      >
        <Card.Header>
          <small>{Task.Title}</small>
        </Card.Header>
        <Card.Body className='pb-0'>
          <Card.Text
            as='h4'
            className='font-weight-bold d-flex align-items-center'
          >
            Deadline: {Task.Deadline}
            <DropdownButton
              id='dropdown-variants-Warning'
              title=''
              className='ml-auto'
            >
              <Dropdown.Item>
                <Button className='w-100' onClick={MarkDoneTask}>
                  Mark Done
                </Button>
              </Dropdown.Item>

              <Dropdown.Item>
                <Button className='w-100' onClick={DeleteTask}>
                  Delete
                </Button>
              </Dropdown.Item>
            </DropdownButton>
          </Card.Text>
          <Card.Text as='p'>{Task.TaskDescription}</Card.Text>
          <Card.Footer className={`impotance-${Task.importance}`}>
            <Card.Text as='h4'>{Task.importance}</Card.Text>
          </Card.Footer>
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default TodoItem;
