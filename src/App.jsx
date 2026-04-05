import React from 'react'
import Header from './components/Header'
import { Box, CircularProgress, Typography } from '@mui/material'
import Board from './components/Board/Board'
import { getTasks } from './services/taskService'
import { useQuery } from '@tanstack/react-query'

const App = () => {

  const { data: tasks = [], isLoading, isError } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  })

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


  return (
    <>

      {/* Main Container */}
      <Box
        sx={{ bgcolor: "#f4f6f8", minHeight: "100vh" }}
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
        <Box
          sx={{ padding: "20px" }}
        >
          <Board tasks={tasks} />
        </Box>

      </Box>

    </>
  )
}

export default App