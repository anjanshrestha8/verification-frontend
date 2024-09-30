import { useState, useRef } from "react";
import "../assets/css/app.css";
import { useNavigate } from "react-router-dom";
function App() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [message, setMessage] = useState("");
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const handleChange = (value, index) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData("text").slice(0, 6).split("");
    const newCode = [...code];
    pastedData.forEach((char, i) => {
      if (i < newCode.length) {
        newCode[i] = char;
      }
    });
    setCode(newCode);
    const lastIndex = Math.min(pastedData.length - 1, newCode.length - 1);
    inputRefs.current[lastIndex]?.focus();
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const reqCode = code.join("");
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: reqCode }),
    });
    if (response.ok) {
      navigate("/success");
    } else {
      setMessage("Verification failed. Please try again.");
    }
  };

  return (
    <>
      <h1>Enter Verification Code</h1>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div onPaste={handlePaste}>
            {code.map((item, index) => {
              return (
                <input
                  key={index}
                  type="text"
                  value={item}
                  maxLength="1"
                  onChange={(event) => handleChange(event.target.value, index)}
                  ref={(el) => (inputRefs.current[index] = el)}
                />
              );
            })}
          </div>
          <br />
          <br />
          <div className="button-wrapper">
            {" "}
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      <p className="message">
        Error Message: <span>{message}</span>
      </p>
    </>
  );
}

export default App;
