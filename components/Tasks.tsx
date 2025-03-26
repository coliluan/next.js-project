"use client"
import useTaskStore from "@/app/store/TaskStore";
import { styled } from "@mui/material";
import Image from 'next/image';
import React from "react";
import AddTask from "./AddTask";
import DeleteDialog from "./DeleteTask";
import EditDialog from "./EditTask";

const Header = styled('h1')`
  text-align:center;
  font-size: 44px;
  font-weight:500;
  color:rgba(65, 70, 81, 1);
`
const Wrapper = styled('div')`
  border:1px solid #E9EAEB;
  border-radius:16px;
  width:100%;
  max-width:638px;
  min-height:768px;
  margin: auto;
  padding:32px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  @media screen and (max-width: 767px)  {
    padding: 32px 12px;
    margin: 0 12px;
  }
  h3{
    font-weight: 400;
    font-size:16px;
    margin:0;
    padding: 0 32px;
  }
  .list{
    display: flex;
    flex-direction: column;
    align-items: center;
    @media screen and (max-width: 767px)  {
    margin: 0 12px;
  }
    .task-list{
      border: 1px solid #D5D7DA;
      border-radius:12px;
      height:42.5px;
      padding:0 12px;
      max-width:548px;
      width:100%;
      display: flex;
      justify-content:space-between;
      align-items: center;
      margin-bottom:12px;
      .tasks{
        display:flex;
        gap:8px;
        align-items:center;
      }
      .button {

        .tasks-button{
          border:none;
          background-color:transparent;
          cursor:pointer;
        }
      }
    }
  }
  `
export default function Tasks() {

  const { tasks } = useTaskStore();

  const [selectedTaskIndex, setSelectedTaskIndex] = React.useState<number | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);

  const handleClickOpen = (index: number, dialogType: 'edit' | 'delete') => {
  setSelectedTaskIndex(index);
  if (dialogType === 'edit') {
    setOpenEditDialog(true);
  } else if (dialogType === 'delete') {
    setOpenDeleteDialog(true);
  }
};

const handleClose = () => {
    setOpenDeleteDialog(false);
    setOpenEditDialog(false);
  };

   const handleUpdateTask = (index: number, newTaskName: string) => {
    useTaskStore.getState().editTask(index, newTaskName);
};

    const handleConfirmDelete = () => {
  if (selectedTaskIndex !== null) {
    useTaskStore.getState().deleteTask(selectedTaskIndex);
    handleClose();
  }
};

 return (
    <div>
      <Header>To do list</Header>
      <Wrapper>
        <AddTask />
         <h3>Task list:</h3>
        <div className='list'>
          {tasks.map((u, index) => (
            <div className='task-list' key={index}>
              <div className='tasks' >
                <Image src='/checkmark.svg' alt="checkmark" height={20} width={20}/>
              {u}
              </div>
              <div className='button'>
                <button onClick={() => handleClickOpen(index, 'edit')}  className='tasks-button'>
                 <Image src='edit-icon.svg' alt="edit" height={20} width={20}/>
               </button>
               <button onClick={() => handleClickOpen(index, 'delete')}  className='tasks-button' 
                >
                  <Image src='/delete-icon.svg' alt="delete" height={20} width={20}/>
                </button>
              </div>
              </div>
          ))}
        </div>
        <DeleteDialog
          open={openDeleteDialog}
          onClose={handleClose}
          onConfirm={handleConfirmDelete}
        />
        <EditDialog
          open={openEditDialog}
          taskName={selectedTaskIndex !== null ? tasks[selectedTaskIndex] : ""}
          taskIndex={selectedTaskIndex !== null ? selectedTaskIndex : -1}
          onClose={handleClose}
          onSave={(newTaskName) => {
            if (newTaskName.trim() === "") {
              return;
            }
            if (selectedTaskIndex !== null) {         
              handleUpdateTask(selectedTaskIndex, newTaskName);
              handleClose();
            }
          }}
          />
      </Wrapper>
    </div>
  )
}
