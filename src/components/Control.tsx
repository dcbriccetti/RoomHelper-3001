import React, {ChangeEvent, Dispatch, FC, SetStateAction, useContext} from "react";
import {Button, Checkbox, FormControlLabel, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {ControlsAndChatContext, useSocket} from "./contexts";
import './Control.css';

interface FeatureControlProps {
    label: string;
    isEnabled: boolean;
    setIsEnabled: Dispatch<SetStateAction<boolean>>;
    controlName: string;
}

const FeatureControl: FC<FeatureControlProps> = ({label, isEnabled, setIsEnabled, controlName}) => {
    const socket = useSocket();

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        setIsEnabled(checked);

        const action = `enable_${controlName}`;
        socket?.emit(action, checked);
    };

    const handleClearClick = () => socket?.emit(`clear_${controlName}`);

    const inputId = `enable-${controlName}`;

    return (
        <div>
            <FormControlLabel
                control={<Checkbox checked={isEnabled} onChange={handleCheckboxChange}/>}
                label={label}
                sx={{width: '7rem'}}
            />
            <Button
                id={`clear-${inputId}`}
                size="small"
                variant="outlined"
                onClick={handleClearClick}
                startIcon={<DeleteIcon/>}
            >
                Clear
            </Button>
        </div>
    );
};

export default function Control() {
    const {
        isChecksEnabled,
        setChecksEnabled,
        isSharesEnabled,
        setSharesEnabled,
        isChatEnabled,
        setChatEnabled
    } = useContext(ControlsAndChatContext);

    return (
        <div id="control">
            <Typography>Enable/disable the following features:</Typography>

            <FeatureControl
                label="Statuses"
                isEnabled={isChecksEnabled}
                setIsEnabled={setChecksEnabled}
                controlName="checks"
            />

            <FeatureControl
                label="Shares"
                isEnabled={isSharesEnabled}
                setIsEnabled={setSharesEnabled}
                controlName="shares"
            />

            <FeatureControl
                label="Chat"
                isEnabled={isChatEnabled}
                setIsEnabled={setChatEnabled}
                controlName="chat"
            />
        </div>
    );
};
