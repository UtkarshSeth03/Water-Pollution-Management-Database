import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import InsertLake from "./InsertLake"
import InsertRiver from "./InsertRiver"
import UpdateLake from "./UpdateLake"
import UpdateRiver from "./UpdateRiver"
import UserPublicRequests from "./UserPublicRequests"


const Bodies = () => {
    const [rivers, setRivers] = useState([])
    const [lakes, setLakes] = useState([])
    const [addLake, setAddLake] = useState([])
    const [addRiver, setAddRiver] = useState([])
    const [updateLake, setUpdateLake] = useState(null)
    const [updateRiver, setUpdateRiver] = useState(null)
    const [request, setRequest] = useState(null)
    const [userType, setUserType] = useState(null)


    const navigate = useNavigate()


    useEffect(() => {
        const fetchAllBodies = async () => {
            try {
                const responseRiver = await axios.get("http://localhost:8080/rivers")
                setRivers(responseRiver.data)
                const responseLake = await axios.get("http://localhost:8080/lakes")
                setLakes(responseLake.data)

                const pathName = window.location.pathname
                if(pathName.slice(1, 6) === "admin") {
                    setUserType("admin")
                } else if(pathName.slice(1, 5) === "home") {
                    setUserType("user")
                }
            } catch(error) {
                console.log(error)
            }
        }

        fetchAllBodies()
    }, [])


    const handleDelete = async (bodyID) => {
        try {
            const bodyType = bodyID[0] === "R" ? "river" : "lake"
            console.log(bodyType, bodyID)
            await axios.delete("http://localhost:8080/delete", {
                data: {
                    "type": bodyType,
                    "id": bodyID
                }
            })
            .then((response) => {
                window.location.reload(true)
            })
        } catch(error) {
            console.log(error)
        }
    }


    const handleAddLake = (event) => {
        if(event.target.innerHTML === "Add") {
            setAddLake(<InsertLake/>)
            event.target.innerHTML = "Cancel"
        } else {
            setAddLake([])
            event.target.innerHTML = "Add"
        }
    }


    const handleAddRiver = (event) => {
        if(event.target.innerHTML === "Add") {
            setAddRiver(<InsertRiver/>)
            event.target.innerHTML = "Cancel"
        } else {
            setAddRiver([])
            event.target.innerHTML = "Add"
        }
    }


    const handleUpdateLake = (lakeID) => {
        if(updateLake === lakeID) {
            setUpdateLake(null)
        } else {
            setUpdateLake(lakeID)
        }
    }


    const handleUpdateRiver = (riverID) => {
        if(updateRiver === riverID) {
            setUpdateRiver(null)
        } else {
            setUpdateRiver(riverID)
        }
    }


    const handleAddRequest = (bodyID) => {
        if(request === bodyID) {
            setRequest(null)
        } else {
            setRequest(bodyID)
        }
    }


    const handleViewLakeDetails = (lakeID) => {
        const pathName = window.location.pathname
        if(pathName.slice(1, 5) === "home") {
            navigate(`/viewLakeDetails/${pathName.slice(6, )}?lakeID=${lakeID}`)
        } else if(pathName.slice(1, 6) === "admin") {
            navigate(`/viewLakeDetails/admin?id=${pathName.slice(7, )}&lakeID=${lakeID}`)
        } else if(pathName.slice(1, 11) === "government") {
            navigate(`/viewLakeDetails/government?id=${pathName.slice(12, )}&lakeID=${lakeID}`)
        }
    }


    const handleViewRiverDetails = (riverID) => {
        const pathName = window.location.pathname
        if(pathName.slice(1, 5) === "home") {
            navigate(`/viewRiverDetails/${pathName.slice(6, )}?riverID=${riverID}`)
        } else if(pathName.slice(1, 6) === "admin") {
            navigate(`/viewRiverDetails/admin?id=${pathName.slice(7, )}&riverID=${riverID}`)
        } else if(pathName.slice(1, 11) === "government") {
            navigate(`/viewRiverDetails/government?id=${pathName.slice(12, )}&riverID=${riverID}`)
        }
    }


    const containerStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        margin: "20px"
    }


    const Outer = {
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


    const bodyName = {
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


    const deleteStyle = {
        padding: "5px 15px",
        fontSize: "14px",
        backgroundColor: "red",
        color: "white",
        border: "1px solid black",
        borderRadius: "5px",
        cursor: "pointer",
        marginRight: "15px"
    }


    const updateStyle = {
        marginRight: "15px",
        padding: "5px 15px",
        fontSize: "14px",
        backgroundColor: "#007bff",
        color: "white",
        border: "1px solid black",
        borderRadius: "5px",
        cursor: "pointer"
    }


    const buttonStyle = {
        marginTop: "10px",
        padding: "8px 20px",
        fontSize: "16px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    }


    const buttonOuter = {
        display: "flex",
        justifyContent: "space-between"
    }


    return (
        <div style = {containerStyle}>
            <div style = {Outer}>
                <h1 style = {headingStyle}>List of all rivers</h1>

                <div style = {bodyList}>
                    {rivers.map(river => (
                        <div id = {"outer" + river.river_id} className = "river" style = {bodyInfo} key = {river.river_id}>
                            <div>
                                <h2 style = {bodyName}>{river.name}</h2>
                                <p style = {informationStyle}>ID: {river.river_id}</p>
                                <p style = {informationStyle}>Level of Pollution: {river.level_of_pollution}</p>
                                <p style = {informationStyle}>Source: {river.source}</p>
                                <p style = {informationStyle}>Destination: {river.destination}</p>
                            </div>
                            <div style = {buttonOuter}>
                                <button style = {updateStyle} onClick = {() => handleViewRiverDetails(river.river_id)}>View Details</button>
                                {userType === "user" && (
                                    <div className = "userElements">
                                        <button style = {updateStyle} onClick = {() => handleAddRequest(river.river_id)}>{request === river.river_id ? "Cancel" : "Add Request"}</button>
                                    </div>
                                )}
                                {userType === "admin" && (
                                    <div className = "adminElements">
                                        <button id = {river.river_id} style = {updateStyle} onClick = {() => handleUpdateRiver(river.river_id)}>{updateRiver === river.river_id ? "Cancel" : "Update"}</button>
                                        <button style = {deleteStyle} onClick = {() => handleDelete(river.river_id)}>Delete</button>
                                    </div>
                                )}
                            </div>
                            {request === river.river_id && <UserPublicRequests id = {river.river_id}/>}
                            {updateRiver === river.river_id && <UpdateRiver id = {river.river_id}/>}
                        </div>
                    ))}
                </div>

                {userType === "admin" && (
                    <div className = "adminElements">
                        <button style = {buttonStyle} onClick = {handleAddRiver}>Add</button>
                        {addRiver}
                    </div>
                )}
            </div>

            <div style = {Outer}>
                <h1 style = {headingStyle}>List of all lakes</h1>

                <div style = {bodyList}>
                    {lakes.map(lake => (
                        <div id = {"outer" + lake.lake_id} className = "lake" style = {bodyInfo} key = {lake.lake_id}>
                            <div>
                                <h2 style = {bodyName}>{lake.name}</h2>
                                <p style = {informationStyle}>ID: {lake.lake_id}</p>
                                <p style = {informationStyle}>Level of Pollution: {lake.level_of_pollution}</p>
                                <p style = {informationStyle}>Type: {lake.type}</p>
                                <p style = {informationStyle}>{lake.location}, {lake.state_name}</p>
                            </div>
                            <div style = {buttonOuter}>
                                <button style = {updateStyle} onClick = {() => handleViewLakeDetails(lake.lake_id)}>View Details</button>
                                {userType === "user" && (
                                    <div className = "userElements">
                                        <button style = {updateStyle} onClick = {() => handleAddRequest(lake.lake_id)}>{request === lake.lake_id ? "Cancel" : "Add Request"}</button>
                                    </div>
                                )}
                                {userType === "admin" && (
                                    <div className = "adminElements">
                                        <button id = {lake.lake_id} style = {updateStyle} onClick = {() => handleUpdateLake(lake.lake_id)}>{updateLake === lake.lake_id ? "Cancel" : "Update"}</button>
                                        <button style = {deleteStyle} onClick = {() => handleDelete(lake.lake_id)}>Delete</button>
                                    </div>
                                )}
                            </div>
                            {request === lake.lake_id && <UserPublicRequests id = {lake.lake_id}/>}
                            {updateLake === lake.lake_id && <UpdateLake id = {lake.lake_id}/>}
                        </div>
                    ))}
                </div>

                {userType === "admin" && (
                    <div className = "adminElements">
                        <button style = {buttonStyle} onClick = {handleAddLake}>Add</button>
                        {addLake}
                    </div>
                )}
            </div>
        </div>
    )
}


export default Bodies