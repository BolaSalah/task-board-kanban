import React from 'react'
import Header from './components/Header'
import { Box, CircularProgress, Typography } from '@mui/material'
import Board from './components/Board/Board'
import { getTasks } from './services/taskService'
import { useQuery } from '@tanstack/react-query'
import { DragDropContext } from "@hello-pangea/dnd";
import { useTasks } from './hooks/useTasks'

const App = () => {

  const { data: tasks = [], isLoading, isError } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  })
  const { updateTask } = useTasks();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: "#f4f6f8" }}>
        <CircularProgress />
      </Box>
    )
  }

  if (isError) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: "#f4f6f8" }}>
        <Typography color="error">
          Error loading tasks. Make sure json-server is running on port 4000!
        </Typography>
      </Box>
    )
  }

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;

    updateTask({
      id: draggableId,
      column: destination.droppableId
    });
  };

  return (
    // Main Container 
    <Box
      sx={{ bgcolor: "#f4f6f8", minHeight: "100vh",display:"flex",flexDirection:"column" }}
    >

      {/* Header component */}
      <Box
        sx={{ padding: "20px" }}
      >
        <Header tasksCount={tasks.length} />
      </Box>

      {/* Sepration Line below the Header */}
      <Box sx={{ height: "1px", bgcolor: "#d9d9d9", width: "100%" }}></Box>

      {/* Tasks */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Box
          sx={{ padding: "20px", flex: 1, display: "flex" }}
        >
          <Board tasks={tasks} />
        </Box>
      </DragDropContext>

    </Box>
  )
}

export default App