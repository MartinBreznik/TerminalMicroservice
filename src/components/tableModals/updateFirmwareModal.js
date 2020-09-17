import React, {
    useState,
    useEffect,
    useCallback,
    useRef
} from 'react';
import axios from 'axios';

const UpdateFirmware = (props) => {
    const [firmwareId, setFirmwareId] = useState(0);
    const [updateName, setUpdateName] = useState({
        name: ''
    });
    const [updateDescription, setUpdateDescription] = useState({
        description: ''
    });
    const [updateVersion, setUpdateVersion] = useState(0);
    const [updateEnabled, setUpdateEnabled] = useState({
        isEnabled: false
    });
    const [updateCritical, setUpdateCritical] = useState({
        isCritical: false
    });
    const [isSending, setIsSending] = useState(false)
    const isMounted = useRef(true)

    const onChangeHandler = (event) => {
        if (event.target.name === 'firmwareId') {
            setFirmwareId(event.target.value);
        } else if (event.target.name === 'updateName') {
            setUpdateName({
                name: event.target.value,
            });
        } else if (event.target.name === 'updateDescription') {
            setUpdateDescription({
                description: event.target.value,
            });
        } else if (event.target.name === 'version') {
            setUpdateVersion(event.target.value);
        } else if (event.target.name === 'isEnabled') {
            setUpdateEnabled({
                isEnabled: event.target.value,
            });
        } else if (event.target.name === 'isCritical') {
            setUpdateCritical({
                isCritical: event.target.value,
            });
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
            id: parseInt(firmwareId, 10),
            isEnabled: updateEnabled.isEnabled,
            version: parseInt(updateVersion, 10),
            isCritical: updateCritical.isCritical,
            name: updateName.name,
            description: updateDescription.description
        };

        let RequestUrl = `${props.api}/firmwares/${firmwareId}`;

        const axiosOptions = {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${props.secret}`
            }
        }
        const res = await axios.put(RequestUrl, payload, axiosOptions)
        var { data } = await res;

        var alertDisplay = JSON.stringify(data.data);
        window.alert(alertDisplay);

        if (isMounted.current) 
            setIsSending(false)
        //setFirmwareId([]);
    }, [isSending, firmwareId, props, updateVersion, updateCritical, updateEnabled, updateName, updateDescription])

    return (
        <section id="modal-wrap">
        <div className="wrapContainer" style={{ color: 'black' }}>
        <label htmlFor="firmwareId">Firmware ID: </label> <br />
        <input type="number" name="firmwareId" id="firmwareId" onChange={onChangeHandler}/> <br />
        <label htmlFor="updateName">Name: </label> <br />
        <input type="text" name="updateName" id="updateName" onChange={onChangeHandler}/> <br />
        <label htmlFor="updateDescription">Description: </label> <br />
        <input type="text" name="updateDescription" id="updateDescription" onChange={onChangeHandler}/> <br />
        <label htmlFor="version">Version: </label> <br />
        <input type="number" name="version" id="version" onChange={onChangeHandler} required/> <br />
        <label htmlFor="isEnabled">Is the update enabled: </label> <br />
        <select name="isEnabled" id="isEnabled" onChange={onChangeHandler}>
          <option value="false">False</option>
          <option value="true">True</option>
        </select> <br />
        <label htmlFor="isCritical">Is the update critical: </label> <br />
        <select name="isCritical" id="isCritical"onChange={onChangeHandler}>
          <option value="false">False</option>
          <option value="true">True</option>
        </select> <br />
        <button type="button" className="firmwareUpload" onClick={onClickHandler}>Upload</button> 
        </div>
        </section>  
    );
};
export default UpdateFirmware