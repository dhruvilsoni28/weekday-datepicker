export const isWeekend = (date: Date) => date.getDay() === 0 || date.getDay() === 6;

export const formatDate = (date: Date) => date.toISOString().split("T")[0]; // YYYY-MM-DD format

// Function to find the next valid weekday
export const getNextWeekday = (date: Date) => {
    let newDate = new Date(date);
    while (isWeekend(newDate)) {
      newDate.setDate(newDate.getDate() + 1); // Move to the next day
    }
    return formatDate(newDate);
  };