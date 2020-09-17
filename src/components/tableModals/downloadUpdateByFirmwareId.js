import React, {
  useState,
  useEffect,
  useCallback,
  Fragment,
  useRef
} from 'react';
const axios = require('axios');

const UpdateDataByFirmwareId = (props) => {
  const [firmwareId, setFirmwareId] = useState(0);
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
      setFirmwareId([]);
      return
    }

    const axiosOptions = {
      responseType: 'arraybuffer',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${props.secret}`
      }
    }

    setIsSending(true)
    let RequestUrl = `${props.api}/firmwares/${firmwareId}/data/update`;
    const res = await axios.get(RequestUrl, axiosOptions);
    var {
      data
    } = await res;

    const blob = new Blob([data], {
      type: 'application/zip'
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'firmwareUpdate.zip');
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(url);
    link.remove();

    // once the request is sent, update state again
    if (isMounted.current) // only update if we are still mounted
      setIsSending(false)

  }, [isSending, firmwareId, props])

  return ( 
    <Fragment>
      <label htmlFor = "initialId" > Firmware ID: </label> <br/>
      <input type = "number" name = "id" id = "initialId" onChange = {onChangeHandler} /> <br/>
      <button type = "button" className = "getById" onClick = {onClickHandler} > Download firmware update </button>  
      </Fragment>
);
};
export default UpdateDataByFirmwareId