import { useState } from 'react';
import { createPortal } from 'react-dom';
import './Combobox.css';

interface Option {
  value: any,
  label: string;
}

interface ComboboxProps {
  options: Option[];
}

export const Combobox = (props: ComboboxProps) => {
  const { options } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const filteredOptions: Option[] = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="custom-select">
      <div className="selected" onClick={toggleDropdown}>
        {selectedOption ? selectedOption.label : 'Select an option'}
      </div>
      {isOpen && createPortal(
        <div className="dropdown">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ul>
            {filteredOptions.map((option) => (
              <li key={String(option.value)} onClick={() => handleOptionClick(option)}>
                {option.label}
              </li>
            ))}
          </ul>
        </div>,
        document.body
      )}
    </div>
  );
};
