import { Box, Grid } from '@mui/material'
import React from 'react'
import Column from './Column'
import { useSelector } from 'react-redux';

const Board = ({ tasks = [] }) => {

    // Get real-time search term from Redux store
    const searchTerm = useSelector((state) => state.search.searchTerm);

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

                    // Filter tasks by column key and search keyword
                    const filterdTaskes = tasks.filter(task => {

                        const isInColumn = task.column.toLowerCase() === col.key.toLowerCase()
                        const normalizedSearch = searchTerm.toLowerCase();

                        const matchSearch = task.title.toLowerCase().includes(normalizedSearch) || task.description.toLowerCase().includes(normalizedSearch)

                        return isInColumn && matchSearch

                    });
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