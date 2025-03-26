import useTaskStore from '@/app/store/TaskStore';
import { DialogTitle, styled, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Image from 'next/image';
import * as React from 'react';
import { toast } from 'sonner';


const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    border-radius: 12px;
    width: 100%;
    max-width: 402px;
    padding: 24px;
    .images{
      display: flex;
      justify-content:space-between;
    }
    .title{
      color:rgba(16, 24, 40, 1);
      font-size:18px;
      font-weight:500;
      padding: 16px 0 0;
    }
    .content{
      padding:15px 0;
      
      .text{
        font-size:14px;
        max-width: 352px;
        font-weight: 400;
        color: rgba(102, 112, 133, 1);
      }
    }
    .MuiInputBase-root{
      border-radius:12px;
      height: 44px;
    }
    .input{
      width: 100%;  
    }
    .buttons {
      display:flex;
      justify-content: center;
      gap:12px;
      
      .submit-button{
        width: 50%;
        background-color:rgba(0, 134, 201, 1);
        color: white;
        max-width: 195px;
        height: 44px;
        border-radius:8px;
        margin: 0;
       }
    }
  }
  .MuiDialogActions-root{
    padding: 0px;
  }
`;
interface EditDialogProps {
  open: boolean;
  taskName: string;
  taskIndex: number;  
  onClose: () => void;
  onSave: (newTaskName: string) => void;
}

export default function EditDialog({ open, taskName,taskIndex, onClose, onSave }: EditDialogProps) {
  const [newTaskName, setNewTaskName] = React.useState(taskName);
  const { editTask } = useTaskStore();

  React.useEffect(() => {
    setNewTaskName(taskName);
  }, [taskName]);

  const handleSave = () => {
    editTask(taskIndex, newTaskName);
    onSave(newTaskName);
    toast.success('Task updated successfully!');  
  };

  return (
      <StyledDialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
          <div className="images">
            <Image src="/edit.svg" alt="edit" height={44} width={44} />
            <Image onClick={onClose} src="/close.svg" alt="close" height={44} width={44} />
          </div>
        <DialogTitle className='title'>Edit task</DialogTitle>
        <DialogContent className='content'>
          <DialogContentText className='text' id="alert-dialog-description">
              Below you can change the title of the task.
          </DialogContentText>
          <DialogContent className='content'>
          <TextField
          className="input"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
        />
          </DialogContent>
        </DialogContent>
        <DialogActions className='buttons'>
            <Button  className='edit-button'onClick={onClose}>Cancel</Button>
            <Button className='submit-button' onClick={handleSave} autoFocus>Save</Button>
        </DialogActions>
      </StyledDialog>

  );
}