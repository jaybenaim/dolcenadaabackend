// const User = require("../models/User");
// const bcrypt = require("bcryptjs");

// const withAuth = (req, res, next) => {
//   const { email, password } = req.body;
//   const user = User.findOne({ email });
//   //   user not found
//   console.log(user.password);
//   if (user) {
//     bcrypt
//       .compare(password, user.password)
//       .then((isMatch) => {
//         if (isMatch) {
//           next();
//         }
//       })
//       .catch((err) => {
//         return res.status(401).send("Unauthorized: Invalid token");
//       });
//   }
// };
// module.exports = withAuth;
