const jwt = require('jsonwebtoken');
const axios = require("axios");
const { promisify } = require("util");
const db = require("../dbConfig/dbCon");
// if no token default empty string
const getTokenOrGenerate = async (prevToken) => {
    if (!prevToken) {
        const payload = {
            iss: process.env.APIKey
        };
        const token = await jwt.sign(payload, process.env.APISecret, {
            expiresIn: '1d'
        });
        return token;
    }
    const decodedToken = await promisify(jwt.verify)(prevToken, process.env.APISecret);
    console.log(decodedToken);
    if (decodedToken) {
        const payload = {
            iss: process.env.APIKey
        };
        const token = jwt.sign(payload, process.env.APISecret, {
            expiresIn: '1d'
        });
        return token;
    }

}
const checkAndAssignToken = async (req, res) => {
    let prevToken;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        prevToken = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
        prevToken = req.cookies.jwt;
    }
    const token = await getTokenOrGenerate(prevToken);
    res.cookie("jwt", token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: "none",
        secure: true
    });
    return token;
}

module.exports.create = async (req, res) => {
    try {
        const { date, time, title, loc, desc, } = req.body;
        if (!date || !time || !title) {
            res.status(400).json({
                status: "failed",
                message: "date, time, title are required"
            });
            return;
        }
        const dateReg = new RegExp('([1-9]{1,1}[0-9]{3,3})-([0-1]{1,1}[0-9]{1,1})-([0-1]{1,1}[0-9]{1,1})');
        const timeReg = new RegExp('([0-9]{1,1}[0-9]{1,1}):([0-9]{1,1}[0-9]{1,1})');
        if (!dateReg.test(date) || !timeReg.test(time)) {
            res.status(400).json({
                status: "failed",
                message: "improper date or time formats"
            });
            return;
        }
        let start_time = new Date(date);
        const [hrs, mins] = time.split(":");
        start_time.setHours(hrs, mins);
        let end_time = new Date(start_time);
        // end_time.setMinutes(45);
        end_time = end_time.getTime()+2700000;
        const now = Date.now();
        const prevMeetRefs = await db.collection('meetups').where('type', '==', 'zmeet').where('start_time', '<=', start_time.getTime()).get();
        if(!prevMeetRefs.empty){
            const expDocs = prevMeetRefs.docs;
            let leave = false;
            for(let doc of expDocs){
                const d = doc.data();
                if(d.end_time <= now){
                    await db.collection('meetups').doc(doc.id).delete();
                }
                if(start_time.getTime() < d.end_time){
                    leave = true;
                }
            }
            if(leave){
            res.status(400).json({
                status:"failed",
                message:"Busy time"
            });
            return;
        }
        }
        const token = await checkAndAssignToken(req, res);
        const URL = `https://api.zoom.us/v2/users/me/meetings`;
        const data = JSON.parse(JSON.stringify({
            "topic": title,
            "start_time": start_time.toLocaleString(),
            duration: 45,
            timezone: 'Asia/Kolkata',
            "agenda": desc
        }));
        start_time = start_time.getTime();
        const zoomRes = await axios.post(URL, data, {
            "headers": {
                'User-Agent': 'Zoom-api-Jwt-Request',
                'content-type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        });
        const meetData = {
            type: 'zmeet',
            eventId: zoomRes.data.id,
            meetLink: zoomRes.data.start_url,
            cred_req: true,
            password: zoomRes.data.password,
            title: zoomRes.data.topic,
            desc: zoomRes.data.agenda,
            date: date,
            time: time,
            start_time: start_time,
            end_time: end_time,
            duration: zoomRes.data.duration + "min",
            created_on: Date.now()
        }
        const meetDocRef = await db.collection('meetups').add(JSON.parse(JSON.stringify(meetData)));
        res.status(parseInt(zoomRes.status)).json({
            status: "success",
            id: meetDocRef.id,
            data: meetData
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: 'failed',
            message: error.message
        });
    }
}

module.exports.getAll = async (req, res) => {
    try {
        const token = await checkAndAssignToken(req, res);
        const URL = "https://api.zoom.us/v2/users/me/meetings";
        const data = JSON.parse(JSON.stringify({
            "topic": req.body.topic,
            "start_time": req.body.start_time,
            "password": req.body.password,
            "agenda": req.body.agenda
        }));
        const zoomRes = await axios.get(`${URL}?status=active`, {
            "headers": {
                'User-Agent': 'Zoom-api-Jwt-Request',
                'content-type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        });
        res.status(parseInt(zoomRes.status)).json({
            status: zoomRes.statusText,
            data: zoomRes.data
        });
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message
        });
    }

}

module.exports.delete = async (req, res) => {
    try {
        const mid = req.params.id;
        if (!mid) {
            res.status(400).json({
                status: "failed",
                message: "provide id"
            })
            return;
        }
        const meetRef = await db.collection("meetups").doc(mid).get();
        if (!meetRef.exists) {
            res.status(400).json({
                status: "failed",
                message: "No such meet exists"
            })
            return;
        }
        const { eventId } = meetRef.data();
        const token = await checkAndAssignToken(req, res);
        const URL = "https://api.zoom.us/v2/meetings/" + eventId;
        const zoomRes = await axios.delete(URL, {
            "headers": {
                'User-Agent': 'Zoom-api-Jwt-Request',
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const delMeet = await db.collection("meetups").doc(mid).delete();
        res.status(200).json({
            status: "success",
            data: "Deleted zoom meeting " + mid
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: 'failed',
            message: error.message
        });
    }
}