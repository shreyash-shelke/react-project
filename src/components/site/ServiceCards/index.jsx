import React from 'react'
import ServicesModal from '../ServicesModal';

export default function ServiceCards(props) {
  const sData = props.sData;
  return (
    <div>
      <div className="row g-4">
        {sData.map((item) => (
          <div className="col-md-6 col-lg-4">
            <div className="single-post">
              <div className="post-thumbnail">
                <a href="/"><img src={`${item.imgPath}`} alt='BnBTurf' /></a>
              </div>
              <div className="news-cnt">
                <h3><a href="/">{item.stitle}</a></h3>
                <div className="button--wrap button--wrap-two">
                  <button className="eg-btn btn--primary golf-btn mx-auto" type='button' data-bs-toggle="modal" data-bs-target="#serviceModal" style={{ 'zIndex': 'auto' }}>Read More</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ServicesModal />
    </div>
  )
}
