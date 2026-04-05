import React from 'react'
import Header from './components/Header'
import { Box } from '@mui/material'

const App = () => {

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
          <Header />
        </Box>

        {/* Sepration Line below the Header */}
        <Box sx={{ height: "1px", bgcolor: "#d9d9d9", width: "100%" }}>

        </Box>

      </Box>

    </>
  )
}

export default App