import React, { useState } from 'react';

export default function Dropdown({ options }) {
  const [selectValue, setSelectValue] = useState();

  const handleSelect = (event) => {
    const sel = event.target;
    const value = sel.options[sel.selectedIndex].text;
    setSelectValue(value);
  }

  return (
    <div>
      <select
        value={selectValue}
        onChange={handleSelect}
      >
        {options.map((option, index) => (
          <option
            key={index}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}


