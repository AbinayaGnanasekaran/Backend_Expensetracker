const express = require('express')
const mongoose = require('mongoose')
const {Expense} = require('./schema.js')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())

/**
 * Expense Tracker
 * 
 * Adding a new expense -> /add-expemnse  =>post - expense details
 * 
 * displaying existing records -> /get-expenses  =>get
 * 
 * delete an expense -> /del-expem  =>post : id of the entry  
 * =>params => " /followed by id"
 * 
 * update =>/update-exp  => post : id of the entry,expense details
 * 
 * create a db name btwn / and ? near mongodb.net
 */

 async function connectionToDb(){
    mongoose.connect('mongodb+srv://Abinaya_g:Abinayag@cluster0.rmecx8n.mongodb.net/ExpenseTracker?retryWrites=true&w=majority&appName=Cluster0')
    console.log("Connection established")
    const port = process.env.PORT || 2005
    app.listen(port,function(){
        console.log(`Listening to the port No:${port}`)
    })
    
 }

 /** async function connectionToDb(){
  * try{
  *   mongoose.connect('mongodb+srv://Abinaya_g:Abinayag@cluster0.rmecx8n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    console.log("Connection established")
    app.listen(2005,function(){
        console.log("Listening")
    } catch(error)
      console.log("could'd")  
    connection:(')  })}
  */


 connectionToDb()

 app.post('/add-expense', async function(request, response){
  val = request.body
   console.log(val)

  try{
    await Expense.create({
      "amount" : request.body.Amount,
      "category" : request.body.Category,
      "date" : request.body.Date
  
    })
     response.status(201).json({
      "Status" : "Done !!!, entry created"

     })
  }catch(error){
    response.status(500).json({
      "Status" : "Sorry !!! , entry not created",
      "Error"  : error
     })
  }
    

  
 })


 /**
  * if we use model name for fetchn thn it is async func
  */
 app.get('/get-expenses', async function(request, response){
  try{
 
    const expenseDetails = await Expense.find()
     response.status(200).json(expenseDetails)
  }catch(error){
             
    response.status(500).json({
      "Status" : "Sorry !!! , could not fetch data",
      "Error"  : error
     })
  }
 })
/// collon is used to consider as params

 app.delete('/delete-expense/:id', async function(request,response){
   //console.log(request.params.id)

   // we have to check whether the entry exists

      const expenseEntry = await Expense.findById(request.params.id)
      if(expenseEntry){
        
        await Expense.findByIdAndDelete(request.params.id)
        response.status(200).json({
          "Status" : "Deleted Successfully"
        })
      }else{
        response.status(404).json({
          "Status" : "Entry Not found"
        })

      }
 })

 //=========UPDATE

 app.patch('/update-expense/:id', async function(request,response){
  

     const expenseEntry = await Expense.findById(request.params.id)
     if(expenseEntry){
       
      await expenseEntry.updateOne({
        "Amount" : 555,
        "Category" : "College-fee",
        "Date" : "02/03/2024"
    })
  
       response.status(200).json({
         "Status" : "Updated Successfully"
       })
     }else{
       response.status(404).json({
         "Status" : "Entry Not found"
       })

     }
})