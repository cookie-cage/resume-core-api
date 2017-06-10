'use strict';

var mongoose = require('mongoose');
var resumeSchema = require('resume-schema');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Resume = new Schema({
    id: ObjectId,
    updated_at: Date,
    created_at: Date
}, { strict: false });

mongoose.model('Resume', Resume);
