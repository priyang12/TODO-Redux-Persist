import React, { Fragment, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import { AddTasks } from '../../Actions/TaskAction';
import { useDispatch } from 'react-redux';
import { useForm } from '../../Utilis/form';
const AddTask = () => {
  const taskbtn = useRef(null);
  const dispatch = useDispatch();
  const [NewTask, setTask, reset] = useForm({
    Title: '',
    Deadline: '',
    Imporantancy: '',
    TaskDescription: '',
    status: false,
  });
  const { Title, Deadline, Imporantancy, TaskDescription } = NewTask;
  const onsubmit = (e) => {
    e.preventDefault();
    if (
      NewTask?.Title === '' ||
      NewTask?.Deadline === '' ||
      NewTask?.Imporantancy === '' ||
      NewTask?.TaskDescription === ''
    ) {
      console.log('notvalid');
    } else {
      taskbtn?.current.setAttribute('disabled', 'disabled');

      dispatch(AddTasks(NewTask));
      reset();
      setTimeout(() => {
        taskbtn.current?.removeAttribute('disabled');
      }, 4000);
    }
  };
  return (
    <Fragment>
      <h1 className='font-weight-bold text-center'>ADD TASK</h1>
      <Form onSubmit={onsubmit}>
        <Form.Group>
          <Form.Control
            type='text'
            placeholder='Title Task'
            name='Title'
            onChange={setTask}
            value={Title}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>DeadLine</Form.Label>
          <Form.Control
            as='input'
            type='date'
            name='Deadline'
            onChange={setTask}
            value={Deadline}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            as='select'
            onChange={setTask}
            name='Imporantancy'
            value={Imporantancy}
          >
            <option>Select Importance</option>
            <option value='1'>Red</option>
            <option value='2'>Yellow</option>
            <option value='3'>Green</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Control
            as='textarea'
            type='task'
            placeholder='Task'
            rows={5}
            name='TaskDescription'
            onChange={setTask}
            value={TaskDescription}
          />
        </Form.Group>
        <Button variant='primary' type='submit' className='w-100' ref={taskbtn}>
          Submit Task
        </Button>
      </Form>
    </Fragment>
  );
};

export default AddTask;
