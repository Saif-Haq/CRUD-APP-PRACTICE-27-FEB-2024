import React, { FC } from "react";
import "./Toggle.css";

interface ToggleProps {
  handleChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  isChecked: boolean;
}

export const Toggle: FC<ToggleProps> = ({ handleChange, isChecked }) => {
  return (
    <>
      <div className="toggle-container">
        <input
          type="checkbox"
          id="check"
          className="toggle"
          onChange={handleChange}
          checked={isChecked}
        />

        <label htmlFor="check">
          <i className="fas fa-moon"></i>
          <i className="fas fa-sun"></i>
        </label>

      </div>
    </>
  );
};