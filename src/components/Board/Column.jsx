import { Box, CircularProgress, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer';

const Column = ({ title, tasks = [] }) => {

    const [visibleCount, setVisibleCount] = useState(3);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

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
            case "low":
                return { bgcolor: '#f6ffed', color: "#52c41a" };
            default:
                return { bgcolor: '#f5f5f5', color: "#8c8c8c" };
        }
    }

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
                        // width: 8,
                        // height: 8,
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
                            bgcolor: "white", borderRadius: "8px", p: 2,
                            boxShadow: "0px 1px 2px rgba(0,0,0,0.05)", border: "1px solid #e8e8e8",
                            display: "flex", flexDirection: "column", gap: "10px"
                        }}
                    >
                        <Typography variant="body2" sx={{ fontWeight: "700" }}>
                            {task.title}
                        </Typography>
                        <Typography variant="caption" sx={{ lineHeight: 1.8, display: "block", color: "#635e5e" }}>
                            {task.description}
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
            </Box>
        </Box>
    )
}

export default Column