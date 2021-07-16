import React from 'react'
import './Main/Main.css'
const TYPES = {
    'gmeet': "Google Meet",
    'zmeet': "Zoom"
}
const MeetLink = ({ id, type, title, meetLink, cred_req, password, duration, desc, start_time, end_time, date, time, deleteMeet }) => {
    return (
        <div className="card col-11 p-2 mb-2 meetinglink" style={{ height: "fit-content" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h4 style={{ color: "black" }}>{title}</h4>
                <h5>Venue: <span style={{ color: "black" }}>{TYPES[type]}</span></h5>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h6 style={{ color: "black", marginRight: "2px" }}>Duration: <span style={{ color: "blue" }}>{duration}</span></h6>
                <div style={{ position: "absolute", display: "flex", right: "0" }}>
                    <h6 style={{ marginRight: "2px" }}>{new Date(start_time).toLocaleString()}-</h6>
                    <h6 style={{ marginRight: "2px" }}>{new Date(start_time + 2700000).toLocaleString()}</h6>
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button className="btn btn-primary" href={meetLink} target="_blank" style={{ width: "49%" }}>JOIN</button>
                <button className="btn btn-danger" onClick={(e) => {e.preventDefault();deleteMeet(id, type)}} style={{ width: "49%" }}>DELETE</button>
            </div>
        </div>
    )
}

export default MeetLink
