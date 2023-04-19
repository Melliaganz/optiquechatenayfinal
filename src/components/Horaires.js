import React from 'react'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StoreHours from './StoreHours';

function Horaires() {
  return (
    <div className='blocHoraires'>
                    <div className='blocHorairesTexte'>
                        <StoreHours />
                        <button className='bouttonHoraires'>
                            Voir les horaires
                        </button>
                    </div>
                </div>
  )
}

export default Horaires