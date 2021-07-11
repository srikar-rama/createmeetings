// date : "2020-12-01",
// time : "10:59",
// summary : 'summary',
// location : 'location',
// description : 'description'

async function meet(options) {
    const { google } = require('googleapis');
    const { GoogleAuth } = google.auth;
    const SCOPES = ['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/calendar.events'];


    //upper part for api access

    var date1 = options.date + "T" + (options.time).split(":")[0] + ":00" + ":30";
    var date2 = options.date + "T" + (options.time).split(":")[0] + ":45" + ":30";


    var x = new Date(options.date + "T" + (options.time).split(":")[0] + ":00" + ":30");
    var y = new Date(options.date + "T" + (options.time).split(":")[0] + ":45" + ":30");


    var end1 = options.date + "T" + (x.getUTCHours()) + ":" + (x.getUTCMinutes()) + ":00" + ".000Z";
    var end2 = options.date + "T" + (y.getUTCHours()) + ":" + (y.getUTCMinutes()) + ":00" + ".000Z";



    //setting details for auth
    new google.auth.GoogleAuth({
        keyFile: '../dbConfig/serviceAccount.json',
        scopes: SCOPES,
    });
    let auth = new GoogleAuth({
        keyFile: './dbConfig/serviceAccount.json',
        scopes: SCOPES,
    })
    // auth.setCredentials({
    //     refresh_token: options.refreshToken,
    // });

    // Create a new calender instance.
    let calendar = google.calendar({ version: 'v3', auth: auth })


    //checking whether teacher is budy or not
    let result = await calendar.events.list({
        calendarId: 'primary',
        timeMin: end1,
        timeMax: end2,
        maxResults: 1,
        singleEvents: true,
        orderBy: 'startTime',
    });



    let events = result.data.items;
    // if (events.length) {
    //     console.log("you are busy for this time slot !");
    //     return null;
    // }

    //checking end



    // Create a new event start date instance for teacher in their calendar.
    const eventStartTime = new Date();
    // eventStartTime.setDate(parseInt((options.date).split("-")[2]));
    const eventEndTime = new Date();
    // eventEndTime.setDate(parseInt((options.date).split("-")[2]));
    // eventEndTime.setHours(parseInt(options.time.split(':')[0]))
    eventEndTime.setMinutes(eventEndTime.getMinutes() + 45);
    // eventEndTime.setMinutes(eventStartTime.getMinutes() + 45);
    console.log(eventEndTime.toLocaleTimeString())
    console.log(eventStartTime.toLocaleTimeString())
    const padLeadingZeros = (num, size) => {
        var s = num + "";
        while (s.length < size) s = "0" + s;
        return s;
    }
    const startTime = `${eventStartTime.getFullYear()}-${padLeadingZeros(eventStartTime.getMonth() + 1, 2)}-${padLeadingZeros(eventStartTime.getDate(), 2)}T${padLeadingZeros(eventStartTime.getHours(), 2)}:${padLeadingZeros(eventStartTime.getMinutes(), 2)}:${padLeadingZeros(eventStartTime.getSeconds(), 2)}Z`;
    const endTime = `${eventEndTime.getFullYear()}-${padLeadingZeros(eventEndTime.getMonth() + 1, 2)}-${padLeadingZeros(eventEndTime.getDate(), 2)}T${padLeadingZeros(eventEndTime.getHours(), 2)}:${padLeadingZeros(eventEndTime.getMinutes(), 2)}:${padLeadingZeros(eventEndTime.getSeconds(), 2)}Z`
    console.log(startTime)
    console.log(endTime)
    // Create a dummy event for temp users in our calendar
    const event = {
        summary: options.summary,
        location: options.location,
        description: options.description,
        visibility: 'public',
        anyoneCanAddSelf:true,
        "conferenceProperties": {
            "allowedConferenceSolutionTypes": [
                "hangoutsMeet", "eventNamedHangout", "eventHangout"
            ]
        },
        colorId: 1,
        conferenceData: {
            conferenceId: "abc-xbh-oj",
            createRequest: {
                requestId: "azazazazjazkjazkj",
                conferenceSolutionKey: {
                    type: "hangoutsMeet"
                },
                conferenceSolution: {
                
                key: {
                    type: "hangoutsMeet"
                }
            }
            },
            conferenceSolution: {
                key: {
                    type: "hangoutsMeet"
                }
            },
            conferenceSolutionKey: {
                type: "hangoutsMeet"
            }
        },
        start: {
            dateTime: startTime,
            timeZone: 'Asia/Kolkata',
        },
        end: {
            dateTime: endTime,
            timeZone: 'Asia/Kolkata',
        },
    }



    let link = await calendar.events.insert({
        calendarId: 'primary',
        conferenceDataVersion: '1',
        visibility: "public",
        id: "32434345",
        organizer:{email:"azharuddinm2211@gmail.com",
        self:false},
        conferenceData: {
            conferenceId: "abc-xbh-oj",
            createRequest: {
                requestId: "azazazazjazkjazkj",
                conferenceSolutionKey: {
                    type: "hangoutsMeet"
                }
            },
            conferenceSolution: {
                key: {
                    type: "hangoutsMeet"
                }
            },
            conferenceSolutionKey: {
                type: "hangoutsMeet"
            }
        },
        resource: event,
        ...event
    })
    console.log(link.data)
    return link.data.htmlLink

}

module.exports.create = async (req, res) => {
    try {
        // yyyy-mm-dd
        const options = {
            date: "2021-07-11",
            time: "22:00",
            summary: 'summary',
            location: 'location',
            description: 'description'
        };
        const createdMeet = await meet(options);
        if (!meet) {
            res.status(500).json({
                status: "failed",
                message: "No response from server"
            })
            return;
        }
        console.log(createdMeet);
        res.status(200).json({
            status: "success"
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message
        })
    }

}
