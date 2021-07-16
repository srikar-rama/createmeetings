const azureEnv = require("./azure.env.json");
const axios = require('axios');
console.log(azureEnv);
const FormData = require('form-data');
 
var form = new FormData();
form.append('my_field', 'my value');
const getAccessToken = async ()=>{
	const url = `https://login.microsoftonline.com/${azureEnv.tenantId}/oauth2/token?`;
	console.log(url)
	const form = new FormData();
	form.append('grant_type', `client_credentials`);
	form.append('client_id', `${azureEnv.clientId}`);
	form.append('client_secret', `${azureEnv.clientSecret}`);
	form.append('resource', `https://graph.microsoft.com`);
	// form.append('scope', `https://graph.microsoft.com/Calendars.ReadWrite https://graph.microsoft.com/OnlineMeetings.ReadWrite.All`);
	form.append('scope', `.default`);
	const headers = form.getHeaders();
	headers['Content-Type']='application/x-www-form-urlencoded'
	headers["Content-Length"] = form.getLengthSync()
	const msaRes = await axios.post(url, form , {
		headers: headers

	});
	console.log(msaRes);
	return msaRes.data;
}

const runApi = async () => {

	const token = (await getAccessToken()).access_token;
	// const token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyIsImtpZCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyJ9.eyJhdWQiOiIwMDAwMDAwMi0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9hZWYyYTgyMi1lMjFiLTQzMjEtODFlOC1iOWZiMWU2ODA4MzgvIiwiaWF0IjoxNjI2NDI5MzA4LCJuYmYiOjE2MjY0MjkzMDgsImV4cCI6MTYyNjQzMzIwOCwiYWlvIjoiRTJaZ1lMQmF1V25qcG12c2NhYlhJOTliSmt3c0FRQT0iLCJhcHBpZCI6IjU5OTYxMDA4LTAyMTYtNGJjZC04YzFhLThhMmQ3NzcyYzA4NyIsImFwcGlkYWNyIjoiMSIsImlkcCI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0L2FlZjJhODIyLWUyMWItNDMyMS04MWU4LWI5ZmIxZTY4MDgzOC8iLCJvaWQiOiJkYTRmMWYwZS02YmYwLTRlNGQtYTliNC1jYTY3Njc1MGFhNzkiLCJyaCI6IjAuQVVrQUlxanlyaHZpSVVPQjZMbjdIbWdJT0FnUWxsa1dBczFMakJxS0xYZHl3SWRKQUFBLiIsInN1YiI6ImRhNGYxZjBlLTZiZjAtNGU0ZC1hOWI0LWNhNjc2NzUwYWE3OSIsInRlbmFudF9yZWdpb25fc2NvcGUiOiJBUyIsInRpZCI6ImFlZjJhODIyLWUyMWItNDMyMS04MWU4LWI5ZmIxZTY4MDgzOCIsInV0aSI6IjNtZkFTRFFWSjB1TUVRV3RiZzJfQUEiLCJ2ZXIiOiIxLjAifQ.BWYW6Fm-mejhNTL_TgLEBQ_K-EJEqrUwK3mY5-eq6FoixWeixThqiHZzB3LvrvPha01jQvIFeaGJ_1fxykmEAPjVHamr-63m1pUd22RBsxN8jtk1ixWzMLG-AXsD9qlNkF2W1K7yX7dM2fuuwf_Yhe-SRtO1ShZoGXSjFX_Pa3sKAlZ50LhD5M_pfA_1JWSC8pkqdeX9oAFB7gEkpIe4izruOqHZGzu7fyXXTxTqKCAjYGmAT3vKo92ubdCvMsh8TEKAM79NdKbsHcpUu8ztXNO5gr3c9xKY0XXgFt_npDQ0pJ9O3AEgNgnj99p_wZ0CrCbjkKaRYCKX8MXXBm4J2A`
	console.log(token)
	const url = `https://graph.microsoft.com/v1.0/me/events`
	const data = {"subject":"My event","start":{"dateTime":"2021-07-14T22:17:22.535Z","timeZone":"UTC"},"end":{"dateTime":"2021-07-21T22:17:22.535Z","timeZone":"UTC"},"allowNewTimeProposals":true,"isOnlineMeeting":true,"onlineMeetingProvider":"teamsForBusiness"};
	const r = await axios.post(url,  data, {
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type':"application/json"
		}
	});
	console.log(r)
};
runApi();