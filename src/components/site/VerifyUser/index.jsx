import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendOTP, createAccount } from "../../../services/ApiServices";
import Loader from "../../../services/Loader";
import { useForm } from "react-hook-form";
import { invalidContactOrOTP, toastTimeStamp } from "../../../constants/ResponseConstants";
import ToastPopup from '../../modals/ToastPopup';

export default function VerifyUser() {

  // Toast State Start
  const [showToast, setShowToast] = useState(false);
  const [tMessage, setTMessage] = useState();
  const [tVariant, setTVariant] = useState();
  // Toast State End

  useEffect(() => {
    window.scrollTo(0, 0);
    setMinutes(0);
    setSeconds(30);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const savedData = JSON.parse(localStorage.getItem("contact_number"));
      const values = { contact_number: savedData.contact_number, inputOTP: data.otp };
      const response = await createAccount(values);
      localStorage.setItem('loggedInUser', response.data[0].id);
      setIsLoading(false);

      if (response.message === invalidContactOrOTP) {
        // Toast Start
        setShowToast(true);
        setTMessage('<b>' + invalidContactOrOTP + '</b>.');
        setTVariant('danger');
        setTimeout(() => setShowToast(false), toastTimeStamp);
        // Toast End
      } else {
        navigate("/booking-summary");
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const resendOtp = async () => {
    try {
      var data = JSON.parse(localStorage.getItem("contact_number"));
      setIsLoading(true);
      var response = await sendOTP(data);
      setMinutes(0);
      setSeconds(30);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <div>
      {isLoading && <Loader />}
      {showToast && <ToastPopup isShow={showToast} variant={tVariant} message={tMessage} />}
      <div className="play-and-membership mt-3">
        <div className="container-fluid g-0">
          <div className="facilities-wrapper">
            <div className="facility-right two new-user-form">
              <div className="membership-form two">
                <div className="row">
                  <div className="col-lg-7">
                    <div className="title white two mt-5">
                      <h2>Verify OTP</h2>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="row">
                        <div className="col-md-12">
                          <input type="text" className="mb-0" placeholder="Enter OTP." {...register("otp", { required: "Enter OTP", })} />
                          {errors.contact_number && (<span className="text-danger">{errors.contact_number.message}</span>)}
                        </div>
                        <div className="col-md-12 mt-3 text-white">
                          {seconds > 0 || minutes > 0 ? (
                            <span>Time Remaining:{" "}{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
                          ) : (
                            <span className="d-flex">
                              Didn't recieve code?
                              <p role="button" className="mb-0 fw-bold text-light ms-2" onClick={resendOtp}>{" "}Resend OTP</p>
                            </span>
                          )}
                        </div>
                        <div className="col-12">
                          <div className="button--wrap button--wrap-two mt-3 me-3">
                            <button className="eg-btn btn--primary golf-btn mx-auto" type="submit" style={{ zIndex: "auto" }}>Verify OTP</button>
                          </div>
                          {/* <div className="button--wrap button--wrap-two mt-0">
                            <button
                              disabled={seconds > 0 || minutes > 0}
                              className="eg-btn btn--primary golf-btn mx-auto"
                              type="submit"
                              style={{ zIndex: "auto" }}
                            >
                              Resend OTP
                            </button>
                          </div> */}
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="col-lg-5">
                    <img src="assets/img/new-user-form.png" className="img-fluid" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
