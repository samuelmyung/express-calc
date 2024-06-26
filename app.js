"use strict";
/** Simple demo Express app. */

const express = require("express");
const app = express();

// useful error class to throw
const { NotFoundError, BadRequestError } = require("./expressError");
const { findMean, findMedian, findMode } = require("./stats");
const { convertStrNums } = require("./utils");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";

/** Accepts string with comma separated values and converts into array of
 * numbers or throws an error if value is not a number. */
function convertInput(str) {
  if (str === "") {
    throw new BadRequestError("nums are required.");
  }
  const strNums = str.split(",");
  const nums = convertStrNums(strNums);
  return nums;
};

/** Finds mean of nums in qs: returns {operation: "mean", result } */
app.get("/mean", function (req, res) {
  const str = req.query.nums;
  const nums = convertInput(str);
  const result = findMean(nums);
  return res.json({ response: { operation: "mean", value: result } });
});

/** Finds median of nums in qs: returns {operation: "median", result } */
app.get("/median", function (req, res) {
  const str = req.query.nums;
  const nums = convertInput(str);
  const result = findMedian(nums);
  return res.json({ response: { operation: "median", value: result } });
});

/** Finds mode of nums in qs: returns {operation: "mode", result } */
app.get("/mode", function (req, res) {
  const str = req.query.nums;
  const nums = convertInput(str);
  const result = findMode(nums);
  return res.json({ response: { operation: "mode", value: result } });
});


/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



module.exports = app;