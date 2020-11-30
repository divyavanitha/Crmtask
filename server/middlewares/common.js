const multer = require('multer');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const { Role } = require('../models/Role');
const { Permission } = require('../models/Permission');
const db = require('../services/model.js');
const helper = require('../services/helper.js');
const _ = require('lodash');

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

async function admin(req, res, next) {
console.log(req.header("Authorization"))
    let token = req.header("Authorization");
    if (token && token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }
    if (!token) return res.status(401).json({ msg: 'Access Denied' });

    let rules = [];

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        req.admin = decoded;

        if(req.session.rules){

            rules = req.session.rules;

        } else {
            let query = db._get(Role, { 'name': { $in: req.admin.roles } }, {}, {populate: { path: 'permissions.permission' } })
            
            const roles = await query;


            let permissions = _.map(roles, 'permissions');

            let permissionList = _.map(permissions);

            for(let i in permissionList) {
                let permission = _.map(permissionList[i], 'permission');

                for(let data of permission) {
                    for(let res of data.resource) {
                        let obj = {name: data.name, resource: res}
                        rules.push(obj)
                    }
                }
            }

            

            req.session.rules = rules;
        }
        

        /*let path = (req.route.path).substring(1);

        if(path.includes('status')) {
            path += ':status';
        } else if(req.method == 'GET') {
            path += ':list';
        } else if(req.method == 'POST') {
            path += ':create';
        } else if(req.method == 'PATCH') {
            path += ':edit';
        } else if(req.method == 'DELETE') {
            path += ':delete';
        }*/
        
        let rule = rules.find(rule => '/'+rule.resource == req.route.path) ; // && rule.name == path) ;

        if(!rule) {
            return res.status(403).json({
                "statusCode": 403,
                "title": "Forbidden",
                "message": "You have no access to this resource!",
                "data": {},
                "error": {}
            });
        }

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

function permission(req, res, next) {
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

    if (!fs.existsSync(destinationPath)) {
        fs.mkdirSync(destinationPath, { recursive: true });
    }

    let storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, destinationPath);
        },
        filename: function (req, file, cb) {
            cb(null, Date.now().toString() + '_' + file.originalname);
        }
    });

    let uploaded = multer({ storage: storage });
    return uploaded;
}

function uploadAs(destinationPath) {

    if (!fs.existsSync(destinationPath)) {
        fs.mkdirSync(destinationPath, { recursive: true });
    }

    let storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, destinationPath);
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + path.extname(file.originalname));
        }
    });

    let uploaded = multer({ storage: storage });
    return uploaded;
}

module.exports = {
    upload: upload,
    uploadAs: uploadAs,
    user: auth,
    admin: admin
};