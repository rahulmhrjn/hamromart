import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import styles from "../../styles/styles";
import { AiOutlineDelete } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { loadSeller } from "../../redux/actions/user";

const WithdrawMoney = () => {
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);
  const [open, setOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState();
  const [bankInfo, setBankInfo] = useState({
    bankName: "",
    bankSwiftCode: null,
    bankAccountHolder: "",
    bankAccountNumber: null,
    bankBranch: "",
  });

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const withdrawMethod = {
      bankName: bankInfo.bankName,
      bankSwiftCode: bankInfo.bankSwiftCode,
      bankAccountHolder: bankInfo.bankAccountHolder,
      bankAccountNumber: bankInfo.bankAccountNumber,
      bankBranch: bankInfo.bankBranch,
    };

    setPaymentMethod(false);

    await axios
      .put(
        `${server}/shop/update-payment-methods`,
        {
          withdrawMethod,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Withdraw method added successfully!");
        dispatch(loadSeller());
        setBankInfo({
          bankName: "",
          bankSwiftCode: null,
          bankAccountHolder: "",
          bankAccountNumber: null,
          bankBranch: "",
        });
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  const deleteHandler = async () => {
    await axios
      .delete(`${server}/shop/delete-withdraw-method`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success("Withdraw method deleted successfully!");
        dispatch(loadSeller());
      });
  };

  const error = () => {
    toast.error("You don't have enough balance to withdraw!");
  };

  const withdrawHandler = async () => {
    if (withdrawAmount < 10000 || withdrawAmount > availableBalance) {
      toast.error("You can't withdraw this amount!");
    } else {
      const amount = withdrawAmount;
      await axios
        .post(
          `${server}/withdraw/create-withdraw-request`,
          { amount },
          { withCredentials: true }
        )
        .then((res) => {
          toast.success("Withdraw amount request is successful!");
          setOpen(false);
        });
    }
  };

  const availableBalance = seller?.availableBalance.toFixed(2);

  return (
    <div className="w-full h-[90vh] p-8">
      <div className="w-full bg-white h-full rounded flex flex-col items-center justify-center">
        <h5 className="text-[20px] pb-4">
          Available Balance: Rs.{availableBalance}
        </h5>
        <div
          className={`${styles.button} text-white !h-[42px] !rounded`}
          onClick={() => (availableBalance < 10000 ? error() : setOpen(true))}
        >
          Withdraw
        </div>
      </div>
      {open && (
        <div className="w-full h-screen fixed top-0 left-0 flex items-center justify-center z-[9999] bg-[#0000004e]">
          <div
            className={`w-[95%] 800px:w-[50%] bg-white shadow rounded ${
              paymentMethod ? "h-[95vh] overflow-y-scroll" : "h-[unset"
            } min-h-[40vh] p-3`}
          >
            <div className="w-full flex justify-end">
              <RxCross2
                size={25}
                className="cursor-pointer"
                onClick={() => setOpen(false) || setPaymentMethod(false)}
              />
            </div>
            {paymentMethod ? (
              <div>
                <h3 className="text-[22px] font-Poppins text-center font-[500]">
                  Add New Withdraw Method:
                </h3>
                <form onSubmit={handleSubmit}>
                  <br />
                  <div>
                    <label>
                      Bank Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name=""
                      id=""
                      required
                      value={bankInfo.bankName}
                      onChange={(e) =>
                        setBankInfo({ ...bankInfo, bankName: e.target.value })
                      }
                      placeholder="Enter your bank name?"
                      className={`${styles.input} mt-2`}
                    />
                  </div>
                  <div className="pt-2">
                    <label>
                      Bank Swift Code<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name=""
                      id=""
                      required
                      value={bankInfo.bankSwiftCode}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankSwiftCode: e.target.value,
                        })
                      }
                      placeholder="Enter your bank swift code?"
                      className={`${styles.input} mt-2`}
                    />
                  </div>
                  <div className="pt-2">
                    <label>
                      Bank Account Holder<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name=""
                      id=""
                      required
                      value={bankInfo.bankAccountHolder}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankAccountHolder: e.target.value,
                        })
                      }
                      placeholder="Enter your bank account name?"
                      className={`${styles.input} mt-2`}
                    />
                  </div>
                  <div className="pt-2">
                    <label>
                      Bank Account Number<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name=""
                      id=""
                      required
                      value={bankInfo.bankAccountNumber}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankAccountNumber: e.target.value,
                        })
                      }
                      placeholder="Enter your bank account number?"
                      className={`${styles.input} mt-2`}
                    />
                  </div>
                  <div className="pt-2">
                    <label>
                      Bank Branch<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name=""
                      id=""
                      required
                      value={bankInfo.bankBranch}
                      onChange={(e) =>
                        setBankInfo({ ...bankInfo, bankBranch: e.target.value })
                      }
                      placeholder="Enter your bank branch address?"
                      className={`${styles.input} mt-2`}
                    />
                  </div>
                  <button
                    type="submit"
                    className={`${styles.button} mb-2 text-white !rounded`}
                  >
                    Add
                  </button>
                </form>
              </div>
            ) : (
              <>
                <h3 className="text-[22px] font-Poppins">
                  Available Withdraw Methods:
                </h3>
                {seller && seller?.withdrawMethod ? (
                  <div>
                    <div className="w-full 800px:flex items-center justify-between">
                      <div className="800px:w-[50%]">
                        <h5>Bank Name: {seller?.withdrawMethod.bankName}</h5>
                        <h5>
                          Account Number:{" "}
                          {"*".repeat(
                            seller?.withdrawMethod.bankAccountNumber.length - 3
                          ) +
                            seller?.withdrawMethod.bankAccountNumber.slice(-3)}
                        </h5>
                      </div>
                      <div className="800px:w-[50%]">
                        <AiOutlineDelete
                          size={25}
                          className="cursor-pointer"
                          onClick={() => deleteHandler()}
                        />
                      </div>
                    </div>
                    <br />
                    <h4>Available Balance: Rs.{availableBalance}</h4>
                    <br />
                    <div className="w-full 800px:flex items-center">
                      <input
                        type="number"
                        placeholder="Amount..."
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        className="800px:w-[120px] w-full border 800px:mr-5 p-3 rounded"
                      />
                      <div
                        className={`${styles.button} text-white !rounded`}
                        onClick={withdrawHandler}
                      >
                        Withdraw
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-[18px] pt-2">
                      No Payment Methods Available!
                    </p>
                    <div className="w-full flex items-center">
                      <div
                        className={`${styles.button} text-[#fff] text-[18px] mt-4 !rounded`}
                        onClick={() => setPaymentMethod(true)}
                      >
                        Add New
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WithdrawMoney;
