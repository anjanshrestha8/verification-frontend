import Confetti from "react-confetti";
function Success() {
  return (
    <>
      <div className="success-wrapper">
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={80}
          friction={1}
          gravity={0.3}
        />
        <br />
        <br />
        <br />
        <br />

        <h3> Congratulation!Your code is valid.</h3>
      </div>
    </>
  );
}

export default Success;
