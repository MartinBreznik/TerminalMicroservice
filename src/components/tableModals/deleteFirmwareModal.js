import React, {
    useState,
    useEffect,
    useCallback,
    useRef
} from 'react';
import axios from 'axios';

const DeleteFirmware = (props) => {
    const [firmwareId, setFirmwareId] = useState(0);
    const [isSending, setIsSending] = useState(false)
    const isMounted = useRef(true)

    const onChangeHandler = (event) => {
        if (event.target.name === 'deleteId') {
            setFirmwareId(event.target.value);
        }
    }
    useEffect(() => {
        return () => {
            isMounted.current = false
        }
    }, [])

    const onClickHandler = useCallback(async (event) => {

        if (isSending)
            return
        setIsSending(true)

        let RequestUrl = `${props.api}/firmwares/${firmwareId}`;
        const axiosOptions = {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${props.secret}`
            }
        }
        const res = await axios.delete(RequestUrl, axiosOptions)
        var { status } = await res;
        if(status === 200) window.alert("Deleted successfully")
        console.log();
        /* uncomment for debuging server response
        var alertDisplay = JSON.stringify(data);
        window.alert(alertDisplay);
        	*/
        if (isMounted.current) 
            setIsSending(false)
        //setFirmwareId([]);
    }, [isSending, firmwareId, props])

    return (
        <section id="modal-wrap">
        <div className="wrapContainer" style={{ color: 'black' }}>
        <label htmlFor="deleteId">Firmware ID: </label> <br />
        <input type="number" name="deleteId" id="deleteId" onChange={onChangeHandler}/> <br />
        <button type="button" className="firmwareUpload" onClick={onClickHandler}>Delete firmware</button> 
        </div>
        </section>  
    );
};
export default DeleteFirmware