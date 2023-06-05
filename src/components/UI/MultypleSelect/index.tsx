import { useState, ChangeEvent } from "react";
import { Dropdown, Form } from "react-bootstrap";
import classes from "./MultypleSelect.module.scss";

const MultiSelectComponent = (props: { entries: [string, number][], emitValue: Function}) => {
  const { entries, emitValue } = props; // define the list to display in the dropdown
  const [selectedOptions, setSelectedOptions] = useState<number[]>(
    entries.map((entry) => entry[1])
  ); // define the selected options

  const handleOptionChange = (event: ChangeEvent<Element>, value: number) => {
    const newValue =selectedOptions.includes(value)? selectedOptions.filter((item) => item !== value):[value, ...selectedOptions];
    setSelectedOptions(newValue);
    emitValue(newValue);
  };
  const handleSelectAll = () => {
    const newValue= entries.map((entry) => entry[1]);
    setSelectedOptions(newValue);
    emitValue(newValue);
  };

  const handleUnselectAll = () => {
    setSelectedOptions([]);
    emitValue([]);
  };

  const filteredEntries = entries.filter((entry) => {
    return typeof entry[1] === "number" ? entry : null;
  });

  return (
    <Dropdown autoClose="outside" className={classes.dropdown}>
      <Dropdown.Toggle
        id="multiply-select"
        className={classes.toggle}
        variant="outline-primary"
      >
        Select Options
      </Dropdown.Toggle>

      <Dropdown.Menu className={classes.menu}>
        <Form>
          <span className={classes.link} onClick={handleSelectAll}>
            Check All
          </span>{" "}
          |{" "}
          <span className={classes.link} onClick={handleUnselectAll}>
            Uncheck All
          </span>
          {filteredEntries.map(([key, value]: [string, number]) => {
            return (
              <label key={key} className={classes.checkboxline}>
                <input
                  className={classes.checkbox}
                  type="checkbox"
                  value={value}
                  checked={selectedOptions.includes(value)}
                  onChange={(e: ChangeEvent) => handleOptionChange(e, value)}
                />
                {key}
              </label>
            );
          })}
        </Form>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default MultiSelectComponent;
