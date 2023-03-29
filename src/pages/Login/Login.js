import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faUser,
  faXmark,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);

function Login() {
  const [showLogin, setShowLogin] = useState(false);
  const [switchLogin, setSwitchLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [validateEmail, setValidateEmail] = useState("");
  const [validatePassword, setValidatePassword] = useState("");

  // animation loading
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  // handle show element logon
  const handleShowLogin = () => {
    setShowLogin(!showLogin);
  };

  // handle switch login and register
  const handleSwitchLogin = () => {
    setSwitchLogin(!switchLogin);
  };

  // handle login
  const navigate = useNavigate();

  const handleOnLogin = () => {
    const mailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const passwordValidate = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (
      mailFormat.test(validateEmail) &&
      passwordValidate.test(validatePassword)
    ) {
      navigate("/main");
    }
  };

  return (
    <div className={cx("main-wrapper")}>
      {loading ? (
        <div className={cx("loading")}>
          <FontAwesomeIcon className={cx("icon-loading")} icon={faSpinner} />
          <p className={cx("text-loading")}>Loading</p>
        </div>
      ) : (
        <div className={cx("content")}>
          {/* header */}
          <header className={cx("header")}>
            <h2 className={cx("logo")}>Todo App</h2>
            <nav className={cx("navbar")}>
              <p>Home</p>
              <p>About</p>
              <p>Services</p>
              <p>Contact</p>
              <button className={cx("btnLogin")} onClick={handleShowLogin}>
                Login
              </button>
            </nav>
          </header>

          {/* form */}
          <div className={cx("text-started", { "active-popup": showLogin })}>
            <p>Click the login button and enter your email to get started</p>
          </div>

          <div
            className={cx("wrapper", {
              active: switchLogin,
              "active-popup": showLogin,
            })}
          >
            <span className={cx("icon-close")} onClick={handleShowLogin}>
              <FontAwesomeIcon icon={faXmark} />
            </span>

            {/* Login */}
            <div className={cx("form-box", "login")}>
              <h2>Login</h2>

              <form action="#">
                <div className={cx("input-box")}>
                  <span className={cx("icon")}>
                    {<FontAwesomeIcon icon={faEnvelope} />}
                  </span>
                  <input
                    value={validateEmail}
                    type="text"
                    required
                    onChange={(e) => setValidateEmail(e.target.value)}
                  />
                  <label>Email</label>
                </div>

                <div className={cx("input-box")}>
                  <span className={cx("icon")}>
                    <FontAwesomeIcon icon={faLock} />
                  </span>
                  <input
                    type="password"
                    required
                    onChange={(e) => setValidatePassword(e.target.value)}
                  />
                  <label>Password</label>
                </div>

                <div className={cx("remenber-forgot")}>
                  <label>
                    <input type="checkbox" />
                    Remember me
                  </label>
                  <span>Forgot password ?</span>
                </div>

                <button
                  // type="submit"
                  className={cx("btn")}
                  onClick={handleOnLogin}
                >
                  Login
                </button>

                <div className={cx("login-register")}>
                  <p>
                    Don't have an account ?
                    <span
                      className={cx("register-link")}
                      onClick={handleSwitchLogin}
                    >
                      Register
                    </span>
                  </p>
                </div>
              </form>
            </div>

            {/* Register */}
            <div className={cx("form-box", "register")}>
              <h2>Registration</h2>

              <form action="#">
                <div className={cx("input-box")}>
                  <span className={cx("icon")}>
                    <FontAwesomeIcon icon={faUser} />
                  </span>
                  <input type="text" required />
                  <label>User name</label>
                </div>

                <div className={cx("input-box")}>
                  <span className={cx("icon")}>
                    <FontAwesomeIcon icon={faEnvelope} />
                  </span>
                  <input type="text" required />
                  <label>Email</label>
                </div>

                <div className={cx("input-box")}>
                  <span className={cx("icon")}>
                    <FontAwesomeIcon icon={faLock} />
                  </span>
                  <input type="password" required />
                  <label>Password</label>
                </div>

                <div className={cx("remenber-forgot")}>
                  <label>
                    <input type="checkbox" />I agree to the terms & conditions
                  </label>
                </div>

                <button type="submit" className={cx("btn")}>
                  Register
                </button>

                <div className={cx("login-register")}>
                  <p>
                    Already have an account ?
                    <span
                      className={cx("login-link")}
                      onClick={handleSwitchLogin}
                    >
                      Login
                    </span>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
