import React from "react"
import { useState } from "react"
import axios from "axios"


const InsertLake = () => {
    const [lakeInfo, setLakeInfo] = useState({
        name: "",
        level: "",
        location: "",
        type: "",
        state: ""
    })


    const handleChange = (event) => {
        event.preventDefault()
        setLakeInfo((previous) => ({...previous, [event.target.name]: event.target.value}))
    }


    const handleClick = async (event) => {
        try {
            event.preventDefault()
            await axios.post("http://localhost:8080/insertLake", lakeInfo)
            .then((response) => {
                window.location.reload(true)
            })
        } catch(error) {
            console.log(error)
        }
    }


    const outer = {
        margin: "15px 0px",
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
            <input style = {inputStyle} name = "name" onChange = {handleChange} type = "text" placeholder = "Enter Lake name" autoComplete = "off"/>
            <input style = {inputStyle} name = "level" onChange = {handleChange} type = "text" placeholder = "Enter level of pollution" autoComplete = "off"/>
            <input style = {inputStyle} name = "location" onChange = {handleChange} type = "text" placeholder = "Enter Location" autoComplete = "off"/>
            <input style = {inputStyle} name = "type" onChange = {handleChange} type = "text" placeholder = "Enter type" autoComplete = "off"/>
            <input style = {inputStyle} name = "state" onChange = {handleChange} type = "text" placeholder = "Enter state name" autoComplete = "off"/>
            <button style = {buttonStyle} onClick = {handleClick}>Confirm</button>
        </div>
    )
}


export default InsertLake