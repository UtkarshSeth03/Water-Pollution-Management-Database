import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"


const ViewUserRequests = () => {
    const [content, setContent] = useState([])


    const navigate = useNavigate()


    useEffect(() => {
        const getUserRequests = async () => {
            try {
                const response = await axios.get("http://localhost:8080/getUserRequests/" + window.location.pathname.slice(18, ))
                setContent(response.data)
            } catch(error) {
                console.log(error)
            }
        }

        getUserRequests()
    }, [])


    const handleBack = (event) => {
        event.preventDefault()
        let params = (new URL(document.location)).searchParams
        let id = params.get("id")
        const type = window.location.pathname.slice(18, )
        if(type === "adminAll") {
            navigate("/admin/" + id)
        } else if(type === "governmentAll") {
            navigate("/government/" + id)
        } else {
            navigate("/home/" + window.location.pathname.slice(18, ))
        }
    }


    const outer = {
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f0f0f0",
        padding: "10px"
    }


    const headingDiv =  {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    }


    const heading = {
        fontSize: "24px",
        color: "#333",
        marginBottom: "20px"
    }


    const contentStyle = {
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        padding: "30px",
        marginTop: "20px"
    }


    const emailStyle = {
        fontSize: "21px",
        color: "#333",
        margin: "0px 0px 20px 0px",
        padding: "0"
    }


    const bodyInfo = {
        margin: "10px 0px",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        background: "#f8f8f8",
        textAlign: "left"
    }


    const requestHeadingStyle = {
        fontSize: "18px",
        margin: "0px 0px 10px 0px",
        padding: "0",
        color: "#007bff"
    }


    const informationStyle = {
        fontSize: "14px",
        margin: "0",
        padding: "0",
        color: "#777"
    }


    const requestStyle = {
        border: "1px solid #ccc",
        borderRadius: "5px",
        marginTop: "10px",
        padding: "10px",
        height: "70px"
    }


    const buttonStyle = {
        padding: "8px 20px",
        fontSize: "16px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer"
    }


    return (
        <div style = {outer}>
            <div style = {headingDiv}>
                <h1 style = {heading}>Water Pollution Management Database</h1>
                <button style = {buttonStyle} onClick = {handleBack}>Back</button>
            </div>
            <div style = {contentStyle}>
                <h1 style = {emailStyle}>List of all requests{window.location.pathname.slice(-3, ) === "All" ? ":" : " for: " + window.location.pathname.slice(18, )}</h1>
                <div>
                    {content.map(request => (
                        <div style = {bodyInfo} key = {request.request_id}>
                            <h2 style = {requestHeadingStyle}>{request.request_id}</h2>
                            <h3 style = {informationStyle}>{window.location.pathname.slice(-3, ) === "All" && request.user_email}</h3>
                            <p style = {informationStyle}>{request.lake_id !== null && request.lake_id}</p>
                            <p style = {informationStyle}>{request.river_id !== null && request.river_id}</p>
                            <p style = {informationStyle}>{request.city}, {request.state_name}</p>
                            <div style = {requestStyle}>
                                <p style = {informationStyle}>{request.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}


export default ViewUserRequests