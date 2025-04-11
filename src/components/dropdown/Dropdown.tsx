import { useState } from "react";
import { ReactNode } from "react";

interface DropdownMenuProps<T extends ReactNode> {
  items: T[];
}

export const DropdownMenu = <T extends ReactNode>({ items }: DropdownMenuProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Menu</button>
      {isOpen && (
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
