import { Container, Navbar } from "react-bootstrap";

import NavList from "../Nav/NavList";
import NavLogo from "../Nav/NavLogo";

import classes from "./Header.module.scss";
import { useAuth } from "api/auth/auth.store";

const Header = () => {
  const { handleSignOut, isLogin, userData } = useAuth(null);

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
                  WELCOME: <a href="#logout" onClick={()=>{handleSignOut()}}>{userData?.displayName}</a>
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
