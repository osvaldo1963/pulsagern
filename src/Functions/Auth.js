const Parse  = require('parse/react-native')
const {toDataUrl} = require('./Functions')
const sha512 = require('js-sha512').sha512;
//Data types parameters
//(email: String, password: String, callback: Function())
const LogIn =  (email, password, callbak) => {
    Parse.User.logIn(email, password).then( (result) => {
        callbak(null, result)
        return
    }).catch((err) => {
        callbak(err, null)
        return
    })
}
//Prameter Data Types 
//(email: String, password: String, username: String, facebook: Boolean, google: Boolean, company: Boolean,  )
//
const SignUp = (email, password, username, facebook, google, company, callbak) => {
    toDataUrl('https://grandlodgeofvirginia.org/wp-content/uploads/blank-profile.jpg', (base64Image) => {
        var file = new Parse.File("myfile.png", {base64: base64Image})
        file.save().then( async (pic) => {
            const user = new Parse.User()
            user.set('email', email)
            user.set('username', email)
            user.set('password', password)
            user.set('lastname', '')
            user.set('name', '')
            user.set('companyAccount', company)
            user.set('fbAccount', facebook)
            user.set('googleAccount', google)
            user.set('handle', username)
            user.set('profilePicture', pic)
            try {
                await user.signUp()
                callbak(null, user)
                //this.goToHomePage()
            } catch(err) {
                callbak('singUp Error: '+err, null)
            }
        }).catch((err) => {
            callbak('picture upload Error: '+err, null)
        })
    })
}

const socialMediaLogIn = (email, password, username, facebook, google, company, callbak) => {
    var passSha512 = sha512(email)
    LogIn(email, passSha512, (err, result) => {
        if(err === null) {
            callbak(null, result)
            return 
        } else {
            SignUp(email, passSha512, username, facebook, google, company, (err, singUpResult) => {   
                if(err === null) {
                    callbak(null, singUpResult)
                    return
                } else {
                    callbak(err, null)
                    return
                }
            })
        }
    })
}

export{
    LogIn,
    SignUp, 
    socialMediaLogIn
}