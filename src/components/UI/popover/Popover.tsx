import React from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";

import classes from "./Popover.module.scss";

interface Tooltip {
  title: string,
  content: React.ReactFragment
}

interface PopoverProps {
  tooltip: Tooltip,
  isValid: boolean
}

const Popoverbox = (props:PopoverProps) => {
  const { tooltip, isValid = true } = props;
  const tooltipClass = [classes.infoBtn, isValid ? null : classes.isValid].join(
    " "
  );

  return (
    <>
      <OverlayTrigger
        trigger={["hover", "focus"]}
        placement="right"
        overlay={
          <Popover id={"tooltip-" + tooltip.title}>
            <Popover.Header as="h3">{tooltip.title}</Popover.Header>
            <Popover.Body>{tooltip.content}</Popover.Body>
          </Popover>
        }
      >
        <button className={tooltipClass} type="button"></button>
      </OverlayTrigger>
    </>
  );
};

export default Popoverbox;
