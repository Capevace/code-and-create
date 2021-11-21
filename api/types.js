/**
 * @typedef User
 * @type {object}
 * @property {string} mail
 * @property {string} password
 * @property {string} name 
 * @property {number} age
 */

/**
 * @typedef Room
 * @type {object}
 * @property {number} id
 * @property {Table[]} tables
 */

/**
 * @typedef Booking
 * @type {object}
 * @property {number} id
 * @property {number} tableId
 * @property {number} roomId
 * @property {number} from
 * @property {number} to
 * @property {string} by
 * @property {boolean} checkedIn
 */

/**
 * @typedef Table
 * @type {object}
 * @property {number} id
 * @property {boolean} bookable
 * @property {boolean} disabled
 * @property {Booking[]} booked
 * @property {string[]} properties
 */

module.exports = {  };