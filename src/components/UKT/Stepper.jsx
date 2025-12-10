import "./Stepper.css";

function Stepper({ step }) {
  const steps = ["Detail", "Metode", "Bayar", "Status"];

  return (
    <div className="stepper_container">
      {steps.map((label, index) => {
        const active = step === index + 1;
        const done = step > index + 1;

        return (
          <div
            key={index}
            className={`stepper_item ${active ? "active" : ""} ${done ? "done" : ""}`}
          >
            <div className="stepper_circle">{index + 1}</div>
            <span>{label}</span>
          </div>
        );
      })}
    </div>
  );
}

export default Stepper;
