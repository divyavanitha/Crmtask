const {Chat,validate} = require("../models/chat");


exports.getchat=async (req, res) => {
    await Chat.find()
        .populate("sender")
        .exec((err, chats) => {
            console.log(chats)
            if(err) return res.status(400).send(err);
            res.status(200).send(chats)
        })
};