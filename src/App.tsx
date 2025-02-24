import React, { useState } from "react";
import WeekdayDateRangePicker from "./WeekDayDatePicker";

const App: React.FC = () => {
  const [range, setRange] = useState<string[]>([]);
  const [weekends, setWeekends] = useState<string[]>([]);

  const handleDateChange = (range: string[], weekends: string[]) => {
    setRange(range);
    setWeekends(weekends);
  };

  return (
    <div>
      <h1>Weekday Date Range Picker</h1>
      <WeekdayDateRangePicker
        onChange={handleDateChange}
        predefinedRanges={[
          { label: "Last 7 Days", range: ["2025-02-15", "2025-02-21"] },
          { label: "Last 30 Days", range: ["2025-01-23", "2025-02-21"] },
        ]}
      />

      <span>Selected Range: [{range.toString()}]</span><br/>
      <span>Weekends in Selected Range: [{weekends.toString()}]</span>
    </div>
  );
};

export default App;
