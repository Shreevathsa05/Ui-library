import React, { useState, useEffect } from 'react';

/**
 * Example Usage:
 * 
 * import { ContextualDatePicker } from 'ui-library-spj';
 * import { useState } from 'react';
 * 
 * export default function App() {
 *   const [date, setDate] = useState(null);
 *   const [error, setError] = useState("");
 * 
 *   return (
 *     <div className="p-8 flex justify-center bg-gray-100 min-h-screen">
 *       <div className="flex flex-col items-center">
 *         <ContextualDatePicker
 *           value={date}
 *           onChange={(newDate, err) => {
 *             setDate(newDate);
 *             setError(err || "");
 *           }}
 *           disableBeforeToday={true}
 *           disableWeekends={true}
 *           presets={[
 *             {
 *               label: 'Today',
 *               getValue: () => new Date()
 *             },
 *             {
 *               label: 'Next Week',
 *               getValue: () => {
 *                 const d = new Date();
 *                 d.setDate(d.getDate() + 7);
 *                 return d;
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

export const ContextualDatePicker = ({
  value,
  onChange,
  disableBeforeToday = false,
  disableAfterToday = false,
  disableWeekends = false,
  disableHolidays = [],
  allowedDates = [],
  className = "",
  presets = []
}) => {
  const [currentMonth, setCurrentMonth] = useState(value ? new Date(value) : new Date());
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (value) {
      setCurrentMonth(new Date(value));
    }
  }, [value]);

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

    if (allowedDates.length > 0) {
      let isAllowed = false;
      if (allowedDates.includes('past') && isPast) isAllowed = true;
      if (allowedDates.includes('future') && isFuture) isAllowed = true;
      if (allowedDates.includes('weekends') && isWeekend) isAllowed = true;
      if (allowedDates.includes('weekdays') && !isWeekend) isAllowed = true;
      
      if (isAllowed && !isHoliday) return false;
      return "This date is outside allowed parameters.";
    }

    if (disableBeforeToday && isPast) return "Select a future date only.";
    if (disableAfterToday && isFuture) return "Select a past date only.";
    if (disableWeekends && isWeekend) return "Weekends are disabled.";
    if (isHoliday) return "This date is a disabled holiday.";

    return false;
  };

  const handleSelectDate = (date) => {
    const err = isDateDisabled(date);
    if (err) {
      setErrorMsg(typeof err === 'string' ? err : "Date not allowed");
      if (onChange) onChange(null, typeof err === 'string' ? err : "Date not allowed");
    } else {
      setErrorMsg("");
      if (onChange) onChange(date, null);
    }
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
      
      const isSelected = value && 
        date.getDate() === value.getDate() && 
        date.getMonth() === value.getMonth() && 
        date.getFullYear() === value.getFullYear();

      const isToday = new Date().toDateString() === date.toDateString();

      days.push(
        <button
          key={i}
          type="button"
          disabled={isDisabled}
          onClick={() => handleSelectDate(date)}
          className={`relative w-full h-9 flex items-center justify-center text-[13px] rounded-lg transition-all duration-200
            ${isDisabled ? 'text-gray-300 cursor-not-allowed' : 'cursor-pointer active:scale-95'}
            ${isSelected ? 'bg-gray-900 text-white font-medium shadow-sm' : ''}
            ${!isDisabled && !isSelected ? 'text-gray-700 hover:bg-gray-100 hover:text-black font-medium' : ''}
          `}
          title={typeof disabledReason === 'string' ? disabledReason : undefined}
        >
          {i}
          {isToday && !isSelected && (
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
                const presetDate = preset.getValue();
                setCurrentMonth(new Date(presetDate));
                handleSelectDate(presetDate);
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

        <div className="grid grid-cols-7 gap-y-1 gap-x-0">
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
