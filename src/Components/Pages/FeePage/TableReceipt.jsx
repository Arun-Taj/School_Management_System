import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { parseJSON } from "date-fns";
import { useNavigate } from "react-router-dom";
function TableReceipt({
  searchQuery,
  filterOption,
  student_for_receipt,
  receiptNo,
  date,
  get_new_receipt_no,
}) {
  const [studentInfo, setStudentInfo] = useState([]);
  const { api } = useContext(AuthContext);

  const [months, setMonths] = useState([]);
  const [feePerMonth, setFeePerMonth] = useState(0);
  const [concessionPercent, setConcessionPercent] = useState(0);
  const [paymentMode, setPaymentMode] = useState("Cash");
  const [remarks, setRemarks] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getMonths = async () => {
      try {
        const response = await api.get("/get_months/");
        if (response.data.length < 12) {
          alert("Please ask the administrator to add months");
          navigate("/fees/feeReport");
        }
        setMonths(response.data);
      } catch (error) {
        console.error("Error fetching months:", error);
      }
    };
    getMonths();
  }, []);

  useEffect(() => {
    let temp = [];
    Object.entries(student_for_receipt).forEach(([key, value]) => {
      if (
        key === "id" ||
        key === "monthly_fee" ||
        key === "old_fees" ||
        key === "paid_months"
      )
        return;

      temp.push({ label: key.replace("_", " "), value: value });
    });

    setStudentInfo(temp);
    setFeePerMonth(student_for_receipt.monthly_fee);
    setOldBalance(student_for_receipt.old_fees);
    // console.log(student_for_receipt);

    const temp_months = months.filter(
      (month) =>
        !student_for_receipt.paid_months.some(
          (paid_month) => paid_month.id == month.id
        )
    );
    setMonths(temp_months);
  }, [student_for_receipt]);

  const [selectedMonths, setSelectedMonths] = useState([]);
  const [admissionFee, setAdmissionFee] = useState(1500);
  const [registrationFee, setRegistrationFee] = useState(1000);
  const [fine, setFine] = useState(0);
  const [transportFee, setTransportFee] = useState(250);
  const [lateFee, setLateFee] = useState(100);

  const [oldBalance, setOldBalance] = useState(0);
  const [deposit, setDeposit] = useState(0);

  const handleMonthSelection = (month) => {
    setSelectedMonths((prevSelectedMonths) =>
      prevSelectedMonths.includes(month)
        ? prevSelectedMonths.filter((m) => m !== month)
        : [...prevSelectedMonths, month]
    );
  };

  const totalFees =
    selectedMonths.length > 0
      ? selectedMonths.length * feePerMonth +
        admissionFee +
        registrationFee +
        fine +
        transportFee +
        lateFee +
        oldBalance
      : 0;

  const concessionAmount = (totalFees * concessionPercent) / 100;
  const netFees = totalFees - concessionAmount;
  const balanceAmount = netFees - deposit;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmSubmit = window.confirm(
      "Are you sure you want to create the receipt."
    );
    if (confirmSubmit) {
      try {
        const receiptData = {
          receipt_no: receiptNo,
          receipt_date: date.toISOString().split("T")[0],
          student: student_for_receipt.id,
          months: selectedMonths,
          admission_fees: admissionFee,
          registration_fees: registrationFee,
          fines: fine,
          transport_fees: transportFee,
          late_fees: lateFee,
          old_fees: oldBalance,
          deposit_fees: parseInt(deposit),
          total_fees: totalFees,
          concession_percentage: parseFloat(concessionPercent),
          concession_amount: concessionAmount,
          net_fees: netFees,
          remaining_fees: balanceAmount,
          payment_mode: paymentMode,
          remarks: remarks,
        };

        if (receiptData.deposit_fees > receiptData.net_fees) {
          alert("Deposit fees is more than net fees. Just pay net fees");
          return;
        }
        const response = await api.post("/create_receipt/", receiptData);
        console.log(response.data);
        alert(response.data.message);

        navigate("/fees/feeReport");
        //reset
        get_new_receipt_no();
        setSelectedMonths([]);
        setAdmissionFee(1500);
        setRegistrationFee(1000);
        setFine(0);
        setTransportFee(250);
        setLateFee(100);
        setDeposit(0);
        setPaymentMode("Cash");
        setRemarks("");
      } catch (error) {
        console.error("Error adding receipt:", error);
      }
    }
  };

  return (
    <div className="bg-pink-100">
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="grid grid-cols-2 gap-4">
          {Object.keys(student_for_receipt).length > 0 ? (
            studentInfo ? (
              studentInfo.map((info, index) => (
                <div key={index} className="text-center">
                  <p className="font-bold">{info.label}</p>
                  <div className="bg-gray-200 p-2 rounded-3xl border border-gray-300">
                    <p>{info.value}</p>
                  </div>
                </div>
              ))
            ) : (
              <div>loading...</div>
            )
          ) : (
            <div className="flex justify-center items-center text-gray-600 text-center col-span-2">
              Please Select a student using enrollment ID
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4">
          <h2 className="col-span-3 text-center font-bold">Months</h2>
          <div className="col-span-3 p-6 bg-white rounded-lg">
            <div className="overflow-x-auto">
              <div className="flex mt-4" style={{ minWidth: "800px" }}>
                {months.map((month, index) => (
                  <div key={index} className="p-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={selectedMonths.includes(month.id)}
                        value={month.id}
                        onChange={() => handleMonthSelection(month.id)}
                      />
                      {month.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="bg-white py-4 rounded-lg shadow-md">
          <table className="w-full text-center">
            <thead>
              <tr>
                <th className="text-center py-2">Sl No.</th>
                <th className="text-center py-2">Fee Head</th>
                <th className="text-center py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-[#BCA8EA]">
                <td className="py-2">01</td>
                <td className="py-2">Monthly Fee</td>
                <td className="py-2">{selectedMonths.length * feePerMonth}</td>
              </tr>
              <tr className="bg-[#E3D6FF]">
                <td className="py-2">02</td>
                <td className="py-2">Admission Fee</td>
                <td className="py-2">
                  <input
                    type="number"
                    value={admissionFee}
                    onChange={(e) =>
                      setAdmissionFee(parseInt(e.target.value) || 0)
                    }
                    className="text-center bg-white rounded-3xl focus:outline-none"
                  />
                </td>
              </tr>
              <tr className="bg-[#BCA8EA]">
                <td className="py-2">03</td>
                <td className="py-2">Registration Fee</td>
                <td className="py-2">
                  <input
                    type="number"
                    value={registrationFee}
                    onChange={(e) =>
                      setRegistrationFee(parseInt(e.target.value) || 0)
                    }
                    className="text-center bg-white rounded-3xl focus:outline-none"
                  />
                </td>
              </tr>
              <tr className="bg-[#E3D6FF]">
                <td className="py-2">04</td>
                <td className="py-2">Fine</td>
                <td className="py-2">
                  <input
                    type="number"
                    value={fine}
                    onChange={(e) => setFine(parseInt(e.target.value) || 0)}
                    className="text-center bg-white rounded-3xl focus:outline-none"
                  />
                </td>
              </tr>
              <tr className="bg-[#BCA8EA]">
                <td className="py-2">05</td>
                <td className="py-2">Transport Fee</td>
                <td className="py-2">
                  <input
                    type="number"
                    value={transportFee}
                    onChange={(e) =>
                      setTransportFee(parseInt(e.target.value) || 0)
                    }
                    className="text-center bg-white rounded-3xl focus:outline-none"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="bg-white py-4 rounded-lg shadow-md">
          <table className="w-full text-center">
            <thead>
              <tr>
                <th className="text-center py-2">Sl No.</th>
                <th className="text-center py-2">Fee Head</th>
                <th className="text-center py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-[#E3D6FF]">
                <td className="py-2">06</td>
                <td className="py-2">Old Balance</td>
                <td className="py-2">{oldBalance}</td>
              </tr>
              <tr className="bg-[#BCA8EA]">
                <td className="py-2">07</td>
                <td className="py-2">Late Fee</td>
                <td className="py-2">
                  <input
                    type="number"
                    value={lateFee}
                    onChange={(e) => setLateFee(parseInt(e.target.value) || 0)}
                    className="text-center bg-white rounded-3xl focus:outline-none"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-4 mb-8">
        <div className="text-center">
          <p className="text-sm">Total Fees</p>
          <div className="col-span-1 bg-gray-200 p-2 rounded-3xl text-center border border-gray-400">
            <p className="text-sm">{totalFees}</p>
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm">Concession (%)</p>
          <div className="col-span-1 bg-gray-200 p-2 rounded-3xl text-center border border-gray-400">
            {/* <p className="text-sm">{concessionPercent}</p> */}
            <input
              className="text-center bg-white rounded-3xl w-full focus:outline-none"
              type="number"
              value={concessionPercent}
              onChange={(e) => setConcessionPercent(e.target.value)}
            />
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm">Concession (Amount)</p>
          <div className="col-span-1 bg-gray-200 p-2 rounded-3xl text-center border border-gray-400">
            <p className="text-sm">{concessionAmount}</p>
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm">Net Fees</p>
          <div className="col-span-1 bg-gray-200 p-2 rounded-3xl text-center border border-gray-400">
            <p className="text-sm">{netFees}</p>
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm">Deposit</p>
          <div className="col-span-1 bg-gray-200 p-2 rounded-3xl text-center border border-gray-400">
            <input
              className="text-center bg-white rounded-3xl w-full focus:outline-none"
              type="number"
              value={deposit}
              onChange={(e) => setDeposit(e.target.value)}
            />
          </div>
        </div>
        <div className="col-span-2 text-center text-sm">
          <p>Payment Mode</p>
          <select
            className="bg-white p-2 rounded-3xl w-full border border-gray-400"
            value={paymentMode}
            onChange={(e) => setPaymentMode(e.target.value)}
          >
            <option value="cash">Cash</option>
            <option value="card">Card</option>
            <option value="online">Online</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-6 gap-4 items-center mb-4">
        <div className="col-span-4">
          <p className="text-center">Remarks</p>
          <input
            type="text"
            placeholder="Remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            className="w-full p-2 rounded-full border border-gray-300 focus:outline-none"
          />
        </div>
        <div className="col-span-1">
          <p className="text-center">Balance Amount</p>
          <div className="bg-gray-200 p-2 rounded-full text-center border border-gray-400">
            <p className="font-bold">{balanceAmount}</p>
          </div>
        </div>
        <div className="col-span-1 mt-4">
          <button
            className="bg-pink-500 text-white py-2 px-8 rounded-full hover:bg-pink-600"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default TableReceipt;
