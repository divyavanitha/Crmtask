const http = require("http");
const express =require("express");
const app = express();

const router = express.Router();
const auth = require("../middlewares/auth")
// middlewares
const deleteController = require('../controllers/chat/delete');
const chatRoom = require('../controllers/chat/chatRoom');
const user = require('../controllers/chat/user');

router
 //already avaliable
  .get('/', user.onGetAllUsers)
  .post('/',auth, user.onCreateUser)
  .get('/:id',auth, user.onGetUserById)
  .delete('/:id',auth, user.onDeleteUserById)
  
//in use
  .get('/', auth,chatRoom.getRecentConversation)
  .get('/:roomId', auth,chatRoom.getConversationByRoomId)
  .post('/initiate',auth,chatRoom.initiate)
  .post('/:roomId/message',auth, chatRoom.postMessage)
  .put('/:roomId/mark-read',auth, chatRoom.markConversationReadByRoomId)
 
  .delete('/room/:roomId',auth, deleteController.deleteRoomById)
  .delete('/message/:messageId',auth, deleteController.deleteMessageById)
  .delete('/room/:roomId',auth, deleteController.deleteRoomById)
  .delete('/message/:messageId',auth, deleteController.deleteMessageById)
  .delete('/room/:roomId',auth, deleteController.deleteRoomById)
  .delete('/message/:messageId',auth, deleteController.deleteMessageById)

  module.exports=router;



