const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Genre = sequelize.define('genre', {
    name: {
        type: DataTypes.STRING(70),
        allowNull: false
    },
});

module.exports = Genre;