import React, { useEffect, useState } from 'react'
import './Main.css'
import withSizes from "react-sizes";
import { RiDeleteBin5Fill } from 'react-icons/ri'
import axios from 'axios';
import MeetLink from "../MeetLink"
const BASE_URL = process.env.REACT_APP_API;
const loadMeets = async (setData) => {
    const meetRes = await axios.get(BASE_URL + "/meets");
    console.log(meetRes.data);
    setData([...meetRes.data.meetups]);
}
function Main(props) {
    const [meetups, setMeetups] = useState([]);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [type, setType] = useState('gmeet');
    const tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    const localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1).substr(0, 16);
    const [dateTime, setDateTime] = useState(localISOTime);
    useEffect(() => {
        loadMeets(setMeetups);
    }, [])
    const deleteMeet = async (id, type) => {
        try {
            const res = (await axios.delete(`${BASE_URL}/meets/${id}?type=${type}`)).data;
            setMeetups(prev => {
                return ([...prev.filter(m => m.id != id)])
            })
            alert(res.data);
        } catch (error) {
            console.log(error)
            const { response } = error;
            if (response) {
                const { request, ...errorObject } = response;
                console.log(errorObject.data.message)
                alert(errorObject.data.message);
            }
        }
    }
    const addMeet = async (e) => {
        e.preventDefault();
        const [date, time] = dateTime.split('T');

        const data = {
            title, type, desc, date, time
        }
        console.log(data);
        try {
            const res = (await axios.post(`${BASE_URL}/meets?type=${type}`, data)).data;
            console.log(res.data);
            setMeetups(prev => [{ ...res.data, id: res.id }, ...prev]);
        } catch (error) {
            const { response } = error;
            const { request, ...errorObject } = response;
            console.log(errorObject.data.message)
            alert(errorObject.data.message);
        }

    }
    return (
        <div style={{justifyContent: "center",display:"flex",alignItems:"center",flexDirection:"column" }}>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{margin:"10px"}}>
  Generate Meeting
</button>
            <div className="col-12 col-md-7 links p-2" style={{ height: props.winHeight, display: "flex", flexDirection: "column", alignItems: "center" }}>
      {meetups.length==0?<h1>No meetings scheduled!</h1>:<>
                {meetups.map(meet => <MeetLink deleteMeet={deleteMeet} key={meet.id} {...meet} />)}</>}
            </div>
            

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel"><legend>Create Meeting</legend></h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <form>
                    <fieldset>

                        <div className="mb-3">
                            <label className="form-label">Meeting Title</label>
                            <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="form-control" placeholder="title" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <input type="text" value={desc} onChange={e => setDesc(e.target.value)} className="form-control" placeholder="description"></input>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Schedule On</label>
                            <input type="datetime-local" min={localISOTime} value={dateTime} onChange={e => {
                                const d = (new Date(e.target.value)).toLocaleDateString().split('/');
                                // d[2]+"-"+d[0]+"-"+d[1]
                                console.log(e.target.value);
                                setDateTime(e.target.value)
                            }} className="form-control" placeholder="description"></input>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">which meeting?</label>
                            <select id="Select" value={type} onChange={e => setType(e.target.value)} className="form-select" aria-label="Default select example">
                                <option value="gmeet">Google meet</option>
                                <option value="zmeet">Zoom</option>
                            </select>
                        </div>

                    </fieldset>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <button type="submit" onClick={addMeet} className="btn btn-info" data-bs-dismiss="modal" style={{ width: "50%" }}>CREATE</button>
                    </div>

                </form>
      
      </div>
      {/* <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div> */}
    </div>
  </div>
</div>
            {/* <div className="col-12 col-md-4 sform" style={{ height: props.windowHeight }}>
            </div>
             */}
        </div>
    )
}
const mapSizesToProps = ({ height, width }) => ({
    winHeight: height,
    winWidth: width,
});
export default withSizes(mapSizesToProps)(Main);