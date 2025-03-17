import React from 'react'
import { BreadCrumb } from '../../common/BreadCrumb';
import { EMAIL_ADDRESS, MOBILE_ONE, MOBILE_TWO, TURF_ADDRESS } from '../../../constants/DataConstants';

export default function ContactUs() {
  return (<>
    <div>
      <BreadCrumb name='Contact Us' />
      <div className="contact-area sec-mar">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-5 col-xl-5">
              <div className="office-information">
                <h2>Talk To With Our Best Consultant.</h2>
                <div className="single-information">
                  <div className="bg-shape">
                    <img src="/assets/img/info-shape.png" alt='BnBTurf' />
                  </div>
                  <div className="icon">
                    <i><img src="/assets/img/icons/location.png" alt='BnBTurf' /></i>
                  </div>
                  <div className="info-cnt">
                    <h6>Location</h6>
                    <p>{TURF_ADDRESS}</p>
                  </div>
                </div>
                <div className="single-information">
                  <div className="bg-shape">
                    <img src="/assets/img/info-shape.png" alt='BnBTurf' />
                  </div>
                  <div className="icon">
                    <i><img src="/assets/img/icons/mobile.png" alt='BnBTurf' /></i>
                  </div>
                  <div className="info-cnt">
                    <h6>Phone</h6>
                    <a href="tel:12025550140">{MOBILE_ONE}</a>
                    <a href="tel:12025550150">{MOBILE_TWO}</a>
                  </div>
                </div>
                <div className="single-information">
                  <div className="bg-shape">
                    <img src="/assets/img/info-shape.png" alt='BnBTurf' />
                  </div>
                  <div className="icon">
                    <i><img src="/assets/img/icons/envelope.png" alt='BnBTurf' /></i>
                  </div>
                  <div className="info-cnt">
                    <h6>Email</h6>
                    <a href="https://demo-egenslab.b-cdn.net/cdn-cgi/l/email-protection#eb82858d84ab8c868a8287c5888486"><span
                      className="__cf_email__" data-cfemail="523b3c343d12353f333b3e7c313d3f">{EMAIL_ADDRESS}</span></a>
                    {/* <a href="https://demo-egenslab.b-cdn.net/cdn-cgi/l/email-protection#4c25222a230c3f393c3c233e38622f2321"><span
                      className="__cf_email__"
                      data-cfemail="076e69616847747277776875732964686a">[email&#160;protected]</span></a> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-7 col-xl-7">
              <div className="contact-form">
                <h3>Write A Message</h3>
                <form action="#" method="post">
                  <input type="text" name="name" placeholder="Your Full Name" />
                  <input type="email" name="email" placeholder="Your Email" />
                  <input type="text" name="phone" placeholder="Your Phone" />
                  <input type="text" name="subject" placeholder="Subject" />
                  <textarea name="message" cols="30" rows="10" placeholder="Write Message"></textarea>
                  <div className="button--wrap">
                    <button type="submit" className="eg-btn btn--primary golf-btn mx-auto" style={{ 'zIndex': 'auto' }}>Submit Now <i
                      className="bi bi-arrow-right"></i></button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="google-map">
        <div className="container-fluid g-0">
          <div className="map">
            <div className="row g-0">
              <div className="col">
                <iframe title='Map'
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d455500.20527088636!2d75.19959032023928!3d26.884594416311536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4adf4c57e281%3A0xce1c63a0cf22e09!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1691682694684!5m2!1sen!2sin"></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
}