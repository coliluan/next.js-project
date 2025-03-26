import { styled } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Image from 'next/image';
import { toast } from "sonner";

const Wrapper = styled('div')`
.images{
  display: flex;
  justify-content: space-between;
  padding: 24px 24px 8px 24px;
}
  .title{
    color:rgba(16, 24, 40, 1);
    font-size:18px;
    font-weight:500;
    margin: 0;
    padding: 16px 0 0;
  }

  .MuiDialogTitle-root{
    padding: 8px 24px;
  }
  
  .text{
    font-size:14px;
    max-width: 352px;
    font-weight: 400;
    color: rgba(102, 112, 133, 1);
    padding: 0 24px 24px;
  }
`
const CustomWrapper = styled('div') `
  width:100%;
  display:flex;
  justify-content: center;
  gap:8px;
  border:none;
  background-color:transparent;
  margin: 0 16px 16px;
  padding:0;

    .submit-button{
      background-color:rgba(217, 45, 32, 1);
      color: white;
      width: 50%;
      height: 44px;
      border-radius:8px;
    }
`

interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteDialog({ open, onClose, onConfirm }: DeleteDialogProps) {

  return (
      <Dialog open={open} onClose={onClose}>
      
      <Wrapper>
      <div className="images">
        <Image src="delete.svg" alt="delete" height={44} width={44} />
        <Image onClick={onClose} src="close.svg" height={36} width={36}  alt="close" />
      </div>
       <DialogTitle className="title">Delete Task</DialogTitle>
       <DialogContent className="text">
        Are you sure that you want to delete this task. This action can’t be undone.
      </DialogContent>
      </Wrapper>
      <DialogActions>
        <CustomWrapper>
        <Button className='edit-button' onClick={onClose}>Cancel</Button>
        <Button className='submit-button' onClick={() => { 
            onConfirm(); 
            toast.success('Task deleted successfully!');    
            } }>Delete</Button>
        </CustomWrapper>
      </DialogActions>
    </Dialog>    
  );
}
