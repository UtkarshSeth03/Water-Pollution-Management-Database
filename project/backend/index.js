import express from "express"
import mysql from "mysql"
import cors from "cors"


const app = express()


app.use(express.json())
app.use(cors())


const database = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "miniProject"
})


app.get("/rivers", (request, response) => {
    const query = "SELECT * FROM rivers;"
    database.query(query, (error, result) => {
        if(error) {
            console.log(error)
            return response.json(error)
        }
        return response.json(result)
    })
})


app.get("/lakes", (request, response) => {
    const query = "SELECT * FROM lakes;"
    database.query(query, (error, result) => {
        if(error) {
            console.log(error)
            return response.json(error)
        }
        return response.json(result)
    })
})


app.get("/getRiver/:riverID", (request, response) => {
    const query = "SELECT * FROM rivers WHERE river_id = ?;"
    const values = [
        request.params.riverID
    ]
    database.query(query, [...values], (error, result) => {
        if(error) {
            console.log(error)
            return response.json(error)
        }
        return response.json(result)
    })
})


app.get("/getLake/:lakeID", (request, response) => {
    const query = "SELECT * FROM lakes WHERE lake_id = ?;"
    const values = [
        request.params.lakeID
    ]
    database.query(query, [...values], (error, result) => {
        if(error) {
            console.log(error)
            return response.json(error)
        }
        return response.json(result)
    })
})


app.get("/states/:name", (request, response) => {
    var queryLake = ""
    if(request.params.name == "all") {
        queryLake = "SELECT state_name, lakes.name as lake_name, level_of_pollution, location, type, lake_id FROM states JOIN lakes ON states.name = lakes.state_name;"
    } else {
        queryLake = "SELECT state_name, lakes.name as lake_name, level_of_pollution, location, type, lake_id FROM states JOIN lakes ON states.name = lakes.state_name WHERE states.name = '" + request.params.name + "';"
    }

    var queryRiver = ""
    if(request.params.name == "all") {
        queryRiver = "SELECT state_name, river_name, source, destination, level_of_pollution, river_id FROM states JOIN (SELECT rivers.river_id, rivers_in_state.state_name, rivers.name as river_name, rivers.source, rivers.destination, rivers.level_of_pollution FROM rivers JOIN rivers_in_state ON rivers.river_id = rivers_in_state.river_id) AS temp ON states.name = temp.state_name;"
    } else {
        queryRiver = "SELECT state_name, river_name, source, destination, level_of_pollution, river_id FROM states JOIN (SELECT rivers.river_id, rivers_in_state.state_name, rivers.name as river_name, rivers.source, rivers.destination, rivers.level_of_pollution FROM rivers JOIN rivers_in_state ON rivers.river_id = rivers_in_state.river_id) AS temp ON states.name = temp.state_name WHERE states.name = '" + request.params.name + "';"
    }

    var lakeResult
    var riverResult
    const groupedResult = {}

    database.query(queryLake, (error, lakeQueryResult) => {
        if(error) {
            console.log(error)
            return response.json(error)
        }
        lakeResult = lakeQueryResult
        // const groupedResult = lakeResult.reduce((accumulated, record) => {
        //     if(accumulated.hasOwnProperty(record.state_name)) {
        //         accumulated[record.state_name].push(record)
        //     } else {
        //         accumulated = {...accumulated, [record.state_name]: [record]}
        //     }
        //     return accumulated
        // }, {})
        // console.log(groupedResult)
        // return response.json(groupedResult)
        database.query(queryRiver, (error, riverQueryResult) => {
            if(error) {
                console.log(error)
                return response.json(error)
            }
            riverResult = riverQueryResult

            for(var i in lakeResult) {
                if(!groupedResult[lakeResult[i]["state_name"]]) {
                    groupedResult[lakeResult[i]["state_name"]] = {
                        "lakes": [],
                        "rivers": []
                    }
                }
                groupedResult[lakeResult[i]["state_name"]]["lakes"].push(lakeResult[i])
            }
            
            for(i in riverResult) {
                if(!groupedResult[riverResult[i]["state_name"]]) {
                    groupedResult[riverResult[i]["state_name"]] = {
                        "lakes": [],
                        "rivers": []
                    }
                }
                groupedResult[riverResult[i]["state_name"]]["rivers"].push(riverResult[i])
            }

            return response.json(groupedResult)
        })
    })
})


app.post("/login", (request, response) => {
    const query = "SELECT * FROM users WHERE email = ? AND password = ?;"
    const values = [
        request.body.email,
        request.body.password
    ]
    database.query(query, [...values], (error, result) => {
        if(error) {
            console.log(error)
            return response.json(error)
        }
        if(result.length == 0) {
            return response.json({
                "valid": 0
            })
        }
        return response.json({
            "valid": 1
        })
    })
})


app.post("/signup", (request, response) => {
    var query = ""
    const values = [
        request.body.firstName,
        request.body.lastName,
        request.body.email,
        request.body.password,
    ]
    if(request.body.governmentID == null) {
        query = "INSERT INTO users (`first_name`, `last_name`, `email`, `password`) VALUES (?, ?, ?, ?);"
    } else {
        query = "INSERT INTO government_users (`first_name`, `last_name`, `email`, `password`, `government_id`) VALUES (?, ?, ?, ?, ?);"
    }
    database.query(query, [...values, request.body.governmentID], (error, result) => {
        if(error) {
            console.log(error)
            return response.json(error)
        }
        var userQuery
        if(request.body.governmentID == null) {
            userQuery = "CALL InsertUserDetails(?);"
        } else {
            userQuery = "CALL InsertGovernmentUserDetails(?);"
        }
        database.query(userQuery, request.body.email, (error, userResult) => {
            if(error) {
                console.log(error)
                return response.json(error)
            }
            return response.json(result)
        })
    })
})


app.post("/adminLogin", (request, response) => {
    const query = "SELECT * FROM admins WHERE id = ? and password = ?;"
    const values = [
        request.body.id,
        request.body.password
    ]
    database.query(query, [...values], (error, result) => {
        if(error) {
            console.log(error)
            return response.json(error)
        }
        if(result.length == 0) {
            return response.json({
                "valid": 0
            })
        } else {
            return response.json({
                "valid": 1
            })
        }
    })
})


app.post("/governmentLogin", (request, response) => {
    const query = "SELECT * FROM government_users WHERE government_id = ? AND password = ?;"
    const values = [
        request.body.id,
        request.body.password
    ]
    database.query(query, [...values], (error, result) => {
        if(error) {
            console.log(error)
            return response.json(error)
        }
        if(result.length == 0) {
            return response.json({
                "valid": 0
            })
        } else {
            return response.json({
                "valid": 1
            })
        }
    })
})


app.delete("/delete", (request, response) => {
    var query = ""
    const values = [
        request.body.id
    ]
    if(request.body.type === "lake") {
        query = "DELETE FROM lakes WHERE lake_id = ?;"    
    } else {
        query = "DELETE FROM rivers WHERE river_id = ?;"
    }
    database.query(query, [...values], (error, result) => {
        if(error) {
            console.log(error)
            return response.json(error)
        }
        return response.json(result)
    })
})


app.post("/insertLake", (request, response) => {
    const query = "INSERT INTO lakes VALUES ('', ?, ?, ?, ?, ?);"
    const values = [
        request.body.name,
        request.body.level,
        request.body.location,
        request.body.type,
        request.body.state
    ]
    database.query(query, [...values], (error, result) => {
        if(error) {
            console.log(error)
            return response.json(error)
        }
        return response.json(result)
    })
})


app.post("/insertRiver", (request, response) => {
    const query = "INSERT INTO rivers VALUES ('', ?, ?, ?, ?);"
    const values = [
        request.body.name,
        request.body.level,
        request.body.source,
        request.body.destination
    ]
    database.query(query, [...values], (error, result) => {
        if(error) {
            console.log(error)
            return response.json(error)
        }
        return response.json(result)
    })
})


app.put("/updateRiver", (request, response) => {
    const query = "UPDATE rivers SET name = ?, level_of_pollution = ?, source = ?, destination = ? WHERE river_id = ?;"
    const values = [
        request.body.name,
        request.body.level_of_pollution,
        request.body.source,
        request.body.destination,
        request.body.river_id
    ]
    database.query(query, [...values], (error, result) => {
        if(error) {
            console.log(error)
            return response.json(error)
        }
        return response.json(result)
    })
})


app.put("/updateLake", (request, response) => {
    const query = "UPDATE lakes SET name = ?, level_of_pollution = ?, location = ?, type = ?, state_name = ? WHERE lake_id = ?;"
    const values = [
        request.body.name,
        request.body.level_of_pollution,
        request.body.location,
        request.body.type,
        request.body.state_name,
        request.body.lake_id
    ]
    database.query(query, [...values], (error, result) => {
        if(error) {
            console.log(error)
            return response.json(error)
        }
        return response.json(result)
    })
})


app.get("/getPollutantsInformation", (request, response) => {
    const query = "SELECT P.pollutant_id, P.name, P.source, P.severity, P.type, GROUP_CONCAT(R.name) AS remedies FROM pollutants AS P JOIN remedies AS R ON P.pollutant_id = R.pollutant_id GROUP BY P.pollutant_id;"
    database.query(query, (error, result) => {
        if(error) {
            console.log(error)
            return response.json(error)
        }
        return response.json(result)
    })
})


app.post("/newRequest", (request, response) => {
    var query = ""
    if(request.body.body_id[0] === "R") {
        query = "INSERT INTO requests (`request_id`, `user_email`, `river_id`, `city`, `state_name`, `content`) VALUES ('', ?, ?, ?, ?, ?);"
    } else {
        query = "INSERT INTO requests (`request_id`, `user_email`, `lake_id`, `city`, `state_name`, `content`) VALUES ('', ?, ?, ?, ?, ?);"
    }
    const values = [
        request.body.user_email,
        request.body.body_id,
        request.body.city,
        request.body.state,
        request.body.content
    ]
    database.query(query, [...values], (error, result) => {
        if(error) {
            console.log(error)
            return response.json(error)
        }
        return response.json(result)
    })
})


app.get("/getUserRequests/:email", (request, response) => {
    var query
    if(request.params.email === "adminAll" || request.params.email === "governmentAll") {
        query = "SELECT * FROM requests;"
    } else {
        query = "SELECT * FROM requests WHERE user_email = ?;"
    }
    database.query(query, request.params.email, (error, result) => {
        if(error) {
            console.log(error)
            return response.json(error)
        }
        return response.json(result)
    })
})


app.get("/getStateNames", (request, response) => {
    const query = "SELECT name FROM states;"
    database.query(query, (error, result) => {
        if(error) {
            console.log(error)
            return response.json(error)
        }
        return response.json(result)
    })
})


app.get("/viewLakeDetails/:lakeID", (request, response) => {
    const query = "CALL GetLakeDetails(?);"
    database.query(query, request.params.lakeID, (error, result) => {
        if(error) {
            console.log(error)
            return response.json(error)
        }

        const data = result[0]
        if(data.length === 0) {
            return response.json([])
        }

        const lakeInfo = {
            lake_id: data[0].lake_id,
            lake_name: data[0].lake_name,
            level_of_pollution: data[0].level_of_pollution,
            location: data[0].location,
            type: data[0].type,
            state_name: data[0].state_name
        }

        const pollutants = {}
        for(var i in data) {
            if(!pollutants[data[i]["pollutant_id"]]) {
                pollutants[data[i]["pollutant_id"]] = {
                    pollutant_id: data[i]["pollutant_id"],
                    pollutant_name: data[i]["pollutant_name"],
                    concentration: data[i]["concentration"],
                    effect: data[i]["effect"],
                    chemical_composition: data[i]["chemical_composition"],
                    source: data[i]["source"],
                    pollutant_type: data[i]["pollutant_type"],
                    severity: data[i]["severity"],
                    remedies: {}
                }
            }
            if(!pollutants[data[i]["pollutant_id"]]["remedies"]["remedy_id"]) {
                pollutants[data[i]["pollutant_id"]]["remedies"][data[i]["remedy_id"]] = {
                    remedy_id: data[i]["remedy_id"],
                    remedy_name: data[i]["remedy_name"],
                    remedy_scale: data[i]["remedy_scale"],
                    remedy_effect: data[i]["remedy_effect"],
                    avg_price : data[i]["remedy_avg_price"]
                }
            }
        }

        return response.json([
            lakeInfo,
            pollutants
        ])
    })
})


app.get("/viewRiverDetails/:riverID", (request, response) => {
    const query = "CALL GetRiverDetails(?);"
    database.query(query, request.params.riverID, (error, result) => {
        if(error) {
            console.log(error)
            return response.json(error)
        }
        
        const data = result[0]
        if(data.length === 0) {
            return response.json([])
        }

        const lakeInfo = {
            river_id: data[0].river_id,
            river_name: data[0].river_name,
            level_of_pollution: data[0].level_of_pollution,
            source: data[0].source,
            destination: data[0].destination
        }

        const pollutants = {}
        for(var i in data) {
            if(!pollutants[data[i]["pollutant_id"]]) {
                pollutants[data[i]["pollutant_id"]] = {
                    pollutant_id: data[i]["pollutant_id"],
                    pollutant_name: data[i]["pollutant_name"],
                    concentration: data[i]["concentration"],
                    effect: data[i]["effect"],
                    chemical_composition: data[i]["chemical_composition"],
                    pollutant_source: data[i]["pollutant_source"],
                    pollutant_type: data[i]["pollutant_type"],
                    severity: data[i]["severity"],
                    remedies: {}
                }
            }
            if(!pollutants[data[i]["pollutant_id"]]["remedies"]["remedy_id"]) {
                pollutants[data[i]["pollutant_id"]]["remedies"][data[i]["remedy_id"]] = {
                    remedy_id: data[i]["remedy_id"],
                    remedy_name: data[i]["remedy_name"],
                    remedy_scale: data[i]["remedy_scale"],
                    remedy_effect: data[i]["remedy_effect"],
                    avg_price : data[i]["remedy_avg_price"]
                }
            }
        }

        return response.json([
            lakeInfo,
            pollutants
        ])
    })
})


app.get("/getTotalBodiesInState", (request, response) => {
    const query = "SELECT name, getTotalBodiesInState(name) AS total_count from states;"
    database.query(query, (error, result) => {
        if(error) {
            console.log(error)
            return response.json(error)
        }
        const counts = {}
        for(var i in result) {
            counts[result[i]["name"]] = result[i]["total_count"]
        }
        return response.json(counts)
    })
})


app.listen(8080, () => {
    console.log("Backend connected")
})