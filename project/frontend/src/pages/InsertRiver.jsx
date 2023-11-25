import React from "react"
import { useState } from "react"
import axios from "axios"


const InsertRiver = () => {
    const [riverInfo, setRiverInfo] = useState({
        name: "",
        level: "",
        source: "",
        destination: ""
    })


    const handleChange = (event) => {
        event.preventDefault()
        setRiverInfo((previous) => ({...previous, [event.target.name]: event.target.value}))
    }


    const handleClick = async (event) => {
        try {
            event.preventDefault()
            await axios.post("http://localhost:8080/insertRiver", riverInfo)
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
            <input style = {inputStyle} name = "name" type = "text" placeholder = "Enter River name" onChange = {handleChange} autoComplete = "off"/>
            <input style = {inputStyle} name = "level" type = "text" placeholder = "Enter level of pollution" onChange = {handleChange} autoComplete = "off"/>
            <input style = {inputStyle} name = "source" type = "text" placeholder = "Enter source" onChange = {handleChange} autoComplete = "off"/>
            <input style = {inputStyle} name = "destination" type = "text" placeholder = "Enter destination" onChange = {handleChange} autoComplete = "off"/>
            <button style = {buttonStyle} onClick = {handleClick}>Confirm</button>
        </div>
    )
}


export default InsertRiver