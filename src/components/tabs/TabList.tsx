import { ReactNode, useState } from "react";

interface Tab {
  label: string;
  content: ReactNode;
  icon?: ReactNode;
}

interface TabListProps {
  tabs: Tab[];
  defaultActiveTab?: number;
  onTabChange?: (index: number) => void;
}

export const TabList = ({
  tabs,
  defaultActiveTab = 0,
  onTabChange
}: TabListProps) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    onTabChange?.(index);
  };

  return (
    <div className="tabs-container" role="tablist">
      <div className="tab-buttons">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            role="tab"
            aria-selected={activeTab === i}
            aria-controls={`tab-panel-${i}`}
            id={`tab-${i}`}
            className={`tab-button ${activeTab === i ? 'active' : ''}`}
            onClick={() => handleTabChange(i)}
          >
            {tab.icon && <span className="tab-icon">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>
      <div
        className="tab-content"
        role="tabpanel"
        id={`tab-panel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
      >
        {tabs[activeTab].content}
      </div>
    </div>
  );
};
