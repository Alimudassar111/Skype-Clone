const router = require('express').Router();

const multiparty = require('../handlers/file-upload');
const Message = require('../models/message.model');
const User = require('../models/user.model');
const Chat = require('../models/chat.model');

//Handlers
const UserHandler = require('../handlers/user.js');
const FriendHandler = require('../handlers/friend.js');
const ProfileHandler = require('../handlers/profile.js');
const ContactHandler = require('../handlers/contact.js');
const MessageHandler = require('../handlers/message.js');

const userHandler = new UserHandler(User);
const friendHandler = new FriendHandler(User);
const profileHandler = new ProfileHandler(User);
const contactHandler = new ContactHandler(User);
const messageHandler = new MessageHandler(Message, Chat);

module.exports = ()=>{

    const isAuthenticated = (req, res, next)=>{

        req.user = {};

        req.user._id = '5a392feb8818b735ac69aeed';
        return next();

        if (req.isAuthenticated()) return next();
        else res.redirect('/auth/login');
    };

    router.post('/message/get_history', isAuthenticated, messageHandler.messageHistory.bind(messageHandler));
    router.get('/contacts/search/:keyword', isAuthenticated, contactHandler.searchContact.bind(contactHandler));

    router.post('/message/send', isAuthenticated, messageHandler.send.bind(messageHandler));
    router.get('/message/get/:id', isAuthenticated, messageHandler.get.bind(messageHandler));

    router.get('/get_friends/:id', isAuthenticated, userHandler.get.bind(userHandler));

    router.get('/profile/:id', isAuthenticated, profileHandler.getProfile.bind(profileHandler));
    router.post('/profile_edit/:id', isAuthenticated, multiparty, profileHandler.editProfile.bind(profileHandler));
    router.post('/profile/update_password/:id', isAuthenticated, profileHandler.updatePassword.bind(profileHandler));

    router.get('/friend/add/:id', isAuthenticated, friendHandler.add.bind(friendHandler));
    router.get('/friend/accept/:id', isAuthenticated, friendHandler.accept.bind(friendHandler))
    router.get('/friend/decline/:id', isAuthenticated, friendHandler.decline.bind(friendHandler))
    router.get('/friend/remove/:id', isAuthenticated, friendHandler.remove.bind(friendHandler));

    router.get('*', isAuthenticated, (req, res) => res.redirect('/'));

    return router;
};
