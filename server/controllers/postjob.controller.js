// Load Profile Model
const { Postjob, validate } = require('./../models/postjob');
// Load User Model
const { User } = require('./../models/user');

exports.usesfromtoken = async (req, res) => {
    try {
        
        const user = await User.findOne(req.user.id).select('-password');
        res.json(user);

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server')

    }
}
exports.createpostjob = async (req, res) => {
    try {
       
        const { error } = validate(req.body);
        const errors = {};
        if (error) {
            for (let err of error.details) {
                errors[err.path[0]] = (err.message).replace(/"/g, "");
            }
        }
        if (error) return res.status(422).json(errors);

    // Get fields
    const postjobFields = {};
    postjobFields.user = req.user._id;

   if (req.body.title) postjobFields.title = req.body.title;
    if (req.body.jobhighlight) postjobFields.jobhighlight = req.body.jobhighlight;
    if (req.body.workplace) postjobFields.workplace = req.body.workplace;
    if (req.body.freelancer) postjobFields.freelancer = req.body.freelancer;
    if (req.body.jobdescription) postjobFields.jobdescription = req.body.jobdescription;
    if (req.body.responsibilities) postjobFields.responsibilities = req.body.responsibilities;
   
    if (postjobFields) {
        Postjob.find({title:req.body.title}).then(
            postjob => {if(postjob.length){
             
             return res.json({message:"already this title or Post exists"})
         }}
        )

            // Check if handle exists
            // Profile.save.then(profile => {
                // if (profile) {
                //     errors.handle = 'That handle already exists';
                //     res.status(400).json(errors);
                // }

                // Save Profile
                new Postjob(postjobFields).save().then(postjobFields => res.status(200).json({"status":200,"success":true,"msg":"The Job is Sucessfully Posted ",postjobFields}));
            // });
        
    };

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error found'+err.message)

    }
}

// exports.createpostjob = async (req, res) => {
//     try {
       
//         const { error } = validate(req.body);
//         const errors = {};
//         if (error) {
//             for (let err of error.details) {
//                 errors[err.path[0]] = (err.message).replace(/"/g, "");
//             }
//         }
//         if (error) return res.status(422).json(errors);

//     // Get fields
//     const postjobFields = {};
//     postjobFields.user = req.user._id;

//    if (req.body.titleofjob) postjobFields.titleofjob = req.body.titleofjob;
//     if (req.body.nooffreelancers) postjobFields.nooffreelancers = req.body.nooffreelancers;
//     if (typeof req.body.skillneeded !== 'undefined') {

//         postjobFields.skillneeded = req.body.skillneeded.toString().split(',');
     
//     }
//     if (req.body.rate) postjobFields.rate = req.body.rate;
//     if (req.body.timetakenforjob) postjobFields.timetakenforjob = req.body.timetakenforjob;
//     if (req.body.workperweek) postjobFields.workperweek = req.body.workperweek;
//     if (req.body.helpforwhat) postjobFields.helpforwhat = req.body.helpforwhat;
//     if (req.body.workfor)
//      postjobFields.workfor = req.body.workfor;
//     if (req.body.qualityneeded) postjobFields.qualityneeded = req.body.qualityneeded;
//     if (req.body.filetoattach) postjobFields.filetoattach = req.body.filetoattach;
//     if (req.body.findandapply) postjobFields.findandapply = req.body.findandapply;
//     // if (req.body.addfreelancer) postjobFields.addfreelancer = req.body.addfreelancer;
//     // postjobFields.addfreelancer = req.body.addfreelancer.toString().split(',');
//     // console.log( postjobFields.addfreelancer);
//     if (req.body.screeningquestion) postjobFields.screeningquestion = req.body.screeningquestion;

//     if(req.body.prefferedqualification)  postjobFields.prefferedqualification=req.body.prefferedqualification;

//     console.log(postjobFields.user);
//     if (postjobFields) {
//         Postjob.find({titleofjob:req.body.titleofjob}).then(
//             postjob => {if(postjob.length){
             
//              return res.json({message:"already this title or Post exist"})
//          }}
//         )

//             // Check if handle exists
//             // Profile.save.then(profile => {
//                 // if (profile) {
//                 //     errors.handle = 'That handle already exists';
//                 //     res.status(400).json(errors);
//                 // }

//                 // Save Profile
//                 new Postjob(postjobFields).save().then(postjobFields => res.json(postjobFields));
//             // });
        
//     };

//     } catch (err) {
//         console.error(err.message)
//         res.status(500).send('Server error found'+err.message)

//     }
// }

exports.deletepostjob = async (req, res) => {
    Postjob.find({ user: req.user._id }).then((postjobs) => {
       
       if(!postjobs){return res.json({error:"this cannot be deleted"})}
          
             Postjob.findByIdAndRemove({ _id: req.params.postjobid}).then((data) =>{
                if(!data){return res.json({error:"your authorization does cannot be deleted"})}
            res.json({ success: true,response:data }) 
      
    });
})
}

exports.getallpostjob = async (req, res) => {
    const errors = {};
    Postjob.find()
    .populate('user', '-password')
       .then(postjob => {
            if (!postjob) {
                errors= 'There are no gigs';
                return res.status(404).json(errors);
            }

            res.json({postjob});
        })
        .catch(err => res.status(404).json({ gigs: 'There are no gigs' }));
}
exports.getmyallpostjob = async (req, res) => {
    const errors = {};
    Postjob.find()
        .populate({
        path: 'user',
       match:{_id: {$eq:req.user._id}}},
        '-password'
    )
        .then(postjob => {
            if (!postjob) {

                errors= 'There are no postjob';
                return res.status(404).json(errors);
            }
            for(var i=0;i<=postjob.length;i++){
          var postjobs=postjob.filter(postjobb => postjobb.user!==null )
        }
            res.json({postjobs});
        })
        .catch(err => res.status(404).json({ gigs: 'There are no getmyallpostjob' }));
}
exports.findpostjobbyid = async (req, res) => {
    const errors = {};

    Postjob.findById({ _id: req.params.postjobid })
        .populate('user', '-password')
        .then(postjob => {
            if (!postjob) {
                errors = 'There is no gigs for this user';
                return res.status(404).json(errors);
            }
            res.json(postjob);
        })
        .catch(err => res.status(404).json(err));
}