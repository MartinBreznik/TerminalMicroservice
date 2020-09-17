import React, { useState } from 'react';
import axios from 'axios';
 const NewFirmware = (props) => {
    const [initialFirmwareFile, setInitialFirmwareFile] = useState({selectedFile: null});
    const [updateFirmwareFile, setUpdateFirmwareFile] = useState({selectedFile: null});
    const [updateName, setUpdateName] = useState({name: ''});
    const [updateDescription, setUpdateDescription] = useState({description: ''});
    const [updateVersion, setUpdateVersion] = useState({version: 0});
    const [updateEnabled, setUpdateEnabled] = useState({isEnabled: false});
    const [updateCritical, setUpdateCritical] = useState({isCritical: false});

      const onChangeHandler = (event) => {
        if(event.target.name === 'newName'){
          setUpdateName({
            name: event.target.value,
        });
        }
        else if(event.target.name === 'newDescription'){
          setUpdateDescription({
            description: event.target.value,
        });
        }
        else if(event.target.name === 'version'){
          setUpdateVersion({
            version: event.target.value,
        });
        }
        else if(event.target.name === 'isEnabled'){
          setUpdateEnabled({
            isEnabled: event.target.value,
        });
        }
        else if(event.target.name === 'isCritical'){
          setUpdateCritical({
            isCritical: event.target.value,
        });
        }
        else if(event.target.name === 'initialFile'){
         setInitialFirmwareFile({
            selectedFile: event.target.files[0],
        });
      }
        else if(event.target.name === 'updateFile'){
         setUpdateFirmwareFile({
          selectedFile: event.target.files[0],
        })
        }
    } 
    const onClickHandler = (event) =>{

        const data = new FormData() 
        const toAppend = {
            Name: updateName.name,
            Description: updateDescription.description,
            Version: updateVersion.version,
            isEnabled: updateEnabled.isEnabled,
            isCritical: updateCritical.isCritical,
            initialData: initialFirmwareFile.selectedFile,
            updateData: updateFirmwareFile.selectedFile
        }
        console.log("init: ", toAppend.initialData, "udate: ", toAppend.updateData);
        for(const key in toAppend){
            data.append(key, toAppend[key]);
        }
        const axiosOptions = {
          headers: {
              "Authorization": `Bearer ${props.secret}`
          }
        };

        const requestUrl = `${props.api}/firmwares`;
    axios.post(requestUrl, data, axiosOptions)
    .then(res => {
      //console.log(res.data.data);
    })
    .catch(function (error) {
      console.log(error);
    });
    }
    return (
      <section id="modal-wrap">
        <div className="wrapContainer" style={{ color: 'black' }}>
        <label htmlFor="newName">Name: </label> <br />
        <input type="text" name="newName" id="newName" onChange={onChangeHandler}/> <br />
        <label htmlFor="newDescription">Description: </label> <br />
        <input type="text" name="newDescription" id="newDescription" onChange={onChangeHandler}/> <br />
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
        <label htmlFor="initialFile">Select initial data: </label> <br />
        <input type="file" name="initialFile" id="initialFile" onChange={onChangeHandler}/> <br />
        <label htmlFor="updateFile">Select update data: </label> <br />
        <input type="file" name="updateFile" id="updateFile" onChange={onChangeHandler}/> <br />
        <button type="button" className="firmwareUpload" onClick={onClickHandler}>Upload</button> 
        </div>
        </section>                
          );
};
export default NewFirmware