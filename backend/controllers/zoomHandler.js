const jwt = require('jsonwebtoken');
const axios = require("axios");
const { promisify } = require("util");
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
        const token = await checkAndAssignToken(req, res);
        const URL = `https://api.zoom.us/v2/users/me/meetings`;
        const data = JSON.parse(JSON.stringify({
            "topic": req.body.topic,
            "start_time": req.body.start_time,
            "password": req.body.password,
            "agenda": req.body.agenda
        }));
        const zoomRes = await axios.post(URL, data, {
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
        const mid = req.params.mid;
        const token = await checkAndAssignToken(req, res);
        const URL = "https://api.zoom.us/v2/meetings/" + mid;
        const data = JSON.parse(JSON.stringify({
            "topic": req.body.topic,
            "start_time": req.body.start_time,
            "password": req.body.password,
            "agenda": req.body.agenda
        }));
        const zoomRes = await axios.delete(URL, {
            "headers": {
                'User-Agent': 'Zoom-api-Jwt-Request',
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(res.body);
        res.status(parseInt(zoomRes.status)).json({
            status: "success",
            data: "Deleted zoom meeting "+mid
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: 'failed',
            message: error.message
        });
    }
}