import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const SignUp = () => {
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        governmentID: null
    })

    const navigate = useNavigate()

    const handleChange = (event) => {
        setUser((previous) => ({...previous, [event.target.name]: event.target.value}))
    }

    const handleClick = async (event) => {
        try {
            await axios.post("http://localhost:8080/signup", user)
            if(user.governmentID === null) {
                navigate("/home/" + user.email)
            } else {
                navigate("/government/" + user.governmentID)
            }
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
        margin: "20px 20px 0px 20px",
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
            <input style = {inputStyle} type = "text" placeholder = "Enter First Name" name = "firstName" onChange = {handleChange} autoComplete = "off"/>
            <input style = {inputStyle} type = "text" placeholder = "Enter Last Name" name = "lastName" onChange = {handleChange} autoComplete = "off"/>
            <input style = {inputStyle} type = "email" placeholder = "Enter Email" name = "email" onChange = {handleChange} autoComplete = "off"/>
            <input style = {inputStyle} type = "password" placeholder = "Enter Password" name = "password" onChange = {handleChange} autoComplete = "off"/>
            <input style = {inputStyle} type = "number" placeholder = "If a government official, enter ID" name = "governmentID" onChange = {handleChange} autoComplete = "off"/>
            <button style = {buttonStyle} onClick = {handleClick}>Sign Up</button>
        </div>
    )
}

export default SignUp