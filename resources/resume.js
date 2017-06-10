'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Resume = mongoose.model('Resume');
var jwt = require('jsonwebtoken');
var resumeSchema = require('resume-schema');


router.post('/', function(req, res, next) {
    // token is invalid
    try {
        jwt.verify(req.headers[process.env.JWT_TOKEN_HEADER], process.env.JWT_SECRET);
    } catch(err){
        req.body = err;
        return res.status(400).json(err);
    }

    // schema is invalid
    resumeSchema.validate(req.body, function(report, err){
        if (err) {
            req.body = err;
            return res.status(400).json(err);
        }

         if (report) {
            req.body = report;
            return res.status(400).json(report);
        }

        Resume.create(req.body, function(err, data){
            if (err) {
                req.body = err;
                return res.status(400).json(err);
            }

            res.status(201).json(data);
        });
    });
});

router.get('/', function(req, res, next) {

    Resume.find(function(err, data){
        res.status(200).json(data);
    });

});

router.delete('/', function(req, res, next) {

    Resume.remove(req.params.id, function(err, data){
        if(err)
            return res.status(400).json(err);

        res.status(202).send(data);
    });
});

router.get('/:id', function(req, res, next) {

    Resume.findById(req.params.id, function(err, data){
        if(!data)
            return res.status(404).send();

        res.status(200).json(data);
    });

});

router.delete('/:id', function(req, res, next) {

    Resume.findByIdAndRemove(req.params.id, function(err, data){
        if(err)
            return res.status(400).json(err);

        if(!data)
            return res.status(404).send();

        res.status(202).send(data);
    });
});

module.exports = router;
