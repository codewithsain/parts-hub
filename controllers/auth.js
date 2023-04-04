const dbConn = require('../dbConnection')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const util = require('util');

exports.register = (req, res) =>{ 

    const { user, name, lastName, position, email, password, passwordConfirm } = req.body

    dbConn.query("SELECT email FROM user WHERE email= ?", [email], async (error, results) => {
        if(error){
            console.log(error);
        }

        if(results.length > 0){
            return res.render('register', {
                emailMessage: 'That email has been taken'
            })
        }else if(password !== passwordConfirm){
            return res.render('register', {
                passwordMessage: 'Passwords do not match'
            })
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        dbConn.query('INSERT INTO user SET ?',{user: user, name: name, lastName: lastName, position: position, role: 'admin', email: email, password: hashedPassword}, (error, results) => {
            if(error){
                console.log(error)
            }else{
                console.log(results)
                return  res.render('register', {
                    userRegisteredMessage: 'User registered succesfully'
                })
            }
        })
    });

}


exports.index =  async (req, res) => {
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).render('index', {
                noCredMessage: 'Please provide an email and password'
            })
        }

        dbConn.query('SELECT * FROM user WHERE email = ?', [email], async (error, results) => {
            console.log(email)
            console.log(results)
            if(!results  || !(await bcrypt.compare(password, results[0].password))){
                res.status(401).render('index', {
                    wrongCredMessage: 'Email or password is incorrect'
                })
                }else{
                    const id = results[0].id;
                    const token = jwt.sign({id}, process.env.JWT_SECRET, {
                        expiresIn: process.env.JWT_EXPIRES_IN
                    })

                    console.log(token);

                    const cookieOptions = {
                        expires: new Date(
                            Date.now() + process.env.JWT_COOKIE_IN * 24 * 60 * 60 * 1000
                        ),
                        httpOnly: true
                    }

                    res.cookie('jwt', token, cookieOptions)
                    res.status(200).redirect('/landingPage')
                }
        })
    }catch(error){
        console.log(error)
    }
}

exports.isLoggedIn = async (req, res, next) => {
    console.log(req.cookies);
    if(req.cookies.jwt){
        try{
            const decoded = await util.promisify(jwt.verify)(req.cookies.jwt,  
                process.env.JWT_SECRET  
                );
            
            console.log(decoded);

            dbConn.query('SELECT * FROM user WHERE id= ?', [decoded.id], (error, results) => {
                console.log(results);
                if(!results){
                    return next();
                }

                req.user = results[0];

                return next();
            })
        }catch(error){
            return next();
        }
    }else{
        next();
    }
    
}