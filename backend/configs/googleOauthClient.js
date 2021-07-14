const { google } = require('googleapis');
const { OAuth2 } = google.auth;
//setting details 
let oAuth2Client = new OAuth2(
    '386996358660-eiubaaosp36vl490aj9rqfk8e36sskkh.apps.googleusercontent.com',
    'FhWr8FdYCb0Tp7WKqBC7Xuvq'
)

oAuth2Client.setCredentials({
    refresh_token: '1//04YruVX3Tvm4sCgYIARAAGAQSNwF-L9IrsFCG6mpU4AzIlpC6ukB-1BTRPX2MevhxhEE8UwVC2QOGKL3FOxgJkl1unftJ_w1eKjw'
});

module.exports = oAuth2Client;