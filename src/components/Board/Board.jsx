import { Box, Grid } from '@mui/material'
import React from 'react'
import Column from './Column'

const Board = ({ tasks = [] }) => {

    const columnTitles = [
        { title: "TO DO", key: "backlog" },
        { title: "IN PROGRESS", key: "in_progress" },
        { title: "IN REVIEW", key: "review" },
        { title: "DONE", key: "done" }
    ]

    return (
        <Box sx={{ padding: "10px" }}>
            <Grid container spacing={3}>
                {columnTitles.map((col, index) => {

                    const filterdTaskes = tasks.filter(task => task.column.toLowerCase() === col.key.toLowerCase());
                    return (
                        <Grid key={index} size={{ xs: 12, md: 3 }}>
                            <Column title={col.title} tasks={filterdTaskes} />
                        </Grid>
                    )
                })}
            </Grid>
        </Box>
    )
}

export default Board