// Import user model
// Import config
// Import jwt simple

// use passport and passport jwt

// Create function that uses JWT encode and the secret which is in the config file

// Use bcrypt to hash password in users model file before user gets saved

export function signup(req, res, next) {
  const user = req.body.user;
  const password = req.body.password;

  // Check to see if user filled out both fields

  // Check if user exists
  // mySQL equivalent to findOne, pass in user variable to check if it exists in DB, second argument a callback which takes error or existingUser arguments

  // If user exists, return error
  // return error status code and send an error object with message

  // If user does not exist, create and save user record
  // create a new user using user model with email and password
  // save username to the database
  // callback with error or responding to request indicating that the user was created

    // Respond to request indicating user was created with TOKEN
    // 
}

export function login(req, res, next) {

}