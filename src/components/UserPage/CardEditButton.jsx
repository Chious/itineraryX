import * as React from 'react';
import EditTripModal from './EditTripModel';

export default function CardEditButtons({ id }) {

  return (
    <EditTripModal sx={{color:'#38358C', fontFamily:'Poppins', fontWeight:500, fontSize:15}} text={'Edit'} id={id}/>
  );
}