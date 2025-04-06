import React, { useState, FormEvent, ChangeEvent } from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  InputLabel,
  FormControl,
  Stack,
} from "@mui/material";
import { useAppDispatch } from "../redux/hooks";
import { addTask } from "../redux/slicer/task";
import { Task } from "../utils";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import Navbar from "./NavBar";

const AddTask: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">("Low");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newTask: Task = {
      id: uuidv4(),
      text,
      category,
      priority,
      completed: false,
    };

    dispatch(addTask(newTask));

    setText("");
    setCategory("");
    setPriority("Low");
    navigate("/");
  };

  return (
    <>
      <Navbar />{" "}
      <Box component="form" onSubmit={handleSubmit} p={5}>
        <Stack spacing={2}>
          <TextField
            label="Task"
            variant="outlined"
            fullWidth
            value={text}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setText(e.target.value)
            }
          />

          <TextField
            label="Category"
            variant="outlined"
            fullWidth
            value={category}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCategory(e.target.value)
            }
          />

          <FormControl fullWidth>
            <InputLabel id="priority-label">Priority</InputLabel>
            <Select
              name="Priority"
              labelId="priority-label"
              value={priority}
              label="Priority"
              onChange={(e) => {
                setPriority(e.target.value as "Low" | "Medium" | "High");
              }}
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
          </FormControl>

          <Button type="submit" variant="contained" color="primary">
            Add Task
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default AddTask;
