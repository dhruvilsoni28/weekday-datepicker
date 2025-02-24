import React, { useState } from "react";
import { DateRangePickerProps } from "./helpers/types";
import { formatDate, getNextWeekday, isWeekend } from "./helpers/utils";

const getWeekendsInRange = (startDate: Date, endDate: Date) => {
  const weekends: string[] = [];
  let current = new Date(startDate);

  while (current <= endDate) {
    if (isWeekend(current)) weekends.push(formatDate(current));
    current.setDate(current.getDate() + 1);
  }
  return weekends;
};

const WeekdayDateRangePicker: React.FC<DateRangePickerProps> = ({
  onChange,
  predefinedRanges = [],
}) => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const handleDateChange = (date: string, isStart: boolean) => {
    let parsedDate = new Date(date);

    if (isWeekend(parsedDate)) {
      alert("Weekends are not allowed. Selecting the next available weekday.");
      parsedDate = new Date(getNextWeekday(parsedDate));
    }

    const formattedDate = formatDate(parsedDate);

    if (isStart) {
      setStartDate(formattedDate);
      setEndDate(""); // Reset end date when start date changes
    } else {
      setEndDate(formattedDate);
    }
  };

  const applySelection = () => {
    if (!startDate || !endDate) return;
    const weekends = getWeekendsInRange(new Date(startDate), new Date(endDate));
    onChange([startDate, endDate], weekends);
  };

  return (
    <div>
      <label>Start Date:</label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => handleDateChange(e.target.value, true)}
      />

      <label>End Date:</label>
      <input
        type="date"
        value={endDate}
        onChange={(e) => handleDateChange(e.target.value, false)}
        min={startDate} // 🔹 This disables all dates before the selected start date
        disabled={!startDate} // 🔹 Prevents selecting an end date before selecting a start date
      />

      <button
        onClick={applySelection}
        disabled={!startDate.length || !endDate.length}
      >
        Apply
      </button>

      <div>
        <h4>Predefined Ranges</h4>
        {predefinedRanges.map(({ label, range }) => (
          <button
            key={label}
            onClick={() => {
              setStartDate(range[0]);
              setEndDate(range[1]);
              applySelection();
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WeekdayDateRangePicker;
