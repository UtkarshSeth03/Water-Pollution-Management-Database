import React, { useEffect, useState } from "react"
import axios from "axios"


const Pollutants = () => {
    const [pollutants, setPollutants] = useState([])
    
    
    useEffect(() => {
        const getPollutants = async () => {
            try {
                const response = await axios.get("http://localhost:8080/getPollutantsInformation")
                setPollutants(response.data)
            } catch(error) {
                console.log(error)
            }
        }

        getPollutants()
    }, [])


    const outerStyle = {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        justifyContent: "left",
        padding: "20px",
        margin: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        minWidth: "300px",
        background: "#fff",
        transition: "transform 0.2s",
        textAlign: "left"
    }


    const headingStyle = {
        fontSize: "24px",
        margin: "0",
        padding: "0",
        marginBottom: "10px",
        color: "#007bff"
    }


    const bodyList = {
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        justifyContent: "space-between"
    }


    const bodyInfo = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "10px 0px",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        background: "#f8f8f8",
        textAlign: "left"
    }


    const pollutantNameStyle = {
        fontSize: "18px",
        margin: "0px 0px 5px 0px",
        padding: "0",
    }


    const informationStyle = {
        fontSize: "14px",
        margin: "0",
        padding: "0",
        color: "#777",
    }


    return (
        <div style = {outerStyle}>
            <h1 style = {headingStyle}>List of all Pollutants</h1>
            <div style = {bodyList}>
                {pollutants.map(pollutant => (
                    <div style = {bodyInfo} key = {pollutant.pollutant_id}>
                        <div>
                            <h2 style = {pollutantNameStyle}>{pollutant.name}</h2>
                            <p style =  {informationStyle}>Source: {pollutant.source}</p>
                            <p style =  {informationStyle}>Severity: {pollutant.severity}</p>
                            <p style =  {informationStyle}>Type: {pollutant.type}</p>
                            <p style =  {informationStyle}>Remedies: {pollutant.remedies}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default Pollutants