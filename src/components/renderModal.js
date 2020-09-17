import React from 'react';
import FirmwareById from './tableModals/firmwareById';

 const BuildModal = (props) => {
     
    return (
      <section id="wrap" data-testid="callModal">
        <div className="modalContainer" data-testid="callModalDiv" style={{ color: 'black' }}>
        <FirmwareById secret={props.secret} api={props.secret} />
        </div>
        </section>                
          );
        };
export default BuildModal