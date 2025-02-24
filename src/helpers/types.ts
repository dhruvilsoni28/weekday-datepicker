export type DateRangePickerProps = {
    onChange: (selectedRange: string[], weekends: string[]) => void;
    predefinedRanges?: { label: string; range: [string, string] }[];
  };