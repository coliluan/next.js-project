import { create } from "zustand";
import { createJSONStorage, persist } from 'zustand/middleware';

interface TaskStore {
  addTask: () => void;
  setTask: (task: string) => void;
  task: string;
  tasks: string[];
  deleteTask: (index: number) => void;
  editTask: (index: number, newTaskName: string) => void;
}

const useTaskStore = create<TaskStore>()(
persist(
    (set) => ({
      task: "",
      tasks: [],
      setTask: (task) => set({ task }),
      addTask: () =>
        set((state) => {
          if (state.task) {    
            return {
              tasks: [...state.tasks, state.task],
              task: "", 
            };
          }
          return state; 
        }),
        deleteTask: (index) =>
        set((state) => {
        const updatedTasks = state.tasks.filter((_, i) => i !== index);
        return {
          tasks: updatedTasks,
        };
      }),
      editTask: (index, newTaskName) =>
        set((state) => {
          const updatedTasks = state.tasks.map((task, i) =>
            i === index ? newTaskName : task
          );
          return {
            tasks: updatedTasks,
          };
        }),
    }),
     {
      name: 'task-storage',
      storage: createJSONStorage(() => localStorage),
    }
));

export default useTaskStore;