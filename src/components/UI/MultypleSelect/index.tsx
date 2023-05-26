import { useState, ChangeEvent } from "react";
import { Dropdown, Form } from "react-bootstrap";
import classes from "./MultypleSelect.module.scss";

const MultiSelectComponent = (props: { entries: [string, number][] }) => {
  const [selectedOptions, setSelectedOptions] = useState<any>([]);
  const { entries } = props;

  const handleOptionChange = (event: ChangeEvent<Element>, value: number) => {
    if (selectedOptions.includes(value)) {
      //setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      //setSelectedOptions([...selectedOptions, option]);
    }
  };

  const filteredEntries = entries.filter((entry) => {
    return typeof entry[1] === "number" ? entry : null;
  });

  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        Select Options
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Form>
          {filteredEntries.map(([key, value]: [string, number]) => {
            return (
              <label key={key} className={classes.checkboxline}>
                <input
                  className={classes.checkbox}
                  type="checkbox"
                  value={value}
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
