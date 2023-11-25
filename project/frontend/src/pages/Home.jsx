import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Home.css"
import Bodies from "./WaterBodies"
import States from "./States"
import Pollutants from "./Pollutants"


const Home = () => {
    const [user, setUser] = useState({
        type: "",
        userDisplay: "",
        requestsDisplay: ""
    })
    const [content, setContent] = useState(<Bodies/>)
    const [color, setColor] = useState({
        waterBodiesBackground: "#106EFF",
        waterBodiesColor: "white",
        statesBackgorund: "white",
        statesColor: "black",
        pollutantsBackground: "white",
        pollutantsColor: "black"
    })


    useEffect(() => {
        const findUser = () => {
            const pathName = window.location.pathname
            if(pathName.slice(1, 5) === "home") {
                setUser({
                    type: "normal",
                    userDisplay: "User: " + pathName.slice(6, ),
                    requestsDisplay: "View your Requests"
                })
            } else if(pathName.slice(1, 6) === "admin") {
                setUser({
                    type: "admin",
                    userDisplay: "Admin: " + pathName.slice(7, ),
                    requestsDisplay: "View all Requests"
                })
            } else if(pathName.slice(1, 11) === "government") {
                setUser({
                    type: "government",
                    userDisplay: "Government User: " + pathName.slice(12, ),
                    requestsDisplay: "View all Requests"
                })
            }
        }

        findUser()
    }, [])


    const navigate = useNavigate()


    const handleClick = (event) => {
        setColor((previous) => ({
            waterBodiesBackground: "white",
            waterBodiesColor: "black",
            statesBackgorund: "white",
            statesColor: "black",
            pollutantsBackground: "white",
            pollutantsColor: "black",
            [event.target.id + "Background"]: "#106EFF",
            [event.target.id + "Color"]: "white"
        }))
        if (event.target.id === "waterBodies") {
            setContent(<Bodies/>)
        } else if (event.target.id === "states") {
            setContent(<States/>)
        } else if (event.target.id === "pollutants") {
            setContent(<Pollutants/>)
        }
    }


    const handleLogout = (event) => {
        event.preventDefault()
        navigate("/")
    }


    const handleViewUserRequests = (event) => {
        event.preventDefault()
        const pathName = window.location.pathname
        if(user.type === "normal") {
            navigate(`/viewUserRequests/${pathName.slice(6, )}`)
        } else if(user.type === "admin"){
            navigate(`/viewUserRequests/adminAll?id=${pathName.slice(7, )}`)
        } else if(user.type === "government") {
            navigate(`/viewUserRequests/governmentAll?id=${pathName.slice(12, )}`)
        }
    }


    const buttonStyle = {
        padding: "5px 15px",
        fontSize: "16px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginLeft: "15px"
    }


    return (
        <div className = "Home">
            <div style = {{position:"absolute"}}>
                <h1 className = "heading">Water Pollution Management Database</h1>
            </div>
            <div style={{width:"100%", justifyContent:"flex-end", flexDirection:"row", display:"flex"}}>
                <p>{user.userDisplay}</p>
                <button style = {buttonStyle} onClick = {handleViewUserRequests}>{user.requestsDisplay}</button>
                <button style = {buttonStyle} onClick = {handleLogout}>Logout</button>
            </div>

            <div className = "Buttons">
                <button className = "category" style = {{backgroundColor: color.waterBodiesBackground, color: color.waterBodiesColor}} id = "waterBodies" onClick = {handleClick}>Get information on water bodies</button>

                <button className = "category" style = {{backgroundColor: color.statesBackground, color: color.statesColor}} id = "states" onClick = {handleClick}>Get statewise information</button>

                <button className = "category" style = {{backgroundColor: color.pollutantsBackground, color: color.pollutantsColor}} id = "pollutants" onClick = {handleClick}>Get pollutants and remedies</button>
            </div>

            <div id = "content">
                {content}
            </div>
        </div>
    )
}


export default Home