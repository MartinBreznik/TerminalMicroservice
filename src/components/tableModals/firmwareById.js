import React, { useState, useEffect, useCallback, Fragment, useRef } from 'react';
const axios = require('axios');

 const FirmwareById = (props) => {
    const [firmwareId, setFirmwareId] = useState(0);
    const [firmware, setFirmware] = useState([]);
    const [isSending, setIsSending] = useState(false)
    const isMounted = useRef(true)

    const onChangeHandler = (event) => {
        setFirmwareId(event.target.value);
    } 
    /* check if data is mounted */
    useEffect(() => {
        return () => {
          isMounted.current = false
        }
      }, [])

      /* delay DOM update untill needed, triger it only on state change to optimize performance */
    const onClickHandler = useCallback(async () => {
        if (isSending) {
            setFirmware([]);
            return}
        setIsSending(true)
        let RequestUrl = `${props.api}/firmwares/${firmwareId}`;
        const res = await axios.get(RequestUrl, { headers: {"Authorization" : `Bearer ${props.secret}`}});
        var { data } = await res;
        data = data.data;
        data.isCritical = JSON.stringify(data.isCritical);
        data.isEnabled = JSON.stringify(data.isEnabled);
        var dataInHtml = Object.entries(data).map(([key, val]) => 
        <table key={key + 1}>
            <tbody>
                <tr key={key + 1}>
                    <td key={key + 1}>{key}: {val}</td>
                </tr>
            </tbody>
        </table>
    )
        setFirmware([dataInHtml]);
        // once the request is sent, update state again
        if (isMounted.current) // only update if we are still mounted
          setIsSending(false)
          //setFirmwareId([]);
      }, [isSending, firmwareId, props])
    
    return (
        <Fragment>
            <label htmlFor="id">Firmware id: </label> <br />
            <input type="number" name="id" id="id" onChange={onChangeHandler}/> <br />
            <button type="button" className="getById" onClick={onClickHandler}>Get firmware</button> 
            { firmware } <br />
        </Fragment>
          );
};
export default FirmwareById