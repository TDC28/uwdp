import { useState } from "react";

export const Term = () => {
  const [inputFields, setInputFields] = useState([{ value: "" }]);

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const values = [...inputFields];

    values[index].value = event.target.value;
    setInputFields(values);
  };

  const handleAddField = () => {
    setInputFields([...inputFields, { value: "" }]);
  };

  const handleRemoveField = (index: number) => {
    const values = [...inputFields];

    values.splice(index, 1);
    setInputFields(values);
  };

  return (
    <div>
      {inputFields.map((input, index) => (
        <div key={index}>
          <input
            type="text"
            value={input.value}
            onChange={(event) => handleInputChange(index, event)}
          />
          <button onClick={() => handleRemoveField(index)}>Remove</button>
          <button onClick={() => handleAddField()}>Add</button>
        </div>
      ))}
    </div>
  );
};
