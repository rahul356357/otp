const admin = require('firebase-admin');
const twilio = require('./twilio');
module.exports = (req, res) => {
    if (!req.body.phone) {
        return res.status(422).send({ error: 'You must provide a phone number' })
    }
    const phone = String(req.body.phone).replace(/[^\d]/g, '');
    admin.auth().getUser(phone)
        .then(userRecord => {
            const code = Math.floor((Math.random() * 8999 + 1000));
            twilio.messages.create({
                body: 'Your code is ' + code,
                to: `+91${phone}`,
                from: '+14702841409'
            }, (err) => {
                if (err) {
                    res.status(422).send({ error: err })
                }
                admin.database().ref('users/' + phone)
                    .update({ code: code, codeValid: true }, () => {
                        res.status(200).send({ sucess: true })
                    })
            })
            return true
        }).catch(err => {
            res.status(422).send({ error: err })
        })

}