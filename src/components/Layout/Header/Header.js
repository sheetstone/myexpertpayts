import { Container, Navbar } from "react-bootstrap";

import NavList from "../Nav/NavList";
import NavLogo from "../Nav/NavLogo";

import classes from "./Header.module.scss";
import { useAuth } from "api/auth/auth.store";

const Header = (props) => {
  const { isLogin } = useAuth();
  return (
    <header className={classes.Header}>
      <Container>
        <Navbar className={classes.Navbar}>
          <NavLogo />

          {isLogin && (
            <>
              <NavList />

              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text className={classes.Navtext}>
                  WELCOME: <a href="#logout">John Joe</a>
                </Navbar.Text>
              </Navbar.Collapse>
            </>
          )}
        </Navbar>
      </Container>
    </header>
  );
};

export default Header;
