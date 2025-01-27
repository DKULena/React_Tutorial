import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PW_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pw, setPw] = useState("");
  const [validPw, setValidPw] = useState(false);
  const [pwFocus, setPwFocus] = useState(false);

  const [matchPw, setMatchPw] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    // test() : 문자열이 정규식 패턴과 일치하는지 검사-boolean 값 반환
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PW_REGEX.test(pw);
    console.log(result);
    console.log(pw);
    setValidPw(result);
    const match = pw === matchPw;
    setValidMatch(match);
  }, [pw, matchPw]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pw, matchPw]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PW_REGEX.test(pw);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    console.log(user, pw);
    setSuccess(true);
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <a href="#">Sign In</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">
              Username:
              <span className={validName ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validName || !user ? "hide" : "invalide"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p
              id="uidnote"
              className={
                userFocus && user && !validName ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} /> <br />
              * to 24 characters. <br />
              * Must begin with a letter. <br />* Letters, numbers, underscores,
              hyphens allowed.
            </p>

            <label htmlFor="password">
              Password:
              <span className={validPw ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validPw || !pw ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPw(e.target.value)}
              required
              aria-invalid={validPw ? "false" : "true"}
              aria-describedby="pwnote"
              onFocus={() => setPwFocus(true)}
              onBlur={() => setPwFocus(false)}
            />
            <p
              id="pwnote"
              className={pwFocus && !validPw ? "instructions" : "offscreen"}
            >
              <FontAwesomeIcon icon={faInfoCircle} /> <br />
              * 8 to 24 characters. <br />
              * Must include uppercase and lowercase letters, a number and a
              special character. <br />
              Allowed special chracters:
              <span aria-label="excalmation mark">!</span>
              <span aria-label="at symbol">@</span>
              <span aria-label="hashtag">#</span>
              <span aria-label="dollar sign">$</span>
              <span aria-label="percent">%</span>
            </p>

            <label htmlFor="confrim-pw">
              Confirm Password:
              <span className={validMatch && matchPw ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validMatch || !matchPw ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="password"
              onChange={(e) => setMatchPw(e.target.value)}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p
              id="confirmnote"
              className={
                matchFocus && !validMatch ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.
            </p>

            <button
              disabled={!validName || !validPw || !validMatch ? true : false}
            >
              Sign Up
            </button>
          </form>

          <p>
            Already registered? <br />
            {/* put router link here */}
            <a href="#">Sign In</a>
          </p>
        </section>
      )}
    </>
  );
};

export default Register;
