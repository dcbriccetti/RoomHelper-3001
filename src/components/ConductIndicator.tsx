import {Box} from "@mui/material";
import {useState} from "react";

export default function ConductIndicator() {
    const [value, setValue] = useState(0);

    const conductEmojis = ['🔴', '🟠', '🟡', '', '🟢',];

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - bounds.left; // x position within the element
        const halfWidth = bounds.width / 2;

        // Update the value based on the click position
        if (x < halfWidth && value > -3) {
            setValue(value - 1);
        } else if (x > halfWidth && value < 1) {
            setValue(value + 1);
        }
    };

    // Calculate index for the emoji array (0-4), considering 'value' ranges from -3 to 1
    const emojiIndex = value + 3;

    return (
        <Box
            component='span'
            sx={{
                textAlign: 'center',        // Centers horizontally
                lineHeight: '40px',          // Centers vertically, should match the height
                height: '40px',              // Height of the Box, for vertical centering to work
                width: '2em',                // Width of the Box
                fontSize: '1.3rem',          // Size of the emoji font
                cursor: 'pointer',
                userSelect: 'none'           // Prevents text selection on double click
            }}
            onClick={handleClick}
        >
            {conductEmojis[emojiIndex]}
        </Box>
    );
}
