import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendOTP } from "../../../services/ApiServices";
import Loader from "../../../services/Loader";
import { useForm } from "react-hook-form";

export default function NewUser() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      localStorage.setItem("contact_number", JSON.stringify(data));
      setIsLoading(true);
      const response = await sendOTP(data);
      console.log("🚀 ~ OTP response:", response)
      setIsLoading(false);
      navigate("/verify-user");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <div>
      {isLoading && <Loader />}
      <div className="play-and-membership mt-3">
        <div className="container-fluid g-0">
          <div className="facilities-wrapper">
            <div className="facility-right two new-user-form">
              <div className="membership-form two">
                <div className="row">
                  <div className="col-lg-7">
                    <div className="title white two mt-5"><h2>You Are Just One Step Away!</h2></div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="row">
                        {/* <div className="col-md-12">
                          {errors.name && (
                            <span className="text-danger">
                              {errors.name.message}
                            </span>
                          )}
                          <input
                            type="text"
                            placeholder="Enter name.."
                            {...register("name", {
                              required: "Enter name..",
                            })}
                          />
                        </div> */}
                        <div className="col-md-12">
                          <input type="text" className="mb-0" placeholder="Enter Your Mobile Number."
                            {...register("contact_number", { required: "Enter contact number.", })} />
                          {errors.contact_number && (<span className="text-danger">{errors.contact_number.message}</span>)}
                        </div>
                        <div className="col-12">
                          <div className="button--wrap button--wrap-two mt-3">
                            <button className="eg-btn btn--primary golf-btn mx-auto" type="submit" style={{ zIndex: "auto" }}>
                              Send OTP
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="col-lg-5"><img src="assets/img/new-user-form.png" className="img-fluid" alt="" /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
