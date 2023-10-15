import React, {ReactNode} from "react";
import Seating from "./Seating";
import Calling from "./Calling";
import Contact from "./Contact";
import Control from "./Control";
import Poll from "./Poll";

const tabs = [
    {id: 'seating', label: 'Seating', content: <Seating />},
    {id: 'calling', label: 'Calling', content: <Calling />},
    {id: 'contact', label: 'Contact', content: <Contact />},
    {id: 'control', label: 'Control', content: <Control />},
    {id: 'poll', label: 'Poll', content: <Poll />}
];

interface TabProps {
    id: string;
    label: string;
    isActive: boolean;
}

interface TabProps {
    id: string;
    label: string;
    isActive: boolean;
    onClick: () => void;  // Add this line
}

const Tab: React.FC<TabProps> = ({ id, label, isActive, onClick }) => (
    <li className="nav-item">
        <a className={`nav-link ${isActive ? 'active' : ''}`}
           id={`${id}-tab`}
           href={`#${id}`}  // This line remains but won't navigate due to the onClick handler
           role="tab"
           aria-controls={id}
           aria-selected={isActive}
           onClick={(e) => {
               e.preventDefault();  // Prevent the default navigation
               onClick();
           }}
        >
            {label}
        </a>
    </li>
);

interface TabContentProps {
    id: string;
    content: ReactNode
    isActive: boolean;
}
const TabContent = ({id, content, isActive}: TabContentProps) => (
    <div className={`tab-pane ${isActive ? 'show active' : ''}`}
         id={id}
         role="tabpanel"
         aria-labelledby={`${id}-tab`}>
        {content}
    </div>
);

const TabsComponent: React.FC = () => {
    const [activeTab, setActiveTab] = React.useState(tabs[0].id);  // default to the first tab

    return (
        <div>
            <ul className="nav nav-tabs" role="tablist">
                {tabs.map(tab => (
                    <Tab
                        key={tab.id}
                        {...tab}
                        isActive={tab.id === activeTab}
                        onClick={() => setActiveTab(tab.id)}  // Set the active tab on click
                    />
                ))}
            </ul>

            <div className="tab-content">
                {tabs.map(tab => (
                    <TabContent key={tab.id} {...tab} isActive={tab.id === activeTab} />
                ))}
            </div>
        </div>
    );
};

export default TabsComponent;
