//Order Routes
const express = require('express');
const router = express.Router();
const passport = require('passport');
const Order = require('../models/order.model');
const User = require('../models/user.model');
const { Op } = require('sequelize');

// create order
