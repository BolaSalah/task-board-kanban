import { Box } from '@mui/material';
import React from 'react'

const highlightText = (text, highlight) => {
    if (!highlight || !highlight.trim()) {
        return text;
    }

    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
        <span>
            {parts.map((part, index) =>
                part.toLowerCase() === highlight.toLowerCase() ? (
                    <Box
                        component="span"
                        key={index}
                        sx={{
                            bgcolor: '#ffe58f',
                            color: '#d46b08',
                            borderRadius: '2px',
                            paddingInline: '2px',
                            fontWeight: 'bold'
                        }}
                    >
                        {part}
                    </Box>
                ) : (
                    part
                )
            )}
        </span>
    )
}

export default highlightText