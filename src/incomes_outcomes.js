function Income(description, amount, id) {
  this.description = description;
  this.amount = amount;
  this.id = id;
}
function Expense(description, amount, id) {
  this.description = description;
  this.amount = amount;
  this.id = id;
}

let idCounter = 0;

let incomes = [];

let expenses = [];

function handleCreate(array, req, res) {
  // --- retrive body from request : description , amount

  // --- handle server side validation:
  // ---todo!!! check that description is not empty and amount is positive
  // --- issue status code ..... (check wich status code) in case of error
  const newObjct = req.body;
  newObjct.id = idCounter;
  idCounter++;

  // --- add new icome to incomes array
  array.push(newObjct);

  res.status(201).send(newObjct);
}

function handleDelete(array, req, res) {
  const id = req.params.id;
  // --- check if income exist , if not send 404
  const index = array.findIndex(item => item.id == id);
  if (index == -1) {
    // --- not found
    res.sendStatus(404);
  }
  else {
    // -- income found
    array.splice(index, 1);
    res.sendStatus(200);
  }
}

function handleGet(array, res) {
  res.send(array);
}

module.exports.handleGet = handleGet;
module.exports.handleDelete = handleDelete;
module.exports.handleCreate = handleCreate;
module.exports.incomes = incomes;
module.exports.expenses = expenses;
