import React, { useState, ChangeEvent } from 'react';

const MultiSelectComponent = () => {
  const [selectedOptions, setSelectedOptions] = useState<any>([]);

  const handleOptionChange = (event:ChangeEvent<HTMLSelectElement>) => {
    const selectedValues = Array.from(event.currentTarget.value);
    setSelectedOptions(selectedValues);
  };

  return (
    <select multiple value={selectedOptions} onChange={handleOptionChange}>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
      <option value="option4">Option 4</option>
    </select>
  );
};

export default MultiSelectComponent;