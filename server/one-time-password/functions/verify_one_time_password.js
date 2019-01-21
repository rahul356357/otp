const admin = require('firebase-admin');

module.exports = (req , res)=>{
    if(!req.body.phone ||!req.body.code ){
        res.status(422).send({error:'Phone and Code must be provided'});
    }
    const phone = String(req.body.phone).replace(/[^\d]/g ,'');
    const code = parseInt(req.body.code);
    admin.auth().getUser(phone)
    .then(()=>{ 
        const ref = admin.database().ref('users/'+phone);
            ref.on('value' , snapshot=>{
                ref.off();
                const user = snapshot.val();    
                if(user.code !==code || !user.codeValid){
                    res.status(422).send({error:'Code Not Valid'})
                } 
                ref.update({codeValid:false});
                // eslint-disable-next-line promise/no-nesting
                admin.auth().createCustomToken(phone)
                .then(token=>{
                    res.send({token})
                    return true
                }).catch(err=>{
                    res.send({error:err})
                });
                return true
            });
            return true
    }).catch(err=>{
        res.send({error:err})
    })
}