const Sequelize = require('sequelize')
const {
  QUERY_USER_INFO,
  UPDATE_USER_INFO,
  QUERY_USER_APPT,
  REQUEST_APPT
} = require('./CONST')
const { CONNECTION_STRING } = process.env

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false
    }
  }
})

const userId = 4
const clientId = 3

const getUserInfo = (req, res) => {
  sequelize
    .query(QUERY_USER_INFO, {
      replacements: [userId]
    })
    .then(dbRes => {
      console.log('dbRes', dbRes)
      res.status(200).send(dbRes[0])
    })
    .catch(error => {
      console.log('error', error)
    })
}

const updateUserInfo = (req, res) => {
  let {
    firstName,
    lastName,
    phoneNumber,
    email,
    address,
    city,
    state,
    zipCode
  } = req.body
  sequelize
    .query(UPDATE_USER_INFO, {
      replacements: [
        firstName,
        lastName,
        email,
        phoneNumber,
        userId,
        address,
        city,
        state,
        zipCode,
        userId
      ]
    })
    .then(() => {
      res.status(200)
    })
    .catch(error => {
      console.log(error)
    })
}

const getUserAppt = (req, res) => {
  sequelize
    .query(QUERY_USER_APPT, {
      replacements: [clientId]
    })
    .then(dbRes => {
      res.status(200).send(dbRes[0])
    })
    .catch(error => {
      console.log(error)
    })
}

const requestAppointment = (req, res) => {
  const { date, service } = req.body
  sequelize
    .query(REQUEST_APPT, {
      replacements: [clientId, date, service]
    })
    .then(dbRes => {
      res.status(200).send(dbRes[0])
    })
    .catch(error => {
      console.log(error)
    })
}

module.exports = {
  getUserInfo,
  updateUserInfo,
  getUserAppt,
  requestAppointment
}
