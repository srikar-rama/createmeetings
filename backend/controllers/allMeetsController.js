const gMeetHandler = require("./gMeetHandler");
const teamsHandler = require("./teamsHandler");
const zoomHandler = require("./zoomHandler");
const MEET_TYPES = { GMEET: "gmeet", ZMEET: "zmeet", TMEET: "tmeet" };

module.exports.create = async (req, res) => {
    const { type } = req.query;
    if (type === MEET_TYPES.GMEET) {
        await gMeetHandler.create(req, res);
        return;
    }
    if (type === MEET_TYPES.ZMEET) {
        await zoomHandler.create(req, res);
        return;
    }
    if (type === MEET_TYPES.TMEET) {
        await teamsHandler.create(req, res);
        return;
    }
    res.status(400).json({
        status: "failed",
        message: "invalid 'type' of meet"
    })
}

module.exports.delete = async (req, res) => {
    const { mid } = req.params;
    const { type } = req.query;
    if(!mid){
        res.status(400).json({
            status: "failed",
            message: "meetingId required as params"
        })
    }
    if (type === MEET_TYPES.GMEET) {
        await gMeetHandler.delete(req, res);
        return;
    }
    if (type === MEET_TYPES.ZMEET) {
        await zoomHandler.delete(req, res);
        return;
    }
    if (type === MEET_TYPES.TMEET) {
        await teamsHandler.delete(req, res);
        return;
    }
    res.status(400).json({
        status: "failed",
        message: "invalid 'type' of meet"
    })
}

module.exports.getAll = async (req, res) => {
    const { type } = req.query;
    if (type === MEET_TYPES.GMEET) {
        await gMeetHandler.getAll(req, res);
        return;
    }
    if (type === MEET_TYPES.ZMEET) {
        await zoomHandler.getAll(req, res);
        return;
    }
    if (type === MEET_TYPES.TMEET) {
        await teamsHandler.getAll(req, res);
        return;
    }
    res.status(400).json({
        status: "failed",
        message: "invalid 'type' of meet"
    })
}