import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { toggleStatus, updateTask } from "../redux/slicer/task";
import { Task } from "../utils";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  Paper,
  Switch,
} from "@mui/material";
import Navbar from "./NavBar";

const UpdateTask: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  console.log("iddddd", id);

  const existingTask = useAppSelector(
    (state) => {
      console.log("state", state.task.items, "taskId", id);
      return state.task.items.find((t: Task) => t.id === id);
    }
  );
  console.log("stateeeeeeeeeee", existingTask);

  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">("Low");

  useEffect(() => {
    if (existingTask) {
      setText(existingTask.text);
      setCategory(existingTask.category);
      setPriority(existingTask.priority);
    }
  }, [existingTask]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim()) return;

    const updatedTask: Task = {
      ...existingTask!,
      text,
      category,
      priority,
    };

    dispatch(updateTask(updatedTask));
    navigate("/");
  };

  if (!existingTask) {
    return <Typography variant="h6">Task not found</Typography>;
  }

  return (
    <>
      <Navbar />
      <Box component={"div"}>
        <Paper sx={{ maxWidth: 500, margin: "auto", p: 4, mt: 4 }}>
          <Box
            component={"div"}
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Update Task
            </Typography>
            <Box component={"div"} sx={{ display: "flex" }}>
              <Typography variant="h6" sx={{ mr: 2, p: 0.5 }}>
                Status
              </Typography>
              <Switch
                checked={existingTask?.completed}
                onChange={() => dispatch(toggleStatus(id))}
                color="primary"
              />
            </Box>
          </Box>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Task"
              value={text}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setText(e.target.value)
              }
              margin="normal"
            />
            <TextField
              fullWidth
              label="Category"
              value={category}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCategory(e.target.value)
              }
              margin="normal"
            />
            <TextField
              select
              fullWidth
              label="Priority"
              value={priority}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPriority(e.target.value as "Low" | "Medium" | "High")
              }
              margin="normal"
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </TextField>
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button variant="contained" type="submit">
                Update Task
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => navigate("/")}
              >
                Cancel
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default UpdateTask;
