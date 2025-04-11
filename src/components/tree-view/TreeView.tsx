import { FC, useState } from 'react';

export interface ITreeNode {
  id: number;
  name: string;
  description?: string;
  isExpanded?: boolean;
  isSelected?: boolean;
  children?: ITreeNode[];
}

interface TreeNodeProps {
  node: ITreeNode,
  level?: number;
}

export const TreeNode: FC<TreeNodeProps> = ({ node, level = 0 }) => {
  const [isOpen, setIsOpen] = useState(node.isExpanded || false);
  const [isSelected, setIsSelected] = useState(node.isSelected || false);

  const hasChildren = Array.isArray(node.children) && node.children.length > 0;

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleSelect = () => setIsSelected(!isSelected);

  return (
    <div style={{ marginLeft: `${level * 20}px` }}>
      <div style={{ backgroundColor: isSelected ? 'lightblue' : 'transparent' }} onClick={handleSelect}>
        {hasChildren && (
          <span
            onClick={toggleOpen}
            style={{ cursor: 'pointer', marginRight: '5px' }}
          >
            {isOpen ? '-' : '+'}
          </span>
        )}
        {node.name} {node.description && <span>({node.description})</span>}
      </div>
      {isOpen && hasChildren && (
        <div>
          {node?.children?.map((child: ITreeNode, index: number) => (
            <TreeNode key={index} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export const TreeView: FC<{ data: ITreeNode; }> = ({ data }) => {
  return (
    <div>
      <TreeNode node={data} />
    </div>
  );
};
