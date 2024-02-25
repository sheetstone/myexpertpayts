import classes from "./login.module.scss";
import LoginContainer from "./loginContainer";

export default function Login() {
  return (
    <>
      <div className={classes.heroBanner}>
        <div className="container mx-auto">
          <div className="gap-8 columns-2 flex items-center justify-center">
            <div className={classes.textContainer}>
              <div className={classes.textOverlay}>
                <div>
                  <p className={classes.paper+" "+classes.stickyNotes1}>
                    ExpertPay allows employers to electronically submit child
                    support payments that they are required to withhold from
                    employees' paychecks.
                  </p>
                  <p className={classes.paper+" "+classes.stickyNotes2}>
                    With your ExpertPay<sup>SM</sup> account you can save and
                    maintain employee payment information for quick
                    transactions. 
                  </p>
                  <p className={classes.paper+" "+classes.stickyNotes3}>
                  You can also add multiple users to the
                    account, individually defining each user's authorization.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full">
              <LoginContainer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
