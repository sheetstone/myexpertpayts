import { useState, useRef, FocusEvent } from "react";
import PropTypes from "prop-types";

import Calendar from "react-calendar";
import Icon from "components/Icons";
import moment from "moment";
import classes from "./datePicker.module.scss";
import "react-calendar/dist/Calendar.css";

const DatePicker = (props: {
  name: string;
  label: string;
  id: string;
  value: string;
  onValueChange: Function;
}) => {
  const { name, label, id, value, onValueChange } = props;
  const [date, setDate] = useState(new Date(value));
  const [showCalendar, setShowCalendar] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const onChange = (newDate: any) => {
    setDate(newDate);
    onValueChange(newDate, name);
    setShowCalendar(false);
  };

  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (!e?.currentTarget?.parentElement?.contains(e.relatedTarget)) {
      setShowCalendar(false);
    }
  };

  const onFocus = () => {
    setShowCalendar(true);
  };
  const ToggleCalendar = () => {
    if (!showCalendar) {
      inputRef?.current?.focus();
    } else {
      setShowCalendar(false);
    }
  };

  return (
    <div
      className={`${classes.calendarGroup} ${
        showCalendar ? classes.bringUp : ""
      }`}
    >
      <label htmlFor={id} className={classes.calendarlabel}>
        {label}
      </label>
      <input
        value={moment(date).format("MM-DD-YYYY")}
        className={classes.datepickerinput}
        id={id}
        name={name}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        ref={inputRef}
      />
      <Calendar
        onChange={onChange}
        value={moment(date).format("MM-DD-YYYY")}
        className={showCalendar ? classes.calendar : classes.hide}
      />
      <button onClick={ToggleCalendar} className={classes.calendarIconBtn}>
        <Icon name="calendar" className={classes.calendarIcon} />
      </button>
    </div>
  );
};

DatePicker.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  onValueChange: PropTypes.func,
};

export default DatePicker;
