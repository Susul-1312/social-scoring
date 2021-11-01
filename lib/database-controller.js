module.exports = {
  getScore: function (userId) {
    return Math.floor(Math.random() * 10000);
  },

  userExists: function (userId) {
    return true;
  },

  getPasswordHashAndSalt: function (userId) {
    return "1234:eb4d8a107993311ed764a8768660578c76f1a9f3a032cbcaa8a7f890213317e4e5fe8d624645f3b47d2e2a79e8397060b2ebe41c7f3621f731c83b7bfd1507c7";
  },
};
