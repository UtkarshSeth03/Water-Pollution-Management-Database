import React, { useEffect, useState } from "react"
import axios from "axios"


const UpdateRiver = (props) => {
    const [riverInfo, setRiverInfo] = useState({
        river_id: props.id,
        name: "",
        level_of_pollution: "",
        source: "",
        destination: ""
    })


    useEffect(() => {
        const initialInfo = async () => {
            try {
                const response = await axios.get("http://localhost:8080/getRiver/" + props.id)
                setRiverInfo(response.data[0])
            } catch(error) {
                console.log(error)
            }
        }
        initialInfo()
    }, [props.id])


    const handleChange = (event) => {
        setRiverInfo((previous) => ({...previous, [event.target.name]: event.target.value}))
    }


    const handleClick = async (event) => {
        event.preventDefault()
        try {
            await axios.put("http://localhost:8080/updateRiver", riverInfo)
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
        <div id = "outer" style = {outer}>
            <input style = {inputStyle} name = "name" type = "text" value = {riverInfo.name} onChange = {handleChange} autoComplete = "off"/>
            <input style = {inputStyle} name = "level_of_pollution" type = "text" value = {riverInfo.level_of_pollution} onChange = {handleChange} autoComplete = "off"/>
            <input style = {inputStyle} name = "source" type = "text" value = {riverInfo.source} onChange = {handleChange} autoComplete = "off"/>
            <input style = {inputStyle} name = "destination" type = "text" value = {riverInfo.destination} onChange = {handleChange} autoComplete = "off"/>
            <div>
                <button style = {buttonStyle} onClick = {handleClick}>Confirm</button>
                {/* <button style = {buttonStyle} onClick = {handleCancel}>Cancel</button> */}
            </div>
        </div>
    )
}


export default UpdateRiver