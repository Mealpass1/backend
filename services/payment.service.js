// const Ravepay = require('ravepay');
// require('dotenv').config();

// const rave = new Ravepay(process.env.PUBLICK_KEY,process.env.SECRET_KEY,process.env.PRODUCTION_FLAG);


// module.exports.MoMoPayment = async()=>{
//     try{
//         const payload ={
//             "tx_ref": "MC-158523s09v5050e8", //This is a unique reference, unique to the particular transaction being carried out. It is generated when it is not provided by the merchant for every transaction.
//             "order_id": "USS_URG_893982923s2323", //Unique ref for the mobilemoney transaction to be provided by the merchant
//             "amount": "100",
//             "currency": "RWF",
//             "email": "benedictokoliechinedu@gmail.com",
//             "phone_number": "0780178459",
//             "fullname": "Benedict Chinedu"
//         }
//         const response = await flw.MobileMoney.rwanda(payload);
//         if(response){
//             return response;
//             console.log(response);
//         }
//         return false;
//     }
//     catch(err){
//         return err;
//     }
// }

// module.exports.CardPayment = (data)=>{
//    rave.Card.charge({
//       "cardno":data.cardno,
//       "cvv":data.cvv,
//       "expirymonth":data.expirymonth,
//       "expiryyear": data.expiryyear,
//       "currency": data.currency,
//       "country": data.country,
//       "amount": data.amount,
//       "pin": data.pin,
//       "suggested_auth": data.suggested_auth,
//       "email": data.email,
//       "phonenumber": data.phonenumber,
//       "firstname": data.firstname,
//       "lastname": data.lastname,
//       "IP": data.IP,
//       "txRef": "MC-" + Date.now(),
//       "meta": [{metaname: "flightID", metavalue: "123949494DC"}],
//       "redirect_url": "https://rave-webhook.herokuapp.com/receivepayment",
//       "device_fingerprint": "69e6b7f0b72037aa8428b70fbe03986c"
//    }).then((response)=>{
//        console.log(response.body);
//    })
// }

//  function Testing() {
//     const fetch = require('node-fetch');
// const url = 'https://api.flutterwave.com/v3/charges?type=mobile_money_rwanda';

// const options = {
//     method:'POST',
//     headers:{
//         Accept:'application/json',
//          Authorization:'FLWSECK-8172d4e90e873f76c201605bba8777e0-X',
//          'Content-Type':'application/json'
//     },
//     body: JSON.stringify({
//         amount:100,
//         currency: 'RWF',
//         email: ' benedictokoliechinedu@gmail.com',
//         tx_ref: 'MC-3243e',
//         order_id: 'USS_URG_893982923s2323',
//         fullname: 'benedictokoliechinedu@gmail.com',
//         phone_number: '0780178459',
//     })
// };
//  fetch(url,options).then(res=>{
//     console.log("Response", res.json())
// })
// }

// Testing();

const fetch = require('node-fetch')
const url = 'https://api.flutterwave.com/v3/charges?type=mobile_money_rwanda'


module.exports.MoMoPayment = async () => {
    const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer FLWSECK_TEST-SANDBOXDEMOKEY-X',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            amount: 100,
            currency: 'RWF',
            email: ' benedictokoliechinedu@gmail.com',
            tx_ref: Date.now(),
            order_id: 'USS_URG_893982923s2323',
            fullname: 'Benedict C.Okolie',
            phone_number: '0780178459',
        })
    }
    const response = fetch(url, options)
    console.log(await response)
    return response
}
