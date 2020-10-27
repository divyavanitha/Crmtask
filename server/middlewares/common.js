var multer = require('multer');
var fs = require('fs');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    let token = req.header("Authorization");
    if (token && token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }
    if (!token) return res.status(401).json({ msg: 'Access Denied' });

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY,
            { algorithm: '[HS512]' });
        req.user = decoded;

        next();
    } catch (e) {
        return res.status(401).json({
            "statusCode": 401,
            "title": "Unauthorised",
            "message": "Unauthorised",
            "data": {},
            "error": {}
        });
    }
}

function admin(req, res, next) {
    let token = req.header("Authorization");
    if (token && token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }
    if (!token) return res.status(401).json({ msg: 'Access Denied' });

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.admin = decoded;

        next();
    } catch (e) {
        return res.status(401).json({
            "statusCode": 401,
            "title": "Unauthorised",
            "message": "Unauthorised",
            "data": {},
            "error": {}
        });
    }
}

function upload(destinationPath) {

    if (!fs.existsSync(destinationPath)){
        fs.mkdirSync(destinationPath, { recursive: true });
    }
    
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
              //console.log(file);
            cb(null, destinationPath);
        },
        filename: function (req, file, cb) {
            //console.log(file);
            cb(null, Date.now().toString() + '_' + file.originalname);
        }
    });

    var uploaded = multer({ storage: storage });
    return uploaded;
}

module.exports = {
    upload: upload,
    user: auth,
    admin: admin
};