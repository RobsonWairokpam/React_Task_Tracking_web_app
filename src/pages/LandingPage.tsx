import { FC, useState } from "react";
import Navbar from "../component/NavBar";

import {
  Box,
  Button,
  MenuItem,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useSelector } from "react-redux";
import { Task } from "../utils";
import {
  deleteTask,
  reorderTasks,
  // toggleStatus,
  updateFilter,
  updateSearch,
} from "../redux/slicer/task";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";

const LandingPage: FC = () => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const { items, filter, search } = useSelector(
    (state: RootState) => state.task
  );

  // const existingTask = useAppSelector((state) => {
  //   return state.task.items;
  // });
  const dispatch = useAppDispatch();

  const filteredTasks = items.filter((task: Task) => {
    if (filter === "completed" && !task.completed) return false;
    if (filter === "active" && task.completed) return false;
    if (search && !task.text.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });
  console.log("fillerteerr", filteredTasks);

  // const [tasks, setTasks] = useState<Task[]>(items);

  // const handleDragStart = (index: number) => {
  //   setDraggedIndex(index);
  // };
  const handleDragStart = (
    index: number,
    event: React.DragEvent<HTMLTableRowElement>
  ) => {
    setDraggedIndex(index);

    const img = new Image();
    img.src =
      "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='1' height='1'></svg>";
    event.dataTransfer.setDragImage(img, 0, 0);
  };

  const handleDragOver = (e: React.DragEvent<HTMLTableRowElement>) => {
    e.preventDefault();
  };

  const handleDrop = (index: number) => {
    if (draggedIndex !== null && draggedIndex !== index) {
      dispatch(
        reorderTasks({ sourceIndex: draggedIndex, destinationIndex: index })
      );
    }
    setDraggedIndex(null);
  };

  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <Box
        component={"div"}
        sx={{
          display: "flex",
          justifyContent: "center",
          px: { xs: 2, sm: 5, md: 10 },
          py: 5,
          width: "100%",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <Button variant="contained" onClick={() => navigate("/addTask")}>
            Add Task
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <TextField
            label="Search Tasks"
            variant="outlined"
            size="small"
            value={search}
            onChange={(e) => dispatch(updateSearch(e.target.value))}
            fullWidth={true}
            sx={{ flex: 1 }}
          />
          <TextField
            select
            label="Filter"
            variant="outlined"
            size="small"
            value={filter}
            onChange={(e) => dispatch(updateFilter(e.target.value))}
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </TextField>
        </Box>

        {/* Table */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Task</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Priority</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTasks.map((task: Task, index: number) => (
                <TableRow
                  key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(index, e)}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(index)}
                  sx={{
                    cursor: "grab",
                    background: draggedIndex === index ? "#f0f0f0" : "inherit",
                    "&:hover": {
                      background: "#f9f9f9",
                    },
                  }}
                >
                  <TableCell align="center">{task.text}</TableCell>
                  <TableCell align="center">{task.category}</TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color:
                        task.priority === "Low"
                          ? "green"
                          : task.priority === "Medium"
                          ? "orange"
                          : "red",
                    }}
                  >
                    {task.priority}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: task.completed ? "green" : "red" }}
                  >
                    {task.completed ? "Completed" : "Active"}
                  </TableCell>
                  <TableCell align="center">
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        justifyContent: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => dispatch(deleteTask(task.id))}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => navigate(`/updateTask/${task.id}`)}
                      >
                        Edit
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default LandingPage;
