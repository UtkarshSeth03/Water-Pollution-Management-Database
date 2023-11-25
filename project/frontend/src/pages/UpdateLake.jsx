import React, { useEffect, useState } from "react"
import axios from "axios"


const UpdateLake = (props) => {
    const [lakeInfo, setLakeInfo] = useState({
        lake_id: props.id,
        name: "",
        level_of_pollution: "",
        location: "",
        type: "",
        state_name: ""
    })


    useEffect(() => {
        const initialInfo = async () => {
            try {
                const response = await axios.get("http://localhost:8080/getLake/" + props.id)
                setLakeInfo(response.data[0])
            } catch(error) {
                console.log(error)
            }
        }
        initialInfo()
    }, [props.id])


    const handleChange = (event) => {
        setLakeInfo((previous) => ({...previous, [event.target.name]: event.target.value}))
    }


    const handleClick = async (event) => {
        event.preventDefault()
        try {
            await axios.put("http://localhost:8080/updateLake", lakeInfo)
            .then((response) => {
                window.location.reload(true)
            })
        } catch(error) {
            console.log(error)
        }
    }


    const outer = {
        margin: "15px 0px",
        padding: "15px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "1px solid #ccc",
        borderRadius: "5px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        background: "#f8f8f8"
    }


    const inputStyle = {
        marginTop: "20px",
        padding: "10px",
        width: "100vh",
        border: "1px solid #ccc",
        borderRadius: "5px"
    }


    const buttonStyle = {
        margin: "20px",
        padding: "8px 20px",
        fontSize: "16px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    }


    return (
        <div style = {outer}>
            <input style = {inputStyle} name = "name" onChange = {handleChange} type = "text" value = {lakeInfo.name} autoComplete = "off"/>
            <input style = {inputStyle} name = "level_of_pollution" onChange = {handleChange} type = "text" value = {lakeInfo.level_of_pollution} autoComplete = "off"/>
            <input style = {inputStyle} name = "location" onChange = {handleChange} type = "text" value = {lakeInfo.location} autoComplete = "off"/>
            <input style = {inputStyle} name = "type" onChange = {handleChange} type = "text" value = {lakeInfo.type} autoComplete = "off"/>
            <input style = {inputStyle} name = "state_name" onChange = {handleChange} type = "text" value = {lakeInfo.state_name} autoComplete = "off"/>
            <button style = {buttonStyle} onClick = {handleClick}>Confirm</button>
        </div>
    )
}


export default UpdateLake