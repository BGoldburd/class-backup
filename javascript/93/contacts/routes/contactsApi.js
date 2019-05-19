var debug = require('debug')('contacts:contacts');
var express = require('express');
var router = express.Router();
const ApiError = require('./apiError');
const pool = require('../db');
const Joi = require('joi');

function validateContact(contact) {
    const schema = {
        firstname: Joi.string().allow(''),
        lastname: Joi.string().min(3),
        email: Joi.string().allow(''),
        phone: Joi.string().allow('')
    };

    return Joi.validate(contact, schema);
}

router.route('/')
    .get((req, res, next) => {
        pool((err, connection) => {
            if (err) {
                return res.status(500).send(err.message);
            }
            connection.query('SELECT * FROM contacts', (err, results) => {
                connection.release();

                if (err) {
                    return res.status(500).send(err.message);
                }

                res.send(results);
            });
        });
    })
    .post((req, res, next) => {
        /*if (!req.body.lastname) {
            return next(new ApiError(400, 'Last name is required'));
        }
        if (req.body.lastname.length < 3) {
            return next(new ApiError(400, 'Last name must be at least 3 characters'));
        }*/
        const result = validateContact(req.body);
        if (result.error) {
            return next(new ApiError(400, result.error.details[0].message));
        }

        pool((err, connection) => {
            if (err) {
                return res.status(500).send(err.message);
            }
            connection.query('INSERT INTO contacts(firstname, lastname, phone, email) VALUES(?, ?, ?, ?)',
                [req.body.firstname, req.body.lastname, req.body.phone, req.body.email],
                (err, result) => {
                    connection.release();
                    if (err) {
                        return res.status(500).send(err.message);
                    }
                    req.body.id = result.insertId;
                    res.status(201).send(JSON.stringify(req.body));
                });
        });
    });

router.route('/:id')
    .get((req, res, next) => {
        pool((err, connection) => {
            if (err) {
                return res.status(500).send(err.message);
            }
            connection.query('SELECT * FROM contacts WHERE id = ?', [req.params.id], (err, results) => {
                connection.release();
                if (err) {
                    // return res.status(500).send(err.message);
                    next(err);
                }

                if (!results.length) {
                    //return res.status(404).send(`No contact with id ${req.params.id} found`);
                    //const err = new ApiError(404, `No contact with id ${req.params.id} found`);
                    //err.status = 404;
                    return next(new ApiError(404, `No contact with id ${req.params.id} found`));
                }

                res.send(results[0]);
            });
        });
    })
    .put((req, res, next) => {
        const result = validateContact(req.body);
        if (result.error) {
            return next(new ApiError(400, result.error.details[0].message));
        }

        pool((err, connection) => {
            if (err) {
                return res.status(500).send(err.message);
            }
            connection.query('SELECT * FROM contacts WHERE id = ?', [req.params.id], (err, results) => {
                if (err) {
                    connection.release();
                    // return res.status(500).send(err.message);
                    next(err);
                } else if (!results.length) {
                    connection.release();
                    //return res.status(404).send(`No contact with id ${req.params.id} found`);
                    //const err = new ApiError(404, `No contact with id ${req.params.id} found`);
                    //err.status = 404;
                    return next(new ApiError(404, `No contact with id ${req.params.id} found`));
                }

                connection.query('UPDATE contacts SET firstname = ?, lastname = ?, phone = ?, email = ? WHERE id = ?',
                    [req.body.firstname, req.body.lastname, req.body.phone, req.body.email, req.params.id],
                    (err, result) => {
                        connection.release();
                        if (err) {
                            // return res.status(500).send(err.message);
                            next(err);
                        }
                        // req.body.id = req.params.id;
                        // res.status(200).send(JSON.stringify(req.body));
                        res.status(204).end();
                    });
            });
        });
    }).delete((req, res, next) => {
        pool((err, connection) => {
            if (err) {
                return res.status(500).send(err.message);
            }
            connection.query('SELECT * FROM contacts WHERE id=?', [req.params.id], (err, results) => {
                if (err) {
                    connection.release();
                    // return res.status(500).send(err.message);
                    next(err);
                }
                //console.log(results);
                if (!results.length) {
                    connection.release();
                    return next(new ApiError(404, `No contact with id ${req.params.id} found`));
                }

                connection.query('DELETE FROM contacts WHERE id=?', [req.params.id], (err, results) => {
                    connection.release();
                    if (err) {
                        //return res.status(500).send(err.message);
                        next(err);
                    }
                    res.status(204).end();
                });
            });
        });
    });


module.exports = router;
