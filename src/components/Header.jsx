import React from 'react'
import { Box, InputAdornment, TextField, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

const Header = ({ tasksCount }) => {

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: "100%",
        }}
        >
            {/* Left side: Logo, title and Length of tasks */}
            <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
                {/* Logo */}
                {/* <Box
                    sx={{
                        width: 35,
                        height: 35,
                        bgcolor: '#2f54eb',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold'
                    }}
                >
                    KB
                </Box> */}
                <Box
                    sx={{
                        width: 20,
                        height: 20,
                        bgcolor: '#2f54eb',
                        borderRadius: '12px',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '2px',
                        p: '10px'
                    }}
                >
                    <Box sx={{ border: "2px solid white", borderRadius: '2px' }}></Box>
                    <Box sx={{ border: "2px solid white", borderRadius: '2px' }}></Box>
                    <Box sx={{ border: "2px solid white", borderRadius: '2px' }}></Box>
                    <Box sx={{ border: "2px solid white", borderRadius: '2px' }}></Box>
                </Box>

                {/* title and Length of tasks */}
                <Box>
                    {/* title  */}
                    <Typography variant="subtitle1" sx={{ fontWeight: '700', lineHeight: 1.2, color: '#1f1f1f' }}>
                        KANBAN BOARD
                    </Typography>
                    {/* Length of tasks */}
                    <Typography variant="caption" sx={{ color: '#8c8c8c', fontWeight: '700' }}>
                        {tasksCount} {tasksCount === 1 ? "task" : "tasks"}
                    </Typography>
                </Box>
            </Box>

            {/* Right side:Search Bar */}
            <TextField
                variant="outlined"
                size="small"
                placeholder="Search tasks..."
                sx={{
                    width: 260,
                    bgcolor: '#f0f2f5',
                    borderRadius: '8px',
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        '& fieldset': {
                            borderColor: 'transparent',
                        },
                        '&:hover fieldset': {
                            borderColor: 'transparent',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#2f54eb',
                        },
                    },
                    '& .MuiInputBase-input': {
                        padding: '8px 12px',
                    }
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon sx={{ color: '#bfbfbf', fontSize: 20 }} />
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    )
}

export default Header