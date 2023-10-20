import { Col, Container, Row } from "react-bootstrap";
import classes from "./login.module.scss";
import LoginContainer from "./loginContainer";

export default function Login() {
  return (
    <>
      <Container>
        <Row>
          <Col xs={6}>
            <div className={classes.textContainer}>
              <div className={classes.textOverlay}>
                <h2>Welcome</h2>
                <div>
                  <p>
                    ExpertPay allows employers to electronically submit child
                    support payments that they are required to withhold from
                    employees' paychecks.
                  </p>
                  <p>
                    With your ExpertPay<sup>SM</sup> account you can save and
                    maintain employee payment information for quick
                    transactions. You can also add multiple users to the
                    account, individually defining each user's authorization.
                  </p>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={6}>
            <LoginContainer />
          </Col>
        </Row>
      </Container>
    </>
  );
}
