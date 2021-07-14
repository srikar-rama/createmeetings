// date : "2020-12-01",
// time : "10:59",
// summary : 'summary',
// location : 'location',
// description : 'description'
const { google } = require('googleapis');
const oAuth2Client = require("../configs/googleOauthClient");
const db = require("../dbConfig/dbCon");
const SCOPES = ['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/calendar.events'];
async function meet(options) {
    //upper part for api access

    var date1 = options.date + "T" + (options.time).split(":")[0] + ":00" + ":30";
    var date2 = options.date + "T" + (options.time).split(":")[0] + ":45" + ":30";


    var x = new Date(options.date + "T" + (options.time).split(":")[0] + ":00" + ":30");
    var y = new Date(options.date + "T" + (options.time).split(":")[0] + ":45" + ":30");


    var end1 = options.date + "T" + (x.getUTCHours()) + ":" + (x.getUTCMinutes()) + ":00" + ".000Z";
    var end2 = options.date + "T" + (y.getUTCHours()) + ":" + (y.getUTCMinutes()) + ":00" + ".000Z";


    // Create a new calender instance.
    let calendar = google.calendar({ version: 'v3', auth: oAuth2Client })


    //checking whether busy schedule or not
    let result = await calendar.events.list({
        calendarId: 'primary',
        timeMin: end1,
        timeMax: end2,
        maxResults: 1,
        singleEvents: true,
        orderBy: 'startTime',
    });



    let events = result.data.items;
    if (events.length) {
        console.log("you are busy for this time slot !");
        return null;
    }

    //checking end



    // Create a new event start date instance for teacher in their calendar.
    const eventStartTime = new Date();
    eventStartTime.setDate((options.date).split("-")[2]);
    const eventEndTime = new Date();
    eventEndTime.setDate((options.date).split("-")[2]);
    eventEndTime.setMinutes(eventStartTime.getMinutes() + 45);



    // Create a dummy event for temp users in our calendar
    const event = {
        summary: options.summary,
        location: options.location,
        description: options.description,
        colorId: 1,
        conferenceData: {
            createRequest: {
                requestId: "zzz",
                conferenceSolutionKey: {
                    type: "hangoutsMeet"
                }
            }
        },
        start: {
            dateTime: date1,
            timeZone: 'Asia/Kolkata',
        },
        end: {
            dateTime: date2,
            timeZone: 'Asia/Kolkata',
        },
    }


    // calendar.events.delete({})
    let link = await calendar.events.insert({
        calendarId: 'primary',
        conferenceDataVersion: '1',
        resource: event
    })
    console.log(link.data);
    return link.data;

}


module.exports.create = async (req, res) => {
    try {
        // yyyy-mm-dd
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
        const options = {
            date: date,
            time: time,
            summary: title,
            location: loc,
            description: desc
        };
        const createdMeet = await meet(options);
        if (!createdMeet) {
            res.status(400).json({
                status: "failed",
                message: "Busy schedule"
            })
            return;
        }
        console.log(createdMeet);
        let start_time = new Date(date);
        const [hrs, mins] = time.split(":");
        start_time.setHours(hrs, mins);
        let end_time = new Date(start_time);
        end_time.setMinutes(45);
        end_time = end_time.getTime();
        start_time = start_time.getTime();
        const meetData = {
            type: 'gmeet',
            eventId: createdMeet.id,
            meetLink: createdMeet.hangoutLink,
            cred_req: false,
            title: title,
            desc: desc,
            loc: loc,
            date: date,
            time: time,
            start_time: start_time,
            end_time: end_time,
            duration: "45min",
            created_on: Date.now()
        }
        const meetDocRef = await db.collection('meetups').add(JSON.parse(JSON.stringify(meetData)));
        console.log(meetDocRef);
        res.status(200).json({
            status: "success",
            id: meetDocRef.id,
            data: meetData
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message
        })
    }

}
module.exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            res.status(400).json({
                status: "failed",
                message: "id is required"
            });
            return;
        }
        const meetRef = await db.collection('meetups').doc(id).get();
        const isMeetExists = await meetRef.exists;
        if (!isMeetExists) {
            res.status(400).json({
                status: "failed",
                message: "Meet does not exist"
            });
            return;
        }
        const { eventId } = await meetRef.data();
        const options = {
            calendarId: "primary",
            eventId: eventId
        };
        const deletedMeet = await google.calendar({ version: "v3", auth: oAuth2Client }).events.delete(options);
        if (!deletedMeet) {
            res.status(400).json({
                status: "failed",
                message: "No such eventId found"
            })
            return;
        }
        const delMeetRef = await db.collection('meetups').doc(id).delete();
        res.status(200).json({
            status: "success",
            data: "Deleted Successfully"
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message
        })
    }

}


// module.exports.getAll = async (req, res) => {
//     try {
//         const options = {
//             calendarId: "primary"
//         };
//         const deletedMeet = await google.calendar({version: "v3", auth: oAuth2Client}).events.list;
//         if (!deletedMeet) {
//             res.status(400).json({
//                 status: "failed",
//                 message: "No such eventId found"
//             })
//             return;
//         }
//         res.status(200).json({
//             status: "success",
//             data: "Deleted Successfully"
//         })
//     } catch (error) {
//         res.status(400).json({
//             status: "failed",
//             message: error.message
//         })
//     }

// }
