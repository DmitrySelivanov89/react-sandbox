import { useState } from 'react';

export const Datepicker = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const daysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, auto)', gap: '10px', width: '200px' }}>
        {Array.from({ length: daysInMonth(selectedDate?.getMonth() || 0, selectedDate?.getFullYear() || new Date().getFullYear()) }, (_, i) => {
          return (
            <button key={i} onClick={() => setSelectedDate(new Date(selectedDate?.getFullYear() || new Date().getFullYear(), selectedDate?.getMonth() || 0, i + 1))}>
              {i + 1}
            </button>
          );
        })}
      </div>
      {selectedDate?.toDateString()}
    </>
  );
};
