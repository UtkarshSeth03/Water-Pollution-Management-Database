import React from "react"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const UserLogin = () => {
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    const handleChange = (event) => {
        setUser((previous) => ({...previous, [event.target.name]: event.target.value}))
    }

    const handleClick = async (event) => {
        try {
            await axios.post("http://localhost:8080/login", user)
            .then((response) => {
                const result = response.data
                if(!result["valid"]) {
                    var element = document.getElementById("message")
                    element.innerHTML = "Invalid email or password entered"
                } else {
                    navigate("/home/" + user.email)
                }
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
            <input style = {inputStyle} type = "text" placeholder = "Enter E-mail" name = "email" onChange = {handleChange} autoComplete = "off"/>
            <input style = {inputStyle} type = "password" placeholder = "Enter password" name = "password" onChange = {handleChange} autoComplete = "off"/>
            <button style = {buttonStyle} onClick = {handleClick}>Login</button>
            <p id = "message"></p>
        </div>
    )
}

export default UserLogin