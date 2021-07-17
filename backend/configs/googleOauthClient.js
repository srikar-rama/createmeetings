const { google } = require('googleapis');
const { OAuth2 } = google.auth;
//setting details 
let oAuth2Client = new OAuth2(
    '516079349358-8cuthef3p7tlmk5sp79rh8um9l7k497v.apps.googleusercontent.com',
    'mT9cDAQc1ZdnYdZYN82Z6exe'
)

oAuth2Client.setCredentials({
    refresh_token: '1//04eStJ0_1K8uQCgYIARAAGAQSNwF-L9IrZrmSgbvwl39Ll4C6GuFPo_vKwpKS-57CtIIE-kFEyxZJ14MBks4EUrAzyGHU092hsuA'
});

module.exports = oAuth2Client;