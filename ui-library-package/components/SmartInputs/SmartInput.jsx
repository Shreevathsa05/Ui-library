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

  animated = true,
}) {
  const [touched, setTouched] =
    useState(false);

  const [focused, setFocused] =
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
        return (
          <select
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
          >
            {options.map(
              (option) => (
                <option
                  key={option.value}
                  value={
                    option.value
                  }
                >
                  {option.label}
                </option>
              )
            )}
          </select>
        );

      case "checkbox":
        return (
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) =>
                onChange(
                  e.target.checked
                )
              }
              className={`
                w-5 h-5
                accent-blue-500

                ${inputClassName}
              `}
            />

            <span>
              {placeholder}
            </span>
          </label>
        );

      case "radio":
        return (
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              checked={checked}
              onChange={() =>
                onChange(
                  radioValue
                )
              }
              className={`
                w-5 h-5
                accent-blue-500

                ${inputClassName}
              `}
            />

            <span>
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