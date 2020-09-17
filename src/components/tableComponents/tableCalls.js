import React, { useState, useEffect, Fragment } from 'react';
import '../../components/renderTable.css';
const axios = require('axios');

 const CallTable = (props) => {
    const [htmlPosts, setHtmlPosts] = useState([]);

     useEffect(() => {
        const requestUrl = `${props.api}/firmwares`;
        axios.get(requestUrl, { headers: {"Authorization" : `Bearer ${props.secret}`}})
        .then(payload => {
            payload = payload.data.data;
            return payload
          })
        .then((payload) => {  
            var listTitles = [
                <table key={0} className="tableOfTerminalsTitles">
                <thead>
            <tr key={0}>
            <th>Id</th>
            <th>Version</th>
            <th>Name</th>
            <th>Description</th>
            <th>Enabled</th>
            <th>Critical</th>
            <th>Initial data</th>
            <th>Update data</th>
            <th>Created</th>
            </tr>
            </thead>
            </table>
                ];
            var listItems = (payload).map((prop, index) =>
                            <table key={index + 1} className="tableOfTerminals">
                            <tbody>
                           <tr key={index +1 }>
                           <td>{prop.id} </td>
                           <td>{prop.version} </td>
                           <td>{prop.name} </td>
                           <td>{prop.description} </td>
                           <td>{JSON.stringify(prop.isEnabled)} </td>
                           <td>{JSON.stringify(prop.isCritical)} </td>
                           <td>{prop.initialDataFilename} </td>
                           <td>{prop.updateDataFilename} </td>
                           <td>{prop.creationDate} </td>
                           </tr>
                           </tbody>
                           </table>
                           )
                listItems.unshift(listTitles[0]);
            setHtmlPosts([listItems]);
            return payload
        })
        .catch(function (error) {
            console.log(error);
          });
    }, [props]) 
    return (
        <Fragment>
            {htmlPosts} 
        </Fragment>
          );
};
export default CallTable