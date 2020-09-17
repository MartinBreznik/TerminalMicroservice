import React from 'react';
import './renderTable.css'
import CallTable from './tableComponents/tableCalls'

 const BuildTable = (props) => {
    return (
      <section className="wrap" data-testid="callTable">
        <div className="tableContainer" data-testid="callTableDiv" style={{ color: 'black' }}>
        <CallTable secret={props.secret} api={props.api} />
        </div>
        </section>                
          );
        };
export default BuildTable