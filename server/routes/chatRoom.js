postMessage: async (req, res) => {
    try {
      const { roomId } = req.params;
      const validation = makeValidation(types => ({
        payload: req.body,
        checks: {
          messageText: { type: types.string },
        }
      }));
      if (!validation.success) return res.status(400).json({ ...validation });
  
      const messagePayload = {
        messageText: req.body.messageText,
      };
      const currentLoggedUser = req.userId;
      const post = await ChatMessageModel.createPostInChatRoom(roomId, messagePayload, currentLoggedUser);
      global.io.sockets.in(roomId).emit('new message', { message: post });
      return res.status(200).json({ success: true, post });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  }