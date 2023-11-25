import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"


const States = () => {
    const [states, setStates] = useState([])
    const [stateNames, setStateNames] = useState([])
    const [stateCounts, setStateCounts] = useState({})


    useEffect(() => {
        const initialStates = async () => {
            try {
                const initialResponse = await axios.get("http://localhost:8080/states/all")
                setStates(initialResponse.data)

                const names = await axios.get("http://localhost:8080/getStateNames")
                setStateNames(names.data)

                const counts = await axios.get("http://localhost:8080/getTotalBodiesInState")
                setStateCounts(counts.data)
            } catch(error) {
                console.log(error)
            }
        }

        initialStates()
    }, [])


    const handleClick = async (event) => {
        event.preventDefault()
        try {
            const name = document.getElementById("stateName")
            var link = ""
            if(name.value === "All") {
                link = "http://localhost:8080/states/all"
            } else {
                link = "http://localhost:8080/states/" + name.value
            }
            const response = await axios.get(link)
            setStates(response.data)

        } catch(error) {
            console.log(error)
        }
    }


    const containerStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "20px"
    }
    

    const filterContainerStyle = {
        display: "flex",
        alignItems: "center",
        marginBottom: "20px"
    }


    const selectStyle = {
        padding: "8px",
        fontSize: "16px",
        marginRight: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px"
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


    const stateDisplayStyle = {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center"
    }


    const stateInfoStyle = {
        margin: "10px",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        minWidth: "300px",
        maxWidth: "300px",
        background: "#fff",
        transition: "transform 0.2s",
        textAlign: "left"
    }


    const stateNameStyle = {
        fontSize: "24px",
        margin: "0",
        padding: "0",
        marginBottom: "10px",
        color: "#007bff"
    }


    const stateListStyle = {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between"
    }


    const bodyInfoStyle = {
        width: "100%",
        margin: "10px 0",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        background: "#f8f8f8",
        textAlign: "left"
    }


    const bodyNameStyle = {
        fontSize: "18px",
        margin: "0",
        padding: "0"
    }


    const informationStyle = {
        fontSize: "14px",
        margin: "0",
        padding: "0",
        color: "#777",
    }


    const headingBoxStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    }


    const countsStyle = {
        fontSize: "14px",
        padding: "0",
        margin: "0px 5px 3px 0px",
        color: "#777"
    }


    return (
        <div style = {containerStyle}>
            <div style = {filterContainerStyle}>
                <select style = {selectStyle} id = "stateName">
                    <option value = "all">All</option>
                    {stateNames.map(stateName => (
                        <option key = {stateName.name} value = {stateName.name}>{stateName.name}</option>
                    ))}
                </select>
                <button style = {buttonStyle} onClick = {handleClick}>Filter</button>
            </div>

            <div style = {stateDisplayStyle} id = "stateDisplay">
                {Object.keys(states).map((stateName) => (
                    <div style = {stateInfoStyle} key = {stateName}>    
                        <div style = {headingBoxStyle}>
                            <h1 style = {stateNameStyle}>{stateName}</h1>
                            <p style = {countsStyle}>Total: {stateCounts[stateName]}</p>
                        </div>
                        <div style = {stateListStyle}>
                            {states[stateName]["lakes"].map(state => (
                                <div style = {bodyInfoStyle} key = {state.lake_id}>
                                    <h2 style = {bodyNameStyle}>{state.lake_name}</h2>
                                    {window.location.pathname !== "/" && <p style = {informationStyle}>ID: {state.lake_id}</p>}
                                    <p style = {informationStyle}>Level of Pollution: {state.level_of_pollution}</p>
                                    {window.location.pathname !== "/" && <p style = {informationStyle}>Location: {state.location}</p>}
                                    {window.location.pathname !== "/" && <p style = {informationStyle}>Type: {state.type}</p>}
                                </div>
                            ))}
                            {states[stateName]["rivers"].map(state => (
                                <div style = {bodyInfoStyle} key = {state.river_id}>
                                    <h2 style = {bodyNameStyle}>{state.river_name}</h2>
                                    {window.location.pathname !== "/" && <p style = {informationStyle}>ID: {state.river_id}</p>}
                                    {window.location.pathname !== "/" && <p style = {informationStyle}>Source: {state.source}</p>}
                                    {window.location.pathname !== "/" && <p style = {informationStyle}>Destination: {state.destination}</p>}
                                    <p style = {informationStyle}>Level of Pollution: {state.level_of_pollution}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default States