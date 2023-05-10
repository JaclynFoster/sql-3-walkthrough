const QUERY_USER_INFO = `SELECT * FROM cc_users AS u
JOIN cc_clients AS c
ON u.user_id = c.user_id
WHERE u.user_id = ?`

const UPDATE_USER_INFO = `
UPDATE cc_users
SET first_name = ?,
last_name = ?,
email = ?,
phone_number = ?
WHERE user_id = ?; 

UPDATE cc_clients
SET address = ?,
city = ?,
state = ?,
zip_code = ?
WHERE user_id = ?;
`
const QUERY_USER_APPT = `
SELECT * FROM cc_appointments
WHERE client_id = ?
ORDER BY date DESC;
`
const REQUEST_APPT = `
INSERT INTO cc_appointments (client_id, date, service_type, notes, approved, completed)
VALUES (?, ?, ?, '', false, false)
RETURNING *;
`
module.exports = {
  QUERY_USER_INFO,
  UPDATE_USER_INFO,
  QUERY_USER_APPT,
  REQUEST_APPT
}

