import React, {useState, FC, useEffect} from "react";
import {useSettings, useSocket} from "../App";

interface FeatureControlProps {
    label: string;
    isEnabled: boolean;
    setIsEnabled: React.Dispatch<React.SetStateAction<boolean>>;
    controlName: string;
}

const FeatureControl: FC<FeatureControlProps> = ({ label, isEnabled, setIsEnabled, controlName }) => {
    const socket = useSocket();

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        setIsEnabled(checked);

        const action = `enable_${controlName}`;
        socket?.emit(action, checked);
    };

    const handleClearClick = () => {
        socket?.emit(`clear_${controlName}`);
    };

    const inputId = `enable-${controlName}`;

    return (
        <div>
            <input
                id={inputId}
                type="checkbox"
                checked={isEnabled}
                onChange={handleCheckboxChange}
            />
            <label htmlFor={inputId}><span className="control-name">{label}</span></label>
            <button
                id={`clear-${inputId}`}
                type="button"
                className="btn btn-outline-primary btn-sm"
                onClick={handleClearClick}
            >
                Clear
            </button>
        </div>
    );
};

const Control: FC = () => {
    const settings = useSettings();

    const [isChecksEnabled, setChecksEnabled] = useState(false);
    const [isSharesEnabled, setSharesEnabled] = useState(false);
    const [isChatEnabled, setChatEnabled] = useState(false);

    useEffect(() => {
        if (settings) {
            setChecksEnabled(settings.checksEnabled);
            setSharesEnabled(settings.sharesEnabled);
            setChatEnabled(settings.chatEnabled);
        }
    }, [settings]);

    return (
        <div id="control">
            <h1>Control</h1>
            <p>Enable/disable the following features:</p>

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

export default Control;
