const send = require('gmail-send');

module.exports = {
    sendMessage: function sender(text) {
        send({
          user:    process.env.GMAIL_USER,
          pass:    process.env.GMAIL_PASS,      
          to:      [process.env.EMAIL_JEREMY, process.env.EMAIL_DANIEL],  
          subject: 'New Resume Generated!',
          text:    text
        })();
    }
};