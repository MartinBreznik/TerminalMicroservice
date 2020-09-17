import React, {
    useState,
    useEffect,
    useCallback,
    useRef
} from 'react';
import axios from 'axios';

const UpdateFirmwareData = (props) => {
    const [firmwareId, setFirmwareId] = useState(0);
    const [initialFirmwareFile, setInitialFirmwareFile] = useState({selectedFile: null});
    const [updateFirmwareFile, setUpdateFirmwareFile] = useState({selectedFile: null});
    const [isSending, setIsSending] = useState(false)
    const isMounted = useRef(true)

    const onChangeHandler = (event) => {
        if (event.target.name === 'firmwareId') {
            setFirmwareId(event.target.value);
        } 
        else if(event.target.name === 'updateInitialFile'){
            setInitialFirmwareFile({
               selectedFile: event.target.files[0],
           });
         }
           else if(event.target.name === 'updateUpdateFile'){
            setUpdateFirmwareFile({
             selectedFile: event.target.files[0],
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

        const payload = new FormData() 
        const toAppend = {
            initialData: initialFirmwareFile.selectedFile,
            updateData: updateFirmwareFile.selectedFile
        }
        console.log("init: ", toAppend.initialData, "udate: ", toAppend.updateData);
        for(const key in toAppend){
            payload.append(key, toAppend[key]);
        }

        let RequestUrl = `${props.api}/firmwares/${firmwareId}/data`;

        const axiosOptions = {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${props.secret}`
            }
        }
        console.log(typeof(payload));
        const res = await axios.put(RequestUrl, payload, axiosOptions)
        var { data } = await res;
        console.log(data);
        if (isMounted.current) 
            setIsSending(false)
        //setFirmwareId([]);
    }, [isSending, firmwareId, props, initialFirmwareFile, updateFirmwareFile])

    return (
        <section id="modal-wrap">
        <div className="wrapContainer" style={{ color: 'black' }}>
        <label htmlFor="firmwareId">Firmware ID: </label> <br />
        <input type="number" name="firmwareId" id="firmwareId" onChange={onChangeHandler}/> <br />
        <label htmlFor="updateInitialFile">Select initial data: </label> <br />
        <input type="file" name="updateInitialFile" id="updateInitialFile" onChange={onChangeHandler}/> <br />
        <label htmlFor="updateUpdateFile">Select update data: </label> <br />
        <input type="file" name="updateUpdateFile" id="updateUpdateFile" onChange={onChangeHandler}/> <br />
        <button type="button" className="firmwareUpload" onClick={onClickHandler}>Upload</button> 
        </div>
        </section>  
    );
};
export default UpdateFirmwareData