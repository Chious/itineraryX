import * as React from 'react';
import EditTripModal from './EditTripModel';

export default function CardEditButtons({ id, setCount, itineraries, setItineraries}) {

  return (
    <EditTripModal sx={{color:'#38358C', fontFamily:'Poppins', fontWeight:500, fontSize:15}} text={'Edit'} itineraries={itineraries} setItineraries={setItineraries} setCount={setCount} id={id}/>
  );
}