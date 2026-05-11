import React, { useMemo, useState } from "react";

const validators = {
  email: (value) => {
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
      return "Please enter a valid email address";
    }

    return null;
  },

  phone: (value) => {
    const phoneRegex =
      /^[6-9]\d{9}$/;

    if (!phoneRegex.test(value)) {
      return "Please enter a valid 10-digit phone number";
    }

    return null;
  },

  password: (value) => {
    if (value.length < 8) {
      return "Password must be at least 8 characters";
    }

    if (!/[A-Z]/.test(value)) {
      return "Password must contain an uppercase letter";
    }

    if (!/[a-z]/.test(value)) {
      return "Password must contain a lowercase letter";
    }

    if (!/[0-9]/.test(value)) {
      return "Password must contain a number";
    }

    return null;
  },
};

export default function SmartInput({
  label,
  placeholder,
  type = "text",

  value,
  onChange,

  validation,
  regex,
  customValidator,

  required = false,
  minLength,

  rows = 5,
  options = [],

  checked,
  radioValue,

  buttonText,

  // Custom Classes
  containerClassName = "",
  labelClassName = "",
  inputClassName = "",
  errorClassName = "",

  // Custom inner component classes for Select and Radio
  selectTriggerClassName = "",
  selectDropdownClassName = "",
  selectOptionClassName = "",
  radioBoxClassName = "",
  radioInnerClassName = "",
  radioTextClassName = "",
  checkboxBoxClassName = "",
  checkboxIconClassName = "",
  checkboxTextClassName = "",

  animated = true,
}) {
  const [touched, setTouched] =
    useState(false);

  const [focused, setFocused] =
    useState(false);

  const [isOpen, setIsOpen] =
    useState(false);

  const error = useMemo(() => {
    if (
      type === "checkbox" ||
      type === "radio" ||
      type === "submit" ||
      type === "file"
    ) {
      return null;
    }

    if (!touched) return null;

    if (
      required &&
      !String(value || "").trim()
    ) {
      return "This field is required";
    }

    if (
      minLength &&
      value?.length < minLength
    ) {
      return `Minimum ${minLength} characters required`;
    }

    if (!value) return null;

    switch (validation) {
      case "email":
        return validators.email(value);

      case "phone":
        return validators.phone(value);

      case "password":
        return validators.password(value);

      case "regex":
        if (
          regex &&
          !regex.test(value)
        ) {
          return "Invalid format";
        }

        return null;

      case "custom":
        return (
          customValidator?.(value) ||
          null
        );

      default:
        return null;
    }
  }, [
    touched,
    required,
    value,
    minLength,
    validation,
    regex,
    customValidator,
    type,
  ]);

  const commonProps = {
    onFocus: () => setFocused(true),

    onBlur: () => {
      setFocused(false);
      setTouched(true);
    },
  };

  const renderField = () => {
    switch (type) {
      case "textarea":
        return (
          <textarea
            rows={rows}
            value={value}
            placeholder={placeholder}
            onChange={(e) =>
              onChange(
                e.target.value
              )
            }
            {...commonProps}
            className={`
              smart-input resize-none
              ${
                error
                  ? "error"
                  : ""
              }
              ${inputClassName}
            `}
          />
        );

      case "select":
        const selectedOption = options.find((opt) => opt.value === value);
        return (
          <div 
            className={`smart-select-container ${isOpen ? 'open' : ''} ${inputClassName}`}
            tabIndex={0}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) {
                setIsOpen(false);
                setFocused(false);
                setTouched(true);
              }
            }}
            onFocus={() => setFocused(true)}
          >
            <div 
              className={`smart-input smart-select-trigger ${error ? "error" : ""} ${selectTriggerClassName}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className={selectedOption ? "" : "placeholder"}>
                {selectedOption ? selectedOption.label : (placeholder || "Select...")}
              </span>
              <svg className={`select-chevron ${isOpen ? 'open' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
            
            <div className={`smart-select-dropdown ${isOpen ? 'open' : ''} ${selectDropdownClassName}`}>
              {options.map((option) => (
                <div
                  key={option.value}
                  className={`smart-select-option ${value === option.value ? 'selected' : ''} ${selectOptionClassName}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                >
                  {option.label}
                  {value === option.value && (
                    <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case "checkbox":
        return (
          <label className={`smart-checkbox-label ${inputClassName}`}>
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => onChange(e.target.checked)}
              className="smart-checkbox-input"
            />
            <div className={`smart-checkbox-box ${checkboxBoxClassName}`}>
              <svg 
                className={`smart-checkbox-icon ${checkboxIconClassName}`} 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <span className={`smart-checkbox-text ${checkboxTextClassName}`}>
              {placeholder}
            </span>
          </label>
        );

      case "radio":
        return (
          <label className={`smart-radio-label ${inputClassName}`}>
            <input
              type="radio"
              checked={checked}
              onChange={() => onChange(radioValue)}
              className="smart-radio-input"
            />
            <div className={`smart-radio-box ${radioBoxClassName}`}>
              <div className={`smart-radio-inner ${radioInnerClassName}`}></div>
            </div>
            <span className={`smart-radio-text ${radioTextClassName}`}>
              {placeholder}
            </span>
          </label>
        );

      case "file":
        return (
          <input
            type="file"
            onChange={(e) =>
              onChange(
                e.target.files[0]
              )
            }
            className={`
              smart-input
              cursor-pointer

              ${inputClassName}
            `}
          />
        );

      case "date":
        return (
          <input
            type="date"
            value={value}
            onChange={(e) =>
              onChange(
                e.target.value
              )
            }
            {...commonProps}
            className={`
              smart-input
              ${inputClassName}
            `}
          />
        );

      case "submit":
        return (
          <button
            type="submit"
            className={`
              px-6 py-3
              rounded-xl

              bg-blue-500
              text-white
              font-medium

              hover:bg-blue-600

              transition-all
              duration-300

              ${inputClassName}
            `}
          >
            {buttonText ||
              "Submit"}
          </button>
        );

      default:
        return (
          <input
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={(e) =>
              onChange(
                e.target.value
              )
            }
            {...commonProps}
            className={`
              smart-input
              ${
                error
                  ? "error"
                  : ""
              }
              ${inputClassName}
            `}
          />
        );
    }
  };

  return (
    <>
      <style>
        {`
          .smart-input-wrapper {
            transition: all 0.25s ease;
          }

          .smart-input-wrapper.focused {
            transform: scale(1.01);
          }

          .smart-input {
            width: 100%;
            border-radius: 14px;
            border: 1px solid #d1d5db;
            padding: 12px 16px;
            outline: none;
            transition: all 0.3s ease;
            font-size: 14px;
          }

          .smart-input:focus {
            box-shadow:
              0 0 0 4px
              rgba(
                59,
                130,
                246,
                0.15
              );

            border-color: #3b82f6;
          }

          .smart-input.error {
            border-color: #ef4444;
            animation: shake 0.3s ease;
          }

          .smart-input.error:focus {
            box-shadow:
              0 0 0 4px
              rgba(
                239,
                68,
                68,
                0.15
              );

            border-color: #ef4444;
          }

          .smart-error {
            color: #ef4444;
            font-size: 13px;
            margin-top: 8px;
            animation:
              fadeSlide 0.25s ease;
          }

          .smart-label {
            display: block;
            margin-bottom: 8px;
            font-size: 14px;
            font-weight: 500;
            animation:
              fadeIn 0.3s ease;
          }

          @keyframes fadeSlide {
            from {
              opacity: 0;
              transform:
                translateY(-5px);
            }

            to {
              opacity: 1;
              transform:
                translateY(0);
            }
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }

            to {
              opacity: 1;
            }
          }

          @keyframes shake {
            0% {
              transform:
                translateX(0);
            }

            25% {
              transform:
                translateX(-4px);
            }

            50% {
              transform:
                translateX(4px);
            }

            75% {
              transform:
                translateX(-4px);
            }

            100% {
              transform:
                translateX(0);
            }
          }

          .smart-select-container {
            position: relative;
            outline: none;
            width: 100%;
          }
          .smart-select-trigger {
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
            user-select: none;
          }
          .smart-select-trigger .placeholder {
            color: #9ca3af;
          }
          .select-chevron {
            width: 18px;
            height: 18px;
            color: #6b7280;
            transition: transform 0.3s ease;
          }
          .select-chevron.open {
            transform: rotate(180deg);
          }
          .smart-select-dropdown {
            position: absolute;
            top: calc(100% + 8px);
            left: 0;
            right: 0;
            background: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px);
            transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
            z-index: 50;
            max-height: 250px;
            overflow-y: auto;
            padding: 8px;
          }
          .smart-select-dropdown.open {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
          }
          .smart-select-option {
            padding: 10px 14px;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.15s ease, color 0.15s ease;
            font-size: 14px;
            color: #374151;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .smart-select-option:hover {
            background-color: #f3f4f6;
            color: #111827;
          }
          .smart-select-option.selected {
            background-color: #eff6ff;
            color: #1d4ed8;
            font-weight: 500;
          }
          .smart-select-option .check-icon {
            width: 16px;
            height: 16px;
            color: #3b82f6;
          }

          .smart-radio-label {
            display: inline-flex;
            align-items: center;
            gap: 12px;
            cursor: pointer;
            position: relative;
            user-select: none;
            padding: 8px 12px;
            border-radius: 12px;
            transition: background-color 0.2s ease;
          }

          .smart-radio-label:hover {
            background-color: #f3f4f6;
          }

          .smart-radio-input {
            position: absolute;
            opacity: 0;
            cursor: pointer;
            height: 0;
            width: 0;
          }

          .smart-radio-box {
            position: relative;
            height: 22px;
            width: 22px;
            background-color: #fff;
            border: 2px solid #d1d5db;
            border-radius: 50%;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .smart-radio-inner {
            width: 10px;
            height: 10px;
            background-color: #3b82f6;
            border-radius: 50%;
            transform: scale(0);
            opacity: 0;
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          }

          .smart-radio-input:checked ~ .smart-radio-box {
            border-color: #3b82f6;
            background-color: #eff6ff;
            box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15);
          }

          .smart-radio-input:checked ~ .smart-radio-box .smart-radio-inner {
            transform: scale(1);
            opacity: 1;
          }

          .smart-radio-text {
            font-size: 15px;
            color: #374151;
            font-weight: 500;
            transition: color 0.2s ease;
          }

          .smart-radio-input:checked ~ .smart-radio-text {
            color: #1d4ed8;
            font-weight: 600;
          }

          .smart-radio-label:active .smart-radio-box {
            transform: scale(0.85);
          }

          .smart-checkbox-label {
            display: inline-flex;
            align-items: center;
            gap: 12px;
            cursor: pointer;
            position: relative;
            user-select: none;
            padding: 8px 12px;
            border-radius: 12px;
            transition: background-color 0.2s ease;
          }

          .smart-checkbox-label:hover {
            background-color: #f3f4f6;
          }

          .smart-checkbox-input {
            position: absolute;
            opacity: 0;
            cursor: pointer;
            height: 0;
            width: 0;
          }

          .smart-checkbox-box {
            position: relative;
            height: 24px;
            width: 24px;
            background-color: #fff;
            border: 2px solid #d1d5db;
            border-radius: 8px;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
          }

          .smart-checkbox-icon {
            width: 14px;
            height: 14px;
            color: #fff;
            stroke-dasharray: 30;
            stroke-dashoffset: 30;
            transition: stroke-dashoffset 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          }

          .smart-checkbox-input:checked ~ .smart-checkbox-box {
            border-color: #3b82f6;
            background-color: #3b82f6;
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
            animation: checkbox-pop 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .smart-checkbox-input:checked ~ .smart-checkbox-box .smart-checkbox-icon {
            stroke-dashoffset: 0;
          }

          .smart-checkbox-text {
            font-size: 15px;
            color: #374151;
            font-weight: 500;
            transition: color 0.2s ease;
          }

          .smart-checkbox-input:checked ~ .smart-checkbox-text {
            color: #1d4ed8;
            font-weight: 600;
          }

          .smart-checkbox-label:active .smart-checkbox-box {
            transform: scale(0.85);
          }

          @keyframes checkbox-pop {
            0% { transform: scale(1); }
            50% { transform: scale(1.15); }
            100% { transform: scale(1); }
          }
        `}
      </style>

      <div className={containerClassName}>
        {label &&
          type !== "checkbox" &&
          type !== "radio" &&
          type !== "submit" && (
            <label
              className={`
                smart-label
                ${labelClassName}
              `}
            >
              {label}
            </label>
          )}

        <div
          className={`
            smart-input-wrapper
            ${
              focused &&
              animated
                ? "focused"
                : ""
            }
          `}
        >
          {renderField()}
        </div>

        {error && (
          <p
            className={`
              smart-error
              ${errorClassName}
            `}
          >
            {error}
          </p>
        )}
      </div>
    </>
  );
}