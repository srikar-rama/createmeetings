async function meet(options) {
    const { google } = require('googleapis');
    const { GoogleAuth, OAuth2 } = google.auth;
    const REFRESH_TOKEN = "1//04zqoJgzBNub1CgYIARAAGAQSNwF-L9IrK4vqVXblLC0OFNEMHl5p70fWBEITncdkF6_zIbLoaj5juD_EGAyG-kqG-1LuURNU3xo";
    const SCOPES = ['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/calendar.events'];


    //upper part for api access

    var date1 = options.date + "T" + (options.time).split(":")[0] + ":00" + ":30";
    var date2 = options.date + "T" + (options.time).split(":")[0] + ":45" + ":30";


    var x = new Date(options.date + "T" + (options.time).split(":")[0] + ":00" + ":30");
    var y = new Date(options.date + "T" + (options.time).split(":")[0] + ":45" + ":30");


    var end1 = options.date + "T" + (x.getUTCHours()) + ":" + (x.getUTCMinutes()) + ":00" + ".000Z";
    var end2 = options.date + "T" + (y.getUTCHours()) + ":" + (y.getUTCMinutes()) + ":00" + ".000Z";



    //setting details for auth
    // new google.auth.GoogleAuth({
    //     keyFile: '../dbConfig/serviceAccount.json',
    //     scopes: SCOPES,
    // });
    // let auth = new GoogleAuth({
    //     keyFile: './dbConfig/serviceAccount.json',
    //     scopes: SCOPES,
    // })
    const oAuth2Client = new OAuth2(
        '386996358660-eiubaaosp36vl490aj9rqfk8e36sskkh.apps.googleusercontent.com',
        'FhWr8FdYCb0Tp7WKqBC7Xuvq'
    )

    // Call the setCredentials method on our oAuth2Client instance and set our refresh token.
    oAuth2Client.setCredentials({
        refresh_token: '1//04YruVX3Tvm4sCgYIARAAGAQSNwF-L9IrsFCG6mpU4AzIlpC6ukB-1BTRPX2MevhxhEE8UwVC2QOGKL3FOxgJkl1unftJ_w1eKjw',
    })

    // auth.setCredentials({
    //     refresh_token: options.refreshToken,
    // });
    console.log('kk');
    // Create a new calender instance.
    let calendar = google.calendar({ version: 'v3', auth: oAuth2Client })

    console.log('kk calender');
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
        anyoneCanAddSelf: true,
        "conferenceProperties": {
            "allowedConferenceSolutionTypes": [
                "hangoutsMeet", "eventNamedHangout", "eventHangout"
            ]
        },
        colorId: 1,
        conferenceData: {
            conferenceData: {
                createRequest: {
                    requestId: "1hi6ih31en5imq717o6em4i6fk"+Date.now(),
                    conferenceSolutionKey: {
                        type: "hangoutsMeet"
                    }
                }
            },
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
        calendarId: '1hi6ih31en5imq717o6em4i6fk@group.calendar.google.com',
        conferenceDataVersion: '1',
        visibility: "public",
        resource: event
    })
    console.log(link.data)
    return link.data.htmlLink

}