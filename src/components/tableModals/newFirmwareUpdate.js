import React, {
    useState,
    useEffect,
    useCallback,
    useRef,
    Fragment
} from 'react';
import axios from 'axios';

const NewFirmwareUpdate = (props) => {
    const [firmwareId, setFirmwareId] = useState(0);
    const [notes, setNotes] = useState('');
    const [isSending, setIsSending] = useState(false);
    const isMounted = useRef(true);

    const onChangeHandler = (event) => {
        if (event.target.name === 'firmwareId') {
            setFirmwareId(event.target.value);
        }
        else if(event.target.name === 'notes'){
            setNotes(event.target.value);
           }
        }
        const [htmlInputs, setHtmlInputs] = useState([
            <Fragment key={0}><input type="number" name="terminals" className="terminalsInput" onChange={onChangeHandler}/> <br /></Fragment>
        ]);
        
         const addMoreTerminals = useCallback(async (event) => {
            if (isSending)
                return
            setIsSending(true)
            var inputLength = (document.getElementsByClassName('terminalsInput')).length;
            setHtmlInputs([
                ...htmlInputs,
                <Fragment key={inputLength}><input type="number" name="terminals" className="terminalsInput" onChange={onChangeHandler}/> <br /></Fragment>
            ])
            if (isMounted.current) 
                setIsSending(false)
        }, [isSending, htmlInputs])

    useEffect(() => {
        return () => {
            isMounted.current = false
        }
    }, [])

    const onClickHandler = useCallback(async (event) => {
        if (isSending)
            return
        setIsSending(true)

        var terminalInputs = document.getElementsByClassName('terminalsInput');
        let payloadArray = [];
        for(var i=0; i < terminalInputs.length; i++){
            payloadArray.push(parseInt(terminalInputs[i].value, 10));
        }
        const payload = {
            firmwareId: parseInt(firmwareId, 10),
            terminals: payloadArray,
            notes: notes
        };
        let RequestUrl = `${props.api}/firmwares/${firmwareId}/terminal-updates`;

        const axiosOptions = {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${props.secret}`
            }
        }
        console.log(payload, typeof(payload.notes));
        const res = await axios.post(RequestUrl, payload, axiosOptions)
        var data = await res;
        console.log(data);

        if (isMounted.current) 
            setIsSending(false)

    }, [isSending, firmwareId, props, notes])



    return (
        <section id="modal-wrap">
        <div className="wrapContainer" style={{ color: 'black' }}>
        <label htmlFor="firmwareId">Firmware ID: </label> <br />
        <input type="number" name="firmwareId" id="firmwareId" onChange={onChangeHandler} required/> <br />
        <label htmlFor="terminals">Terminal: </label> <br />
        {htmlInputs}
        <button type="button" className="terminalsButton" onClick={addMoreTerminals}>add more terminals</button> <br/>
        <label htmlFor="notes">Notes: </label> <br />
        <input type="text" name="notes" id="notes" onChange={onChangeHandler} /> <br />
        <button type="button" className="firmwareUpload" onClick={onClickHandler}>Create update</button> 
        </div>
        </section>  
    );
};
export default NewFirmwareUpdate