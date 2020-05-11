"use strict"

const User = require("../model/user").User
const fetchAll = require("../model/user").fetchAll
const fetchFilter = require("../model/user").fetchFilter

//Register
exports.create = (req, res) => {

  const inputUser = req.body
  let errMessage

  if (!inputUser.name)
    errMessage = "Name is required"

  if (!inputUser.password && !errMessage)
    errMessage = "Password is required"

  if (!inputUser.birthdate && !errMessage)
    errMessage = "Birth date is required"

  if (!inputUser.photo && !errMessage)
    inputUser.photo = ""

  if(!errMessage)
    errMessage = validateEmail(inputUser.email)


  //  TODO: Photo verification AI
  //  TODO: Birthdate Verification: format


  if (!errMessage) {
    const user = new User(inputUser)
    user.addNew()
      .then(() => {
        res.status(200).json({ "message": "New user registered" })
      })
      .catch(err => {
        res.status(409).json(err)
      })
  }
  else {
    res.status(409).json({ "message": errMessage })
  }

}

//  This method could be better

exports.getAll = (req, res) => {
  fetchAll()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      throw (err)
    })
}

exports.getFilter = (req, res) => {
  const name = req.query.name
  const email = req.query.email

  fetchFilter(email, name)
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      throw (err)
    })
}


const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/
  let message

  if (!email)
    message = "Email is required"

  if (!re.test(email))
    message = "Email not valid"

  return message
}
