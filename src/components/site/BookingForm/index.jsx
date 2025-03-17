import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSports, getCourts, getPrice } from "../../../services/ApiServices";
import Loader from "../../../services/Loader";
import { useForm } from "react-hook-form";

export default function BookingForm() {
  useEffect(() => {
    loadSports();
    loadCourts();
  }, []);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [sports, setSports] = useState(false);
  const [courts, setCourts] = useState();
  const [duration, setDuration] = useState(1);

  // const userAuth = () => !!JSON.parse(localStorage.getItem("BnBTurfUserLogin"));
  const userAuth = () => false;

  const loadSports = async () => {
    try {
      setIsLoading(true);
      const response = await getSports();
      setSports(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  const loadCourts = async () => {
    try {
      setIsLoading(true);
      const response = await getCourts();
      setCourts(response.data);
      setIsLoading(false);
      let id = localStorage.getItem("courtId");
      reset({ court_id: id });
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const manageDuration = (flag) => {
    if (flag === "D") {
      if (duration > 1) {
        setDuration(duration - 1);
      }
    } else {
      setDuration(duration + 1);
    }
  };

  const onSubmit = async (data) => {
    calculateEndTime(data);
    // getPrice code start
    const getPriceData = {
      BKStart_time: data.start_time + ':00',
      BKEnd_Time: data.end_time + ':00',
      CourtId: data.court_id
    }
    console.log("🚀 ~ file: index.jsx:70 ~ onSubmit ~ getPriceData:", getPriceData)
    const response = await getPrice(getPriceData).catch(console.error);
    console.log("🚀 ~ file: index.jsx:71 ~ onSubmit ~ response:", response)
    let finalTotalPrice = 0, baseTotalPrice = 0;
    for (let index = 0; index < response.data.length; index++) {
      finalTotalPrice += Number(response.data[index]['FinalPrice']);
      baseTotalPrice += Number(response.data[index]['BasePrice']);
    }
    console.log("🚀 ~ file: index.jsx:72 ~ onSubmit ~ baseTotalPrice:", baseTotalPrice)
    console.log("🚀 ~ file: index.jsx:72 ~ onSubmit ~ finalTotalPrice:", finalTotalPrice)
    if (finalTotalPrice !== 0 && baseTotalPrice !== 0) {
      const newData = { baseTotalPrice, finalTotalPrice, ...data }
      localStorage.setItem("BookingDetails", JSON.stringify(newData));
      userAuth() ? console.log(data) : navigate("/new-user");
    }
    // getPrice code end
  }

  const calculateEndTime = (data) => {
    // calculate end time code start
    // const [hours, minutes] = data.start_time.split(":");
    // const time = new Date();
    // time.setHours(parseInt(hours, 10) + duration);
    // time.setMinutes(parseInt(minutes, 10));
    // const newHours = time.getHours().toString().padStart(2, "0");
    // const newMinutes = time.getMinutes().toString().padStart(2, "0");
    // let endTime = `${newHours}:${newMinutes}`;
    // data.end_time = endTime;

    // const D = (J) => (J < 10 ? '0' : '') + J;
    // let newTime = duration + ':00';
    // let timeParts = newTime.split(":");
    // let minsToAdd = Number(timeParts[0]) * 60 + Number(timeParts[1]);
    // let piece = data.start_time.split(':');
    // let mins = piece[0] * 60 + +piece[1] + +minsToAdd;
    // let endTime = D(mins % (24 * 60) / 60 | 0) + ':' + D(mins % 60);
    // data.end_time = endTime;

    const D = (J) => (J < 10 ? '0' : '') + J;
    let timeParts = (duration + ':00').split(":");
    let piece = data.start_time.split(':');
    let mins = piece[0] * 60 + +piece[1] + +Number(timeParts[0]) * 60 + Number(timeParts[1]);
    data.end_time = D(mins % (24 * 60) / 60 | 0) + ':' + D(mins % 60);
    // calculate end time code end
  }

  return (
    <div>
      {isLoading && <Loader />}
      <div className="play-and-membership">
        <div className="container-fluid g-0">
          <div className="facilities-wrapper">
            <div className="facility-left two" style={{ zIndex: "auto" }}>
              <div className="facility-img two">
                <img src="assets/img/play-and-membership.jpg" alt='Booking' />
              </div>
              <div className="feature two">
                <div className="row g-4">
                  <div className="col-md-12">
                    <div className="single-feature py-5">
                      <i className="fas fa-cart-arrow-down fa-5x mb-4 text-light"></i>
                      <h2 className="text-light">Cart Is Empty</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="facility-right two b-form">
              <div className="membership-form two">
                <div className="title white two mt-5">
                  <h2>Book Your Slot Now!</h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="row mb-3">
                      <label className="col-sm-3 col-form-label text-white">Select Sport:</label>
                      <div className="col-sm-9">
                        {errors.sport_id && (<div className="text-danger">{errors.sport_id.message}</div>)}
                        <select {...register("sport_id", { required: true })} className="form-select mb-0 fw-bold">
                          {sports && sports.map((item, i) => <option key={i} value={item.id} className="fw-bold">{item.name}</option>)}
                        </select>
                      </div>
                      {errors.sport_id && <span className="text-danger fw-bold small">{errors.sport_id.message}</span>}
                    </div>
                    <div className="row mb-3">
                      <label className="col-sm-3 col-form-label text-white">Select Date:</label>
                      <div className="col-sm-9">
                        <input type="date" {...register("booking_date", { required: true })} className="mb-0 fw-bold" />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-sm-3 col-form-label text-white">Start Time:</label>
                      <div className="col-sm-9">
                        <input type="time" {...register("start_time", { required: true })} className="mb-0 fw-bold" />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-sm-3 col-form-label text-white">Duration:</label>
                      <div className="col-sm-9">
                        <i onClick={() => manageDuration("D")} className={duration > 1 ? "fas fa-minus mx-4" : "fas fa-minus mx-4 bg-dark"}></i>
                        <span>{duration} Hr</span>
                        <i onClick={() => manageDuration("I")} className="fas fa-plus mx-4"></i>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-sm-3 col-form-label text-white">Select Sport:</label>
                      <div className="col-sm-9">
                        <select {...register("court_id", { required: 'Select Turf' })} className="form-select mb-0 fw-bold">
                          {courts && courts.map((item, i) => <option key={i} className="fw-bold" value={item.id}>{item.court_name}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="button--wrap button--wrap-two mt-0">
                        <button className="eg-btn btn--primary golf-btn mx-auto fw-bold" type="submit" style={{ zIndex: "auto" }}>
                          Proceed
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
