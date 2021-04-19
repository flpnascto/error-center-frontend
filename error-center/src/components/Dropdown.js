import { render } from '@testing-library/react';
import React, { useState } from 'react';

export default function Dropdown({ options }) {
  const [selectValue, setSelectValue] = useState();

  console.log('options', options)

  const handleSelect = (event) => {
    const sel = event.target;
    const value = sel.options[sel.selectedIndex].text;
    console.log('select value', value)
  }

  render(
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


