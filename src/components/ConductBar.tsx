import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import * as React from "react";
import {useState} from "react";

// Base styled component for both bars
const BaseBar = styled(Box)({
    height: '10px',
    borderRadius: '5px',
    width: '100%', // Common width
    backgroundSize: '200% 100%', // Stretch to double width
});

const PositiveBar = styled(BaseBar)({
    backgroundImage: 'linear-gradient(to right, lightgreen, green)',
    backgroundPosition: '100% 0', // Start from the right
});

const NegativeBar = styled(BaseBar)({
    backgroundImage: 'linear-gradient(to left, yellow 5%, red 95%)',
    backgroundPosition: '0% 0', // Start from the left
});

function ConductBar() {
    const [value, setValue] = useState(0);

    function handleClick(event: React.MouseEvent<HTMLDivElement>) {
        const bounds = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - bounds.left; // x position within the element
        const halfWidth = bounds.width / 2;

        // Update the value based on the click position
        if (x < halfWidth && value > -3) {
            setValue(value - 1);
        } else if (x > halfWidth && value < 3) {
            setValue(value + 1);
        }
    }

    // Convert the value to a percentage for the width of the bars
    const percentage = Math.abs((value / 3) * 100);

    return (
        <Box sx={{display: 'flex', alignItems: 'center', height: '10px', width: '100%'}}
             onClick={handleClick}>
            <Box sx={{flex: 1, display: 'flex', justifyContent: 'flex-end', overflow: 'hidden'}}>
                {value < 0 && (
                    <NegativeBar
                        sx={{
                            transform: `scaleX(${percentage / 100})`,
                            transformOrigin: 'right',
                        }}
                    />
                )}
            </Box>
            <Box sx={{flex: 1, display: 'flex', overflow: 'hidden'}}>
                {value > 0 && (
                    <PositiveBar
                        sx={{
                            transform: `scaleX(${percentage / 100})`,
                            transformOrigin: 'left',
                        }}
                    />
                )}
            </Box>
        </Box>
    );
}

export default ConductBar;
