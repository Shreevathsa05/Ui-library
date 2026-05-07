import React, { useState } from 'react';
import { inputStyle, labelStyle } from './authStyles';

export const InputField = ({ id, label, type = 'text', placeholder, value, onChange }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      {label && <label htmlFor={id} style={labelStyle}>{label}</label>}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          ...inputStyle,
          borderColor: focused ? '#111' : '#d1d5db',
          boxShadow: focused ? '0 0 0 3px rgba(0,0,0,0.06)' : 'none',
        }}
        autoComplete="off"
      />
    </div>
  );
};
