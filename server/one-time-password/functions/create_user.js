
const admin = require('firebase-admin');
module.exports = (req, res) => {
    // verify the user provided a phone number to remove dashes and params
    //respond to the user request account was made
    const { phone } = req.body
    if (!phone) {
        res.status(422).send({ error: 'Bad Input' })
    }
    const phoneNo = String(phone).replace(/[^\d]/g, '');
    admin.auth().createUser({ uid: phoneNo })
        .then((user) => {
            res.send(user);
            return true
        }).catch(err => {
            res.status(422).send({ error: err })
        })

};

