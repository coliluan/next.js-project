"use client";
import useTaskStore from '@/app/store/TaskStore';
import { Button, styled } from '@mui/material';
import TextField from '@mui/material/TextField';
import { toast } from 'sonner';

const Wrapper = styled('div')`
  
  h6{
    text-align:left;
    font-size: 16px;
    font-weight:500;
    margin: 0 32px 10px;
  }

  .input-list{
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-bottom:24px;
    .input{
      width:100%;
      max-width:500px;
    }

    .MuiInputBase-root{
      height:44px;
      border-radius:12px;
    }

    .add-button{
      background-color: #0086C9;
      max-width:62px;
      height:44px;
      border-radius:12px;
      font-size: 16px;
      color: #fff;
    }
  }
  
`
export default function AddTask() {

  const {task, setTask, addTask } = useTaskStore();  

    const HandleAddClick = () => {
    if (task.trim()) {
      addTask();
      toast.success('Task added successfully!');
    } else {
      toast.error('Empty Task!');
    }
  };


  return (
    <div>
      <Wrapper>
        <h6>Add a task here:</h6>
      <form className='input-list' >
        <TextField
        className='input'
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <Button className='add-button' onClick={HandleAddClick}>Add</Button>
      </form>
     </Wrapper>
     </div>
  );
}    
