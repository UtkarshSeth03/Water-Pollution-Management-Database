import React, { useState } from "react"
import UserLogin from "./UserLogin"
import SignUp from "./SignUp"
import AdminLogin from "./AdminLogin"
import States from "./States"
import GovernmentLogin from "./GovernmentLogin"


const Login = () => {
    const [content, setContent] = useState(<States/>)
    const [format, setFormat] = useState({
        "home": "30px",
        "login": "15px",
        "governmentLogin": "15px",
        "adminLogin": "15px",
        "signUp": "15px"
    })


    const handleClick = (event) => {
        setFormat({
            "home": "15px",
            "login": "15px",
            "governmentLogin": "15px",
            "adminLogin": "15px",
            "signUp": "15px",
            [event.target.id]: "30px"
        })
        if(event.target.id === "login") {
            setContent(<UserLogin/>)
        } else if(event.target.id === "signUp") {
            setContent(<SignUp/>)
        } else if(event.target.id === "adminLogin") {
            setContent(<AdminLogin/>)
        } else if(event.target.id === "home") {
            setContent(<States/>)
        } else if(event.target.id === "governmentLogin") {
            setContent(<GovernmentLogin/>)
        }
    }


    const wrapper = {
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100%"
    }


    const outer = {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        background: "#3498db",
        color: "white",
        padding: "20px"
    }


    const outerContent = {
        margin: "10px",
        padding: "20px",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "stretch",
        background: "#eaeaea",
        borderRadius: "10px",
    }


    const listStyle = {
        margin: "40px 10px 10px 50px",
        padding: "20px",
        minWidth: "300px",
        backgroundColor: "#ffffff",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
        height: "250px"
    }


    const menu = {
        margin: "25px 100px 100px 100px",
        width: "850px"
    }


    return (
        <div style = {wrapper}>
            <div style = {outer}>
                <h1>Water Pollution Management Database</h1>
            </div>

            <div style = {outerContent}>
                <div style = {listStyle}>
                    <p id = "home" style = {{fontSize: format["home"], transitionDuration: "500ms", cursor: "pointer"}} onClick = {handleClick}>Home</p>
                    <p id = "login" style = {{fontSize: format["login"], transitionDuration: "500ms", cursor: "pointer"}} onClick = {handleClick}>Login</p>
                    <p id = "governmentLogin" style = {{fontSize: format["governmentLogin"], transitionDuration: "500ms", cursor: "pointer"}} onClick = {handleClick}>Government Login</p>
                    <p id = "adminLogin" style = {{fontSize: format["adminLogin"], transitionDuration: "500ms", cursor: "pointer"}} onClick = {handleClick}>Admin Login</p>
                    <p id = "signUp" style = {{fontSize: format["signUp"], transitionDuration: "500ms", cursor: "pointer"}} onClick = {handleClick}>Sign Up</p>
                </div>

                <div style = {menu}>
                    {content}
                </div>
            </div>
        </div>
    )
}


export default Login