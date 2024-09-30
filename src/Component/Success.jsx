import Confetti from "react-confetti";
function Success() {
  return (
    <>
      <div className="success-wrapper">
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={50}
        />
        <h3> Congratulation!Your code is valid.</h3>
      </div>
    </>
  );
}

export default Success;
