import { useState, useRef } from "react";
import "../assets/css/app.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const updateCode = (index, value, currentCode) => {
    return currentCode.map((char, i) => (i === index ? value : char));
  };

  const handleInputChange = (value, index) => {
    setCode((prevCode) => {
      const newCode = updateCode(index, value, prevCode);
      return newCode;
    });
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePasteData = (pastedData, index, currentCode) => {
    const updatedCode = [...currentCode];
    pastedData.slice(0, 6).forEach((char, i) => {
      if (i + index < updatedCode.length) {
        updatedCode[i + index] = char;
      }
    });
    return updatedCode;
  };

  const handlePaste = (e, index) => {
    const pastedData = e.clipboardData.getData("text").split("");
    setCode((prevCode) => handlePasteData(pastedData, index, prevCode));
    const lastIndex = Math.min(pastedData.length - 1 + index, code.length - 1);
    inputRefs.current[lastIndex]?.focus();
  };

  const verifyCode = async (reqCode) => {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: reqCode }),
    });
    return response.ok;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const reqCode = code.join("");
    const isValid = await verifyCode(reqCode);
    if (isValid) {
      navigate("/success");
    } else {
      toast.error("Invalid Verification code!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <div className="app-wrapper">
      <h1>Enter Verification Code</h1>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div>
            {code.map((item, index) => (
              <input
                key={index}
                autoFocus={index === 0}
                type="text"
                value={item}
                maxLength="1"
                onChange={(e) => handleInputChange(e.target.value, index)}
                onPaste={(e) => handlePaste(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
              />
            ))}
          </div>
          <br />
          <br />
          <div className="button-wrapper">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
}

export default App;
