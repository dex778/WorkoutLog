const sequelize = require('sequelize');
const database = require('../db');

const User = database.define('workouts', {
    description: {
        type: sequelize.STRING,
        allowNull: false
    },
    definition: {
        type: sequelize.STRING,
        allowNull: false
    },
    result: {
        type: sequelize.STRING,
        allowNull: false
    },
    owner_id: {
        type: sequelize.INTEGER
    }
})

module.exports = User
