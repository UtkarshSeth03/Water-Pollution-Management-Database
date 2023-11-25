import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"


const ViewLakeDetails = () => {
    const [details, setDetails] = useState([{}, {}])


    const navigate = useNavigate()


    useEffect(() => {
        const getDetails = async () => {
            try {
                let params = (new URL(document.location)).searchParams
                let lakeID = params.get("lakeID")
                const response = await axios.get("http://localhost:8080/viewLakeDetails/" + lakeID)
                setDetails(response.data)
            } catch(error) {
                console.log(error)
            }
        }

        getDetails()
    }, [])


    const handleBack = (event) => {
        event.preventDefault()
        let params = (new URL(document.location)).searchParams
        let id = params.get("id")
        const type = window.location.pathname.slice(17, )
        if(type === "admin") {
            navigate("/admin/" + id)
        } else if(type === "government") {
            navigate("/government/" + id)
        } else {
            navigate("/home/" + window.location.pathname.slice(17, ))
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


    const buttonStyle = {
        padding: "8px 20px",
        fontSize: "16px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer"
    }


    const pollutantBodyInfo = {
        margin: "10px 0px 40px 0px",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        background: "#f8f8f8",
        textAlign: "left"
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


    const lakeHeadingStyle = {
        fontSize: "30px",
        margin: "0px 0px 10px 0px",
        padding: "0",
        color: "#007bff"
    }


    const pollutantHeadingStyle = {
        fontSize: "25px",
        margin: "0px 0px 10px 0px",
        padding: "0",
        color: "#007bff"
    }


    const pollutantStyle = {
        fontSize: "24px",
        color: "#333",
        marginBottom: "20px",
        marginTop: "30px"
    }


    const remedyHeadingStyle = {
        fontSize: "16px",
        margin: "0px 0px 10px 0px",
        padding: "0",
        color: "#333"
    }


    const remedyStyle = {
        fontSize: "16px",
        padding: "0",
        color: "#333"
    }


    const informationStyle = {
        fontSize: "14px",
        margin: "0",
        padding: "0",
        color: "#777"
    }


    return (
        <div style = {outer}>
            {details.length === 0 ? (
                <div>
                    <h4>No information available</h4>
                    <button style = {buttonStyle} onClick = {handleBack}>Back</button>
                </div>
            ) : (
                <div>
                    <div style = {headingDiv}>
                        <h1 style = {heading}>Water Pollution Management Database</h1>
                        <button style = {buttonStyle} onClick = {handleBack}>Back</button>
                    </div>

                    <div style = {contentStyle}>
                        <div style = {bodyInfo}>
                            <h1 style = {lakeHeadingStyle}>{details[0].lake_name}</h1>
                            <p style = {informationStyle}>ID: {details[0].lake_id}</p>
                            <p style = {informationStyle}>Level of Pollution: {details[0].level_of_pollution}</p>
                            <p style = {informationStyle}>Type: {details[0].type}</p>
                            <p style = {informationStyle}>{details[0].location}, {details[0].state_name}</p>
                        </div>

                        <div>
                            <h2 style = {pollutantStyle}>The list of pollutants in this lake:</h2>
                            <div>
                                {Object.keys(details[1]).map(id => (
                                    <div key = {id} style = {pollutantBodyInfo}>
                                        <h2 style = {pollutantHeadingStyle}>{details[1][id]["pollutant_name"]}</h2>
                                        <p style = {informationStyle}>Chemical Composition: {details[1][id]["chemical_composition"]}</p>
                                        <p style = {informationStyle}>Concentration: {details[1][id]["concentration"]}</p>
                                        <p style = {informationStyle}>Effect: {details[1][id]["effect"]}</p>
                                        <p style = {informationStyle}>Source: {details[1][id]["source"]}</p>
                                        <p style = {informationStyle}>Type: {details[1][id]["pollutant_type"]}</p>
                                        <p style = {informationStyle}>Severity: {details[1][id]["severity"]}</p>
                                        <div>
                                            <h4 style = {remedyStyle}>Remedies:</h4>
                                            {Object.keys(details[1][id]["remedies"]).map(remedyID => (
                                                <div key = {remedyID} style = {bodyInfo}>    
                                                    <h4 style = {remedyHeadingStyle}>{details[1][id]["remedies"][remedyID]["remedy_name"]}</h4>
                                                    <p style = {informationStyle}>Effect: {details[1][id]["remedies"][remedyID]["remedy_effect"]}</p>
                                                    <p style = {informationStyle}>{details[1][id]["remedies"][remedyID]["remedy_scale"]} Scale</p>
                                                    <p style = {informationStyle}>Average Cost: {details[1][id]["remedies"][remedyID]["avg_price"]}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}


export default ViewLakeDetails