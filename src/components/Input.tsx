"use client";

import { ChangeEvent, useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

interface SelectOption {
  value: string | number;
  label: string;
}

interface InputProps {
  placeholder?: string;
  label?: string;
  handleChangeText: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  value: string | number;
  containerStyle?: string;
  inputStyle?: string;
  type: "text" | "select" | "password";
  options?: SelectOption[]; // Options for select input
  password?: boolean;
}

const Input = ({
  placeholder,
  label,
  handleChangeText,
  value,
  containerStyle = "",
  inputStyle = "",
  type,
  password = false,
  options = [],
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    handleChangeText(e);
  };

  return (
    <div className="input-container">
      {label && (
        <label className="block mb-2 text-sm md:font-semibold text-black">
          {label}
        </label>
      )}
      <div className={containerStyle}>
        {type === "text" ? (
          <div className="input_container rounded-[6px] h-[3rem] px-3 bg-[#D9D9D966] flex items-center justify-between">
            <input
              type={password && !showPassword ? "password" : "text"}
              name={label?.toLowerCase()} // Set the name attribute based on the label
              className={`outline-none placeholder:text-[14px] w-full bg-transparent border-none ${inputStyle}`}
              placeholder={placeholder}
              onChange={handleChange}
              value={value}
              {...props}
            />

            {password && (
              <div
                className="password_container cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <BsEyeSlashFill color="gray" />
                ) : (
                  <BsEyeFill color="gray" />
                )}
              </div>
            )}
          </div>
        ) : (
          <select
            className={`outline-none poppins-regular w-full border-none bg-transparent ${inputStyle}`}
            onChange={handleChange}
            value={value}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
};

export default Input;
