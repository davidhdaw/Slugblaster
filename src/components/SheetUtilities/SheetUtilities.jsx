import { useState, useEffect } from "react";

// LocalStorage utility functions
const useLocalStorage = (key, initialValue) => {
  // State to store our value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error, return initialValue
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function 
  // that persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};

// Function to generate unique keys based on component ID and character sheet
const getStorageKey = (id, sheetId) => {
  return `tttrpg_${sheetId || 'default'}_${id}`;
};

// Tooltip component for displaying game term explanations
const Tooltip = ({ children, content }) => {
  return (
    <div className="tooltip-wrap">
      <span className="tooltip-trigger">{children}</span>
      <div className="tooltip">
        <p>{content}</p>
      </div>
    </div>
  );
};

// ResourceTracker component for various trackers (Style, Trouble, etc.)
const ResourceTracker = ({ type, count = 8, id, sheetId }) => {
  const storageKey = getStorageKey(`resource_${id || type}`, sheetId);
  const [checked, setChecked] = useLocalStorage(storageKey, Array(count).fill(false));
  
  // Handle resize if count changes
  useEffect(() => {
    if (checked.length !== count) {
      // Resize array if count changes, preserving existing values
      const newChecked = Array(count).fill(false);
      checked.forEach((value, index) => {
        if (index < count) {
          newChecked[index] = value;
        }
      });
      setChecked(newChecked);
    }
  }, [count, checked.length]);
  
  const handleCheck = (index) => {
    const newChecked = [...checked];
    newChecked[index] = !newChecked[index];
    setChecked(newChecked);
  };

  return (
    <div className="resource-boxes">
      {Array.from({ length: count }).map((_, i) => (
        <label key={i} className={`resource-box ${type}`}>
          <input 
            type="checkbox" 
            checked={checked[i]}
            onChange={() => handleCheck(i)}
          />
          <span className="checkmark"></span>
        </label>
      ))}
    </div>
  );
};

// ChecklistItem component for traits, gear, beats, etc.
const ChecklistItem = ({ id, label, tooltip, placeholder, hasTextInput = false, sheetId }) => {
  const checkedKey = getStorageKey(`checklist_${id}_checked`, sheetId);
  const textKey = getStorageKey(`checklist_${id}_text`, sheetId);
  
  const [checked, setChecked] = useLocalStorage(checkedKey, false);
  const [text, setText] = useLocalStorage(textKey, '');
  
  return (
    <div className="trait-item">
      <input 
        type="checkbox" 
        id={id} 
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      {tooltip ? (
        <div>
          <Tooltip content={tooltip}>
            <label htmlFor={id}>{label}</label>
          </Tooltip>
          {hasTextInput && (
            <input 
              type="text" 
              placeholder={placeholder || ''} 
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ width: '60%' }}
            />
          )}
        </div>
      ) : (
        <label htmlFor={id}>{label}</label>
      )}
    </div>
  );
};

// Component for a section of checklist items (beats, gear, etc.)
const ChecklistSection = ({ title, items, sheetId }) => {
  return (
    <div>
      <h3>{title}</h3>
      {items.map((item) => (
        <ChecklistItem 
          key={item.id} 
          id={item.id} 
          label={item.label} 
          tooltip={item.tooltip}
          placeholder={item.placeholder}
          hasTextInput={item.hasTextInput}
          sheetId={sheetId}
        />
      ))}
    </div>
  );
};

// TabSystem component for rules reference
const TabSystem = ({ tabs, id, sheetId }) => {
  const storageKey = getStorageKey(`tabs_${id || 'default'}`, sheetId);
  const [activeTab, setActiveTab] = useLocalStorage(storageKey, 0);
  
  return (
    <div className="tab-container">
      <div className="tabs">
        {tabs.map((tab, index) => (
          <button 
            key={index}
            className={`tab-button ${activeTab === index ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      
      {tabs.map((tab, index) => (
        <div 
          key={index}
          className={`tab-content ${activeTab === index ? 'active' : ''}`}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
};

// ComponentTracker for hardlight board components
const ComponentTracker = ({ type, count = 3, id, sheetId }) => {
  const storageKey = getStorageKey(`component_${id || type}`, sheetId);
  const [checked, setChecked] = useLocalStorage(storageKey, Array(count).fill(false));
  
  // Handle resize if count changes
  useEffect(() => {
    if (checked.length !== count) {
      // Resize array if count changes, preserving existing values
      const newChecked = Array(count).fill(false);
      checked.forEach((value, index) => {
        if (index < count) {
          newChecked[index] = value;
        }
      });
      setChecked(newChecked);
    }
  }, [count, checked.length]);
  
  const handleCheck = (index) => {
    const newChecked = [...checked];
    newChecked[index] = !newChecked[index];
    setChecked(newChecked);
  };

  return (
    <div>
      <div className="component-type">{type}</div>
      <div className="resource-boxes">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="component-box">
            <input 
              type="checkbox" 
              checked={checked[i]}
              onChange={() => handleCheck(i)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Utility hook for text inputs that save to localStorage
const useCharacterField = (fieldId, sheetId, initialValue = '') => {
  const storageKey = getStorageKey(`character_${fieldId}`, sheetId);
  return useLocalStorage(storageKey, initialValue);
};

// Utility to create a character sheet context with all required fields
const createCharacterStorage = (sheetId, initialData = {}) => {
  return {
    useCharacterField: (fieldId, initialValue = '') => {
      return useCharacterField(fieldId, sheetId, initialValue || initialData[fieldId] || '');
    }
  };
};

// Function to clear all data for a specific sheet
const clearSheetData = (sheetId) => {
  const prefix = `tttrpg_${sheetId}_`;
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith(prefix)) {
      localStorage.removeItem(key);
    }
  });
};

export {
  ResourceTracker, 
  ComponentTracker, 
  Tooltip, 
  ChecklistItem, 
  ChecklistSection, 
  TabSystem, 
  useLocalStorage,
  useCharacterField,
  createCharacterStorage,
  clearSheetData,
  getStorageKey
}