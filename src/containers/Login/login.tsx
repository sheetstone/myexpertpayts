import classes from "./login.module.scss";
import LoginContainer from "./loginContainer";

export default function Login() {
  return (
    <>
      <div className="container mx-auto">
        <div className="gap-8 columns-2">
          <div className={classes.textContainer+" w-full relative"}>
            <div className={classes.textOverlay}>
              <h2>Welcome</h2>
              <div>
                <p>
                  ExpertPay allows employers to electronically submit child
                  support payments that they are required to withhold from
                  employees' paychecks.
                </p>
                <p className="text-3xl font-bold underline">
                  With your ExpertPay<sup>SM</sup> account you can save and
                  maintain employee payment information for quick transactions.
                  You can also add multiple users to the account, individually
                  defining each user's authorization.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full">
            <LoginContainer />
          </div>
        </div>
      </div>
    </>
  );
}
