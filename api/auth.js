
const auth = require('basic-auth');
const { User } = require('./models');
const bcrypt = require('bcryptjs');

exports.authenticateUser = async (req, res, next) => {
    // Parse the user's credentials from the Authorization header.
    let message = null;
  
    const credentials = auth(req);
  
    if (credentials) {
      const user = await User.findOne({ where: {emailAddress: credentials.name} });
      if (user) {
        const authenticated = bcrypt
          .compareSync(credentials.pass, user.password);
        if (authenticated) {
          console.log(`Authentication successful for user: ${user.emailAddress}`);
  
          // Store the user on the Request object.
          req.currentUser = user;
        } else {
          message = `Authentication failure for user: ${user.emailAddress}`;
        }
      } else {
        message = `User not found for user: ${credentials.emailAddress}`;
      }
    } else {
      message = 'Authentication header not found';
    }
  
    if (message) {
        console.warn(message);
        res.status(401).json({ message: 'Access Denied' });
      } else {
        next();
      }
   
    };