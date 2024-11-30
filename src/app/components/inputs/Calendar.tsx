'use client';

import { DateRange, Range } from "react-date-range";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

type CalendarProps = {
    value: Range,
    disabledDates?: Date[],
    onChange: (value: Range) => void,
}

const Calendar = ({ value, disabledDates, onChange } : CalendarProps) => {
  return (
    <DateRange 
        rangeColors={["#262626"]}
        ranges={[value]}
        date={new Date()}
        onChange={(ranges) => onChange(ranges.selection)}
        direction="vertical"
        showDateDisplay={false}
        minDate={new Date()}
        disabledDates={disabledDates}
    />
  );
};

export default Calendar;