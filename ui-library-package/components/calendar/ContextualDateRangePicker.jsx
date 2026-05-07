import React, { useState, useEffect } from 'react';

/**
 * Example Usage:
 * 
 * import { ContextualDateRangePicker } from 'ui-library-spj';
 * import { useState } from 'react';
 * 
 * export default function App() {
 *   const [range, setRange] = useState({ start: null, end: null });
 *   const [error, setError] = useState("");
 * 
 *   return (
 *     <div className="p-8 flex justify-center bg-gray-100 min-h-screen">
 *       <div className="flex flex-col items-center">
 *         <ContextualDateRangePicker
 *           value={range}
 *           onChange={(newRange, err) => {
 *             setRange(newRange);
 *             setError(err || "");
 *           }}
 *           disableBeforeToday={true}
 *           disableWeekends={true}
 *           presets={[
 *             {
 *               label: 'Next Work Week',
 *               getValue: () => {
 *                 const start = new Date();
 *                 const end = new Date();
 *                 start.setDate(start.getDate() + (8 - start.getDay()) % 7 + 1); // Next Monday
 *                 end.setDate(start.getDate() + 4); // Next Friday
 *                 return { start, end };
 *               }
 *             }
 *           ]}
 *         />
 *       </div>
 *     </div>
 *   );
 * }
 */

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const ContextualDateRangePicker = ({
  value = { start: null, end: null },
  onChange,
  disableBeforeToday = false,
  disableAfterToday = false,
  disableWeekends = false,
  disableHolidays = [],
  className = "",
  presets = []
}) => {
  const [currentMonth, setCurrentMonth] = useState(value?.start ? new Date(value.start) : new Date());
  const [hoverDate, setHoverDate] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (value?.start && !value?.end) {
      setCurrentMonth(new Date(value.start));
    }
  }, [value?.start]);

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const isDateDisabled = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);

    const isWeekend = checkDate.getDay() === 0 || checkDate.getDay() === 6;
    const isPast = checkDate < today;
    const isFuture = checkDate > today;
    
    const dateStr = `${checkDate.getFullYear()}-${String(checkDate.getMonth() + 1).padStart(2, '0')}-${String(checkDate.getDate()).padStart(2, '0')}`;
    const isHoliday = disableHolidays.includes(dateStr);

    if (disableBeforeToday && isPast) return "Past dates are disabled.";
    if (disableAfterToday && isFuture) return "Future dates are disabled.";
    if (disableWeekends && isWeekend) return "Weekends are disabled.";
    if (isHoliday) return "This date is a holiday.";

    return false;
  };

  const handleSelectDate = (date) => {
    const err = isDateDisabled(date);
    if (err) {
      setErrorMsg(typeof err === 'string' ? err : "Date not allowed");
      if (onChange) onChange(value, typeof err === 'string' ? err : "Date not allowed");
      return;
    }

    setErrorMsg("");
    
    if (!value?.start || (value?.start && value?.end)) {
      const newRange = { start: date, end: null };
      if (onChange) onChange(newRange, null);
    } else {
      let newRange;
      if (date < value.start) {
        newRange = { start: date, end: value.start };
      } else {
        newRange = { start: value.start, end: date };
      }
      if (onChange) onChange(newRange, null);
    }
  };

  const isDateEqual = (d1, d2) => {
    if (!d1 || !d2) return false;
    return d1.getFullYear() === d2.getFullYear() && 
           d1.getMonth() === d2.getMonth() && 
           d1.getDate() === d2.getDate();
  };

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-full h-9" />);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const disabledReason = isDateDisabled(date);
      const isDisabled = !!disabledReason;
      
      const isStart = isDateEqual(date, value?.start);
      const isEnd = isDateEqual(date, value?.end);
      
      let isInRange = false;
      if (value?.start && value?.end && date > value.start && date < value.end) {
        isInRange = true;
      } else if (value?.start && !value?.end && hoverDate && !isDisabled) {
        if ((date > value.start && date <= hoverDate) || (date < value.start && date >= hoverDate)) {
          isInRange = true;
        }
      }

      const isToday = new Date().toDateString() === date.toDateString();

      // Shape of the range highlights using precise rounded corners
      const showRightHalf = isStart && (value?.end || (hoverDate && hoverDate > value.start));
      const showLeftHalf = isEnd || (isStart && !value?.end && hoverDate && hoverDate < value.start);
      const isMidRange = isInRange && !isStart && !isEnd;

      const radiusClass = 
        (showRightHalf && !showLeftHalf) ? 'rounded-l-lg' :
        (showLeftHalf && !showRightHalf) ? 'rounded-r-lg' :
        (isMidRange) ? 'rounded-none' : 
        'rounded-lg'; // standalone or full selected

      const bgClass = 
        (isStart || isEnd) ? 'bg-gray-900 text-white shadow-sm font-medium z-10' :
        isMidRange ? 'bg-gray-100 text-gray-900 font-medium' :
        !isDisabled ? 'text-gray-700 hover:bg-gray-100 hover:text-black font-medium' :
        'text-gray-300 cursor-not-allowed';

      days.push(
        <button
          key={i}
          type="button"
          disabled={isDisabled}
          onClick={() => handleSelectDate(date)}
          onMouseEnter={() => setHoverDate(date)}
          className={`relative w-full h-9 flex items-center justify-center text-[13px] transition-colors duration-200
            ${radiusClass}
            ${bgClass}
            ${!isDisabled && !isMidRange && !(isStart || isEnd) ? 'active:scale-95' : ''}
          `}
          title={typeof disabledReason === 'string' ? disabledReason : undefined}
        >
          {i}
          {isToday && !(isStart || isEnd) && (
            <span className="absolute bottom-1 w-3 h-0.5 bg-gray-300 rounded-full" />
          )}
        </button>
      );
    }
    return days;
  };

  const changeMonth = (offset) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1));
  };

  return (
    <div className={`inline-flex flex-col bg-white border border-gray-300 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] w-[340px] overflow-hidden ${className}`}>
      
      {/* Header: Month / Year Navigation */}
      <div className="flex justify-between items-center bg-gray-50 p-3 px-4 border-b border-gray-200">
        <button 
          onClick={() => changeMonth(-1)}
          className="p-1.5 rounded-md hover:bg-gray-200 transition-colors text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
          type="button"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <span className="font-semibold text-[14px] text-gray-900 tracking-wide">
          {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </span>
        <button 
          onClick={() => changeMonth(1)}
          className="p-1.5 rounded-md hover:bg-gray-200 transition-colors text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
          type="button"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      {/* Presets */}
      {presets.length > 0 && (
        <div className="flex flex-wrap gap-2 p-3 px-4 border-b border-gray-100 bg-white">
          {presets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => {
                const presetRange = preset.getValue();
                setCurrentMonth(new Date(presetRange.start));
                if (onChange) onChange(presetRange, null);
              }}
              className="px-3 py-1.5 text-[11px] font-semibold rounded-md border border-gray-200 text-gray-600 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-200 active:scale-95 uppercase tracking-wider"
            >
              {preset.label}
            </button>
          ))}
        </div>
      )}

      {/* Calendar Grid */}
      <div className="p-4 bg-white">
        <div className="grid grid-cols-7 gap-x-0 mb-2">
          {DAYS.map(day => (
            <div key={day} className="flex items-center justify-center text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-y-1 gap-x-0" onMouseLeave={() => setHoverDate(null)}>
          {renderCalendar()}
        </div>
      </div>

      {/* Error Footer */}
      {errorMsg && (
        <div className="bg-gray-50 p-3 px-4 border-t border-gray-200 flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-600">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <span className="text-[12px] font-medium text-gray-700">{errorMsg}</span>
        </div>
      )}
    </div>
  );
};
