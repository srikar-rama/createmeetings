const gMeetHandler = require("./gMeetHandler");
const teamsHandler = require("./teamsHandler");
const zoomHandler = require("./zoomHandler");
const db = require("../dbConfig/dbCon");
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
    const { id } = req.params;
    const { type } = req.query;
    if (!id) {
        res.status(400).json({
            status: "failed",
            message: "id required as params"
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
    // const { type } = req.query;
    // if (type === MEET_TYPES.GMEET) {
    //     await gMeetHandler.getAll(req, res);
    //     return;
    // }
    // if (type === MEET_TYPES.ZMEET) {
    //     await zoomHandler.getAll(req, res);
    //     return;
    // }
    // if (type === MEET_TYPES.TMEET) {
    //     await teamsHandler.getAll(req, res);
    //     return;
    // }
    const now = Date.now();
    try {
        // removing expired ones
        const expiredRefs = await db.collection("meetups").where('end_time', '<', now).get();
        const expiredDocs = expiredRefs.docs;
        console.log(now);
        for (let doc of expiredDocs) {
            console.log(doc.id)
            const d = doc.data();
            console.log("ENDTIME: "+d.end_time);
            await db.collection('meetups').doc(doc.id).delete();
        }
        const meetups = await (await db.collection("meetups").orderBy('end_time', 'desc').get()).docs;
        const data = [];
        for (let doc of meetups) {
            data.push({
                id: doc.id,
                ...doc.data()
            });
        }
        res.status(200).json({
            status: "success",
            meetups: data
        });
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message
        })
    }
}