console.log("server is loading ...");
const express = require("express"),
  PORT = 8080;
const app = express();
app.use(express.json());

const path = require('path');
const publicPath = path.join(__dirname, "..", "public");
app.use(express.static(publicPath));

const routeHelper = require('./incomes_outcomes');

// --- delete
app.delete("/incomes/:id",(req,res)=>{
  routeHelper.handleDelete(routeHelper.incomes,req,res);
})
app.delete("/expenses/:id",(req,res)=>{
  routeHelper.handleDelete(routeHelper.expenses,req,res);
})

// --- post
app.post("/incomes", (req, res) => {
  routeHelper.handleCreate(routeHelper.incomes,req,res);
});
// --- expecting object e.g {description:'salary' , amount:12000 , id:1}
app.post("/expenses", (req, res) => {
  routeHelper.handleCreate(routeHelper.expenses,req,res);
});

// --- get
app.get("/incomes", (req, res) => {
  routeHelper.handleGet(routeHelper.incomes,res);
});
app.get("/expenses", (req, res) => {
  routeHelper.handleGet(routeHelper.expenses,res);
});

// --- PORT
app.listen(PORT, () => {
  console.log(`server is listening on port : ${PORT}`);
});
