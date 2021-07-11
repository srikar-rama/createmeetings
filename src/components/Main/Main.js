import React from 'react'
import './Main.css'
import withSizes from "react-sizes";
import { RiDeleteBin5Fill } from 'react-icons/ri'
function Main(props) {
    return (
        <div className="row p-3" style={{ justifyContent: "space-around"}}>
            <div className="col-12 col-md-7 links p-2" style={{ height: props.winHeight, display: "flex", justifyContent: "center" }}>
                <div className="card col-11 p-2 meetinglink" style={{ height: "fit-content" }}>
                   <div style={{display:"flex",justifyContent:"space-between"}}>
                   <h4 style={{color:"black"}}>Title of the meet</h4>
                    <h5>Venue: <span style={{color:"black"}}>Google meet</span></h5>
                   </div>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                        <button className="btn btn-primary" style={{width:"49%"}}>Join</button>
                        <button className="btn btn-danger"style={{width:"49%"}}>Delete</button>
                    </div>
                </div>
            </div>

            <div className="col-12 col-md-4 sform" style={{ height: props.windowHeight }}>
                <form>
                    <fieldset disabled>
                        <legend>Create Meeting</legend>
                        <div class="mb-3">
                            <label class="form-label">Meeting Title</label>
                            <input type="text" class="form-control" placeholder="title"></input>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Description</label>
                            <input type="text" class="form-control" placeholder="description"></input>
                        </div>
                        <div class="mb-3">
                            <label for="disabledSelect" class="form-label">which meeting?</label>
                            <select id="Select" class="form-select">
                                <option>Google meet</option>
                                <option>Zoom</option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary">Create</button>
                    </fieldset>
                </form>
            </div>
        </div>
    )
}
const mapSizesToProps = ({ height, width }) => ({
    winHeight: height,
    winWidth: width,
});
export default withSizes(mapSizesToProps)(Main);