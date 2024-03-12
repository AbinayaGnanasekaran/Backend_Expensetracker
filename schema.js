const mongoose = require ('mongoose')

const expenseTrackerSchema = new mongoose.Schema({
    amount : {
        type : Number},
        category : {
            type : String
        },
        date : {
            type : String
        }
})
// model to connec db  =>use starts with caps => can excecute quries using this name
// 1st para -> the connnec will be created in that name in db


const Expense = mongoose.model('expensedetails',expenseTrackerSchema)

module.exports = { Expense }
