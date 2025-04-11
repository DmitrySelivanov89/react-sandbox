import { ReactNode, useRef, useState } from "react";

interface VirtualListProps<T> {
  items: T[],
  itemHeight: number,
  height: number,
  renderItem: (item: T) => ReactNode;
}

export const VirtualList = <T extends object>({ items, itemHeight, height, renderItem }: VirtualListProps<T>) => {
  const [scrollTop, setScrollTop] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const totalHeight = items.length * itemHeight;
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(items.length - 1, startIndex + Math.ceil(height / itemHeight));

  const handleScroll = () => {
    if (viewportRef.current) {
      setScrollTop(viewportRef.current.scrollTop);
    }
  };

  const visibleItems = items.slice(startIndex, endIndex + 1).map((item, index) => (
    <div key={index} style={{ height: itemHeight }}>
      {renderItem(item)}
    </div>
  ));

  return (
    <div ref={viewportRef} onScroll={handleScroll} style={{ height, overflowY: 'auto', position: 'relative' }}>
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ position: 'absolute', top: startIndex * itemHeight, width: '100%' }}>
          {visibleItems}
        </div>
      </div>
    </div>
  );
};
