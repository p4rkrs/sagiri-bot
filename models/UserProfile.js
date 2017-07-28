const Sequelize = require('sequelize');

const Database = require('../structures/PostgreSQL')


let UserProfile = Database.db.define('userProfiles', {
    userID: Sequelize.STRING,
    money: {
        type: Sequelize.BIGINT(), // eslint-disable-line new-cap
        defaultValue: 0
    },
    balance: {
        type: Sequelize.BIGINT(), // eslint-disable-line new-cap
        defaultValue: 0
    },
    experience: {
        type: Sequelize.BIGINT(), // eslint-disable-line new-cap
        defaultValue: 0
    },
    personalMessage: {
        type: Sequelize.STRING,
        defaultValue: ''
    },
    background: {
        type: Sequelize.STRING,
        defaultValue: 'default'
    }
});


module.exports = UserProfile;