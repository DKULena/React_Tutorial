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
  const [pwdFocus, setPwdFocus] = useState(false);

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

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Register</h1>
      <form>
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
            onChange={(e)=> setUser(e.target.value)}
            required
            aria-invalid = {validName ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={()=>setUserFocus(true)}
            onBlur={()=>setUserFocus(false)}
        />
        <p
            id="uidnote"
            className={userFocus && user && !validName ? "instructions" : "offscreen"}
        >
            <FontAwesomeIcon icon={faInfoCircle} /> <br />
            * to 24 characters. <br />
            * Must begin with a letter. <br />
            * Letters, numbers, underscores, hyphens allowed.
        </p>
      </form>
    </section>
  );
};

export default Register;
