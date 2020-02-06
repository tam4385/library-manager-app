'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class Books extends Sequelize.Model { }
    Books.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING,
            notNull: true,
            validate: {
                notEmpty: {
                    msg: 'Please provide a title value for the book'
                }
            }
        },
        author: {
            type: Sequelize.STRING,
            notNull: true,
            validate: {
                notEmpty: {
                    msg: 'Please provide a author value for the book'
                }
            }
        },
        genre: {
            type: Sequelize.STRING,
            notNull: true,
            validate: {
                notEmpty: {
                    msg: 'Please provide a genre value for the book'
                }
            }
        },
        year: {
            type: Sequelize.INTEGER,
            notNull: true,
            validate: {
                notEmpty: {
                    msg: 'Please provide a year value for the book'
                }
            }
        }
    }, { sequelize });

    return Books;
};