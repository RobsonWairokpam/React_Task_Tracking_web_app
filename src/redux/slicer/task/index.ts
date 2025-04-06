import { createSlice } from "@reduxjs/toolkit";
import { Task } from "../../../utils";
const saveTasks = (tasks: Task) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const loadTasks = () => {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
};
const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    items: loadTasks(),
    filter: "all",
    search: "",
  },
  reducers: {
    addTask: (state, action) => {
      console.log({ STATE____: state.items, ACTION____: action });
      state.items.push(action.payload);
      saveTasks(state.items);
    },
    updateTask: (state, action) => {
      const updatedTask: Task = action.payload;
      const index = state.items.findIndex((t: Task) => t.id === updatedTask.id);
      if (index !== -1) {
        state.items[index] = updatedTask;
        saveTasks(state.items);
      }
    },
    deleteTask: (state, action) => {
      state.items = state.items.filter((t: Task) => t.id !== action.payload);
      saveTasks(state.items);
    },
    toggleStatus: (state, action) => {
      const task = state.items.find((t: Task) => t.id === action.payload);
      if (task) task.completed = !task.completed;
      saveTasks(state.items);
    },
    updateFilter: (state, action) => {
      console.log("statusss", action.payload);
      state.filter = action.payload;
    },
    updateSearch: (state, action) => {
      state.search = action.payload;
    },
    reorderTasks: (state, action) => {
      const { sourceIndex, destinationIndex } = action.payload;
      const [removed] = state.items.splice(sourceIndex, 1);
      state.items.splice(destinationIndex, 0, removed);
      localStorage.setItem("tasks", JSON.stringify(state.items));
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  toggleStatus,
  updateFilter,
  updateSearch,
  reorderTasks
} = taskSlice.actions;
export default taskSlice.reducer;
