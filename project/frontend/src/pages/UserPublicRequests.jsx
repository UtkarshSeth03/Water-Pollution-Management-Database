import React, { useEffect, useState } from "react"
import axios from "axios"


const UserPublicRequests = (props) => {
    const [request, setRequest] = useState({
        user_email: window.location.pathname.slice(6, ),
        body_id: props.id,
        city: "",
        state: "",
        content: ""
    })


    useEffect(() => {
        const getBodyInfo = async () => {
            try {
                var response
                if(props.id[0] === "L") {
                    response = await axios.get("http://localhost:8080/getLake/" + props.id)
                    setRequest((previous) => ({
                        ...previous,
                        city: response.data[0].location,
                        state: response.data[0].state_name
                    }))
                }
            } catch(error) {
                console.log(error)
            }
        }

        getBodyInfo()
    }, [props.id])


    const handleChange = (event) => {
        setRequest((previous) => ({...previous, [event.target.name]: event.target.value}))
    }


    const handleClick = async (event) => {
        event.preventDefault()
        try {
            await axios.post("http://localhost:8080/newRequest", request)
            .then((repsonse) => {
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
            <input style = {inputStyle} type = "text" placeholder = "Enter City" name = "city" value = {request.city} onChange = {handleChange} autoComplete = "off"/>
            <input style = {inputStyle} type = "text" placeholder = "Enter State" name = "state" value = {request.state} onChange = {handleChange} autoComplete = "off"/>
            <textarea style = {inputStyle} rows = "6" cols = "50" placeholder = "Enter your request" name = "content" onChange = {handleChange} autoComplete = "off"/>
            <button style = {buttonStyle} onClick = {handleClick}>Submit</button>
        </div>
    )
}


export default UserPublicRequests