import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DetailTagihan from "./DetailTagihan";
import PaymentMethod from "./PaymentMethod";
import QRIS from "./QRIS";
import VirtualAccount from "./VirtualAccount";
import EWallet from "./EWallet";
import BankTransfer from "./BankTransfer";
import PaymentStatus from "./PaymentStatus";
import Stepper from "./Stepper";

import "./UKT.css";

function UKT() {
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState(null);
  const navigate = useNavigate();

  const next = () => setStep((s) => s + 1);

  // Back untuk step selain 1 → mundur step biasa
  const backStep = () => setStep((s) => (s > 1 ? s - 1 : 1));

  // Back khusus untuk step 1 → langsung ke menu pembayaran
  const backToMenu = () => navigate("/pembayaran");

  return (
    <div className="ukt_container fadeSlide">
      <Stepper step={step} />

      {/* Step 1: Detail Tagihan */}
      {step === 1 && (
        <DetailTagihan
          type="ukt"
          onNext={next}
          onBack={backToMenu} // tombol kembali langsung ke PaymentMenu
        />
      )}

      {/* Step 2: Pilih Metode Pembayaran */}
      {step === 2 && (
        <PaymentMethod
          onSelect={(m) => {
            setMethod(m);
            next();
          }}
          onBack={backStep} // tombol kembali mundur step
        />
      )}

      {/* Step 3: Pilihan pembayaran sesuai metode */}
      {step === 3 && method === "qris" && <QRIS onNext={next} onBack={backStep} />}
      {step === 3 && method === "va" && <VirtualAccount onNext={next} onBack={backStep} />}
      {step === 3 && method === "ewallet" && <EWallet onNext={next} onBack={backStep} />}
      {step === 3 && method === "bank" && <BankTransfer onNext={next} onBack={backStep} />}

      {/* Step 4: Status pembayaran */}
      {step === 4 && <PaymentStatus onBack={backStep} />}
    </div>
  );
}

export default UKT;
