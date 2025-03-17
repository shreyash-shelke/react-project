import React from 'react'

export default function ServicesModal() {
  return (
    <div>
      <div className="modal fade" id="serviceModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Services</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body p-0">
              <div className="single-information">
                <div className="row">
                  <img src="/assets/img/services/snooker-table.png" alt="" />
                  <h5 className='mt-4'>Snooker Table</h5>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis eum natus nesciunt libero dolorum magni molestiae doloremque quisquam, pariatur eius, similique maiores? Odio, nam in temporibus eos magnam quos vel.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
