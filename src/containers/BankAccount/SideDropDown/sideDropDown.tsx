/*
 * Side Drop Down Menu
 */
import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

import { useBanks } from "api/bank/bank.store";
import classes from "./sideDropDown.module.scss";
import Confirm from "components/UI/Confirm/Confirm";

const BankPropToggle = React.forwardRef((props: any, ref: React.LegacyRef<HTMLButtonElement>) => {
  const { onClick, children, active } = props;
  const getActive = () => {
    return active ? classes.active : "";
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    onClick(e);
  };

  return (
    <button
      ref={ref}
      onClick={handleClick}
      className={classes.menuToggle + " " + getActive()}
    >
      {children}
    </button>
  );
});

const SideDropDown = (props: any) => {
  const [isShow, setShow] = useState(false);
  const { keyItem, bankItem } = props;

  const { delBank, verifyBank } = useBanks({});

  const handleToggle = (isOpen:boolean) => {
    setShow(isOpen);
  };

  const isVerified = bankItem && bankItem.verified;

  return (
    <Dropdown
      onToggle={handleToggle}
      className={classes.sideMenu}
      id={`dropdown${Math.random()}`}
    >
      <Dropdown.Toggle as={BankPropToggle} active={isShow}>
        <FontAwesomeIcon icon={faEllipsisV} color="#666666" />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {!isVerified ? (
          <Dropdown.Item
            onClick={() => {
              verifyBank(keyItem);
            }}
          >
            <span className={classes.danger}>!&nbsp;</span>Verify
          </Dropdown.Item>
        ) : null}

        <Confirm
          title="Delete action confirmation"
          description={
            <>
              There is no recurring payment associated with this bank account.
              Are you sure to delete this bank account?
            </>
          }
        >
          {(confirm:Function) => (
            <Dropdown.Item onClick={(e) => confirm(() => delBank(keyItem), e)}>
              Delete
            </Dropdown.Item>
          )}
        </Confirm>

        <Dropdown.Item href="#/action-4">Make a Payment</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
export default SideDropDown;
