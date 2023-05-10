const Sequelize = require("sequelize")
const {CONNECTION_STRING} = process.env

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

const userId = 4
const clientId = 3

const getUserInfo = (req, res) => {
    sequelize.query(`
        SELECT * FROM cc_users AS u
        JOIN cc_clients AS c
        ON u.user_id = c.user_id
        WHERE u.user_id = ${userId}
    `)
    .then(dbRes => {
        console.log("dbRes", dbRes)
        res.status(200).send(dbRes[0])
    })
    .catch(error => {
        console.log("error", error)
    })
}

const updateUserInfo = (req, res) => {
    let {firstName, lastName, phoneNumber, email, address, city, state, zipCode} = req.body
    sequelize.query(`
        UPDATE cc_users
        SET first_name = '${firstName}',
        last_name = '${lastName}',
        email = '${email}',
        phone_number = ${phoneNumber}
        WHERE user_id = ${userId}; 
        
        UPDATE cc_clients
        SET address = '${address}',
        city = '${city}',
        state = '${state}',
        zip_code = ${zipCode}
        WHERE user_id = ${userId};
    `)
    .then(() => {
        res.status(200)
    })
    .catch(error => {
        console.log(error)
    })
}

const getUserAppt = (req, res) => {
    sequelize.query(`
        SELECT * FROM cc_appointments
        WHERE client_id = ${clientId} 
        ORDER BY date DESC;
    `)
    .then(dbRes => {
        res.status(200).send(dbRes[0])
    })
    .catch(error => {
        console.log(error)
    })
}

const requestAppointment = (req, res) => {
    const {date, service} = req.body
    sequelize.query(`
        INSERT INTO cc_appointments (client_id, date, service_type, notes, approved, completed)
        VALUES (${clientId}, '${date}', '${service}', '', false, false)
        RETURNING *;
        `)
        .then(dbRes => {
            res.status(200).send(dbRes[0])
        })
        .catch(error => {
            console.log(error)
        })

}

module.exports = {getUserInfo, updateUserInfo, getUserAppt, requestAppointment}