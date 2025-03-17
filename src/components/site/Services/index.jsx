import React from 'react'
import { BreadCrumb } from '../../common/BreadCrumb'
import ServiceCards from '../ServiceCards'

export default function Services() {
  const servicesData = [
    { stitle: 'Snooker Table', imgPath: '/assets/img/services/snooker-table.png', descr: 'service description' },
    { stitle: 'Table Tennis', imgPath: '/assets/img/services/table-tennis.png', descr: 'service description' },
    { stitle: 'CCTV Surveillance', imgPath: '/assets/img/services/cctv.png', descr: 'service description' },
    { stitle: 'Drinking water', imgPath: '/assets/img/services/drinking-water.png', descr: 'service description' },
    { stitle: 'Changing Room', imgPath: '/assets/img/services/changing-room.png', descr: 'service description' },
    { stitle: 'Waiting Area', imgPath: '/assets/img/services/waiting-area.png', descr: 'service description' },
    { stitle: 'Car & Bike Parking', imgPath: '/assets/img/services/parking.png', descr: 'service description' },
    { stitle: 'Washrooms', imgPath: '/assets/img/services/washroom.png', descr: 'service description' },
  ]
  return (
    <div>
      <BreadCrumb name='Services & Facilities' />
      <div className="latest-blog grid sec-mar py-5 mt-0">
        <div className="container">
          <ServiceCards sData={servicesData} />
        </div>
      </div>

    </div>
  )
}
