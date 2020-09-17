import React, {
    useState,
    useEffect,
    useCallback,
    useRef
} from 'react';
import axios from 'axios';

const UpdateTerminalUpdate = (props) => {
    const [firmwareId, setFirmwareId] = useState(0);
    const [terminalId, setTerminalId] = useState(0);
    const [updateStatus, setUpdateStatus] = useState(0);
    const [updateNotes, setUpdateNotes] = useState('');
    const [changedByUser, setChangedByUser] = useState(0);
    const [isSending, setIsSending] = useState(false)
    const isMounted = useRef(true)

    const onChangeHandler = (event) => {
        if (event.target.name === 'firmwareId') {
            setFirmwareId(event.target.value);
        } else if (event.target.name === 'updateTerminalId') {
            setTerminalId(event.target.value);
        } else if (event.target.name === 'status') {
            setUpdateStatus(event.target.value);
        } else if (event.target.name === 'updateNotes') {
            setUpdateNotes(event.target.value);
        } else if (event.target.name === 'changedByUserId') {
            setChangedByUser(event.target.name);
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
        const payload = {
            firmwareId: parseInt(firmwareId, 10),
            terminalId: parseInt(terminalId, 10),
            status: parseInt(updateStatus, 10),
            notes: updateNotes,
            changedByUserId: parseInt(changedByUser, 10)
        };
        let RequestUrl = `${props.api}/firmwares/${firmwareId}/terminal-updates/${terminalId}`;

        const axiosOptions = {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${props.secret}`
            }
        }
        const res = await axios.put(RequestUrl, payload, axiosOptions)
        var { data } = await res;
        console.log(data);
/*         var alertDisplay = JSON.stringify(data.data);
        window.alert(alertDisplay); */

        if (isMounted.current) 
            setIsSending(false)
        //setFirmwareId([]);
    }, [isSending, props, firmwareId, terminalId, updateStatus, updateNotes, changedByUser ])

    return (
        <section id="modal-wrap">
        <div className="wrapContainer" style={{ color: 'black' }}>
        <label htmlFor="firmwareId">Firmware ID: </label> <br />
        <input type="number" name="firmwareId" id="firmwareId" onChange={onChangeHandler}/> <br />
        <label htmlFor="updateTerminalId">TerminalId: </label> <br />
        <input type="number" name="updateTerminalId" id="updateTerminalId" onChange={onChangeHandler}/> <br />
        <label htmlFor="status">status: </label> <br />
        <input type="number" name="status" id="status" onChange={onChangeHandler}/> <br />
        <label htmlFor="updateNotes">New notes: </label> <br />
        <input type="text" name="updateNotes" id="updateNotes" onChange={onChangeHandler} required/> <br />
        <label htmlFor="changedByUserId">changed by user: </label> <br />
        <input type="number" name="changedByUserId" id="changedByUserId" onChange={onChangeHandler} required/> <br />
        

        <button type="button" className="firmwareUpload" onClick={onClickHandler}>Upload</button> 
        </div>
        </section>  
    );
};
export default UpdateTerminalUpdate