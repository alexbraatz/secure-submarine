const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
  // what is the value of req.user????
  console.log('req.user:', req.user);

  let userClearance = req.user.clearance_level

    pool
      .query(`SELECT * FROM "secret" WHERE "secrecy_level" < ${ userClearance };`)
      .then((results) => res.send(results.rows))
      .catch((error) => {
        console.log('Error making SELECT for secrets:', error);
        res.sendStatus(500);
    });

});

module.exports = router;
