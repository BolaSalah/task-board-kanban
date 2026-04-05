import { Box, Button, CircularProgress, FormControl, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';
import highlightText from '../../utils/highlightText';
import { useTasks } from '../../hooks/useTasks';
import DeleteIcon from '@mui/icons-material/Delete';

const Column = ({ title, tasks = [] }) => {

    const searchTerm = useSelector((state) => state.search.searchTerm);

    const { deleteTask, createTask } = useTasks()

    const [visibleCount, setVisibleCount] = useState(3);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    // to create new task
    const [isAdding, setIsAdding] = useState(false);
    const [newTask, setNewTask] = useState({ title: '', description: '', priorty: 'LOW' });

    const { ref, inView } = useInView({
        threshold: 0,
    });

    useEffect(() => {
        if (inView && visibleCount < tasks.length) {
            setIsLoadingMore(true);

            setTimeout(() => {
                setVisibleCount((prev) => prev + 2);
                setIsLoadingMore(false);
            }, 1000);
        }
    }, [inView, tasks.length, visibleCount]);

    const displayedTasks = tasks.slice(0, visibleCount);

    const getDotColor = (columnTitle) => {
        switch (columnTitle) {
            case "TO DO":
                return '#2f54eb';
            case "IN PROGRESS":
                return '#fa8c16';
            case "IN REVIEW":
                return '#722ed1';
            case "DONE":
                return '#52c41a';
            default:
                return '#8c8c8c';
        }
    }

    const getPriorityColor = (level) => {
        switch (level) {
            case "HIGH":
                return { bgcolor: '#fff1f0', color: "#f5222d" };
            case "MEDIUM":
                return { bgcolor: '#fff7e6', color: "#fa8c16" };
            case "LOW":
                return { bgcolor: '#f6ffed', color: "#52c41a" };
            default:
                return { bgcolor: '#f5f5f5', color: "#8c8c8c" };
        }
    }

    const handleSaveTask = () => {
        if (!newTask.title.trim()) return;

        let columnValue = title.toLowerCase().replace(" ", "_");

        if (columnValue == "to_do") {
            columnValue = "backlog";
        }
        if (columnValue == "in_review") {
            columnValue = "review";
        }
        createTask({
            ...newTask,
            column: columnValue
        }, {
            onSuccess: () => {
                setIsAdding(false);
                setNewTask({ title: '', description: '', priorty: 'LOW' });
            }
        });
    };

    return (
        <Box
            sx={{ bgcolor: "#e9ebec", borderRadius: "12px", p: 2, boxShadow: "0px 1px 3px rgba(0,0,0,0.02)", height: "100%" }}
        >
            <Typography
                variant="subtitle2"
                sx={{
                    fontWeight: '700',
                    mb: "12px",
                    display: 'flex',
                    alignItems: 'center',
                    color: '#1f1f1f',
                }}
            >
                <Box
                    sx={{
                        width: 12,
                        height: 12,
                        bgcolor: getDotColor(title),
                        borderRadius: '50%',
                        mr: "12px"
                    }}
                />
                {title}

                <Box
                    sx={{
                        ml: "10px",
                        paddingBlock: "2px",
                        paddingInline: "8px",
                        borderRadius: "100px",
                        bgcolor: "#dddfe0"
                    }}
                >
                    {tasks.length}
                </Box>
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {displayedTasks.map((task) => (
                    <Box
                        key={task.id}
                        sx={{
                            bgcolor: "white", borderRadius: "8px", p: 2, position: "relative",
                            boxShadow: "0px 1px 2px rgba(0,0,0,0.05)", border: "1px solid #e8e8e8",
                            display: "flex", flexDirection: "column", gap: "10px"
                        }}
                    >
                        <Box sx={{ position: "absolute", top: 8, right: 8 }}>
                            <IconButton
                                size="small"
                                onClick={() => deleteTask(task.id)}
                                sx={{ color: "#f5222d" }}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Box>
                        <Typography variant="body2" sx={{ fontWeight: "700" }}>
                            {highlightText(task.title, searchTerm)}
                        </Typography>
                        <Typography variant="caption" sx={{ lineHeight: 1.8, display: "block", color: "#635e5e" }}>
                            {highlightText(task.description, searchTerm)}
                        </Typography>
                        <Box sx={{ display: "flex", mt: "2px" }}>
                            <Box
                                sx={{
                                    bgcolor: getPriorityColor(task.priorty).bgcolor,
                                    color: getPriorityColor(task.priorty).color,
                                    paddingInline: "12px",
                                    borderRadius: "4px",
                                    fontWeight: "600"
                                }}>
                                {task.priorty}
                            </Box>
                        </Box>
                    </Box>
                ))}
                {visibleCount < tasks.length && (
                    <Box ref={ref} sx={{ display: 'flex', justifyContent: 'center', p: 1, mt: 1 }}>
                        {isLoadingMore && (
                            <Box sx={{ display: "flex", flexDirection: "column", justifyItems: "center", alignItems: "center", gap: "10px" }}>
                                <Typography variant="caption" sx={{ color: '#8c8c8c', fontWeight: '700' }}>
                                    Loading more tasks...
                                </Typography>
                                <CircularProgress
                                    size={20}
                                    sx={{ color: '#fa8c16' }}
                                />
                            </Box>
                        )}
                    </Box>
                )}
                {!isAdding ? (
                    <Button
                        fullWidth
                        variant="outlined"
                        onClick={() => setIsAdding(true)}
                        sx={{ borderStyle: 'dashed', color: '#595959', borderColor: '#d9d9d9' }}
                    >
                        + Add Task
                    </Button>
                ) : (
                    <Box sx={{ bgcolor: "white", borderRadius: "8px", p: 2, border: "1px solid #d9d9d9", display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <TextField
                            size="small"
                            placeholder="Task title..."
                            value={newTask.title}
                            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                            fullWidth
                            autoFocus
                        />
                        <TextField
                            size="small"
                            placeholder="Description..."
                            value={newTask.description}
                            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                            fullWidth
                            multiline
                            rows={2}
                        />

                        <FormControl size="small" fullWidth>
                            <InputLabel>Priority</InputLabel>
                            <Select
                                value={newTask.priorty}
                                label="Priority"
                                onChange={(e) => setNewTask({ ...newTask, priorty: e.target.value })}
                            >
                                <MenuItem value="HIGH">High</MenuItem>
                                <MenuItem value="MEDIUM">Medium</MenuItem>
                                <MenuItem value="LOW">Low</MenuItem>
                            </Select>
                        </FormControl>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                            <Button size="small" color="inherit" onClick={() => setIsAdding(false)}>Cancel</Button>
                            <Button size="small" variant="contained" color="primary" onClick={handleSaveTask}>Save</Button>
                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    )
}

export default Column