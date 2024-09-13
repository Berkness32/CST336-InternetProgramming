const express = require("express");
const mysql = require("mysql");
const app = express();
const pool = require("./dbPool");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

//routes
app.get('/', (req, res) => {
   res.render('index')
});

app.get("/author/new", (req, res) => {
   res.render("newAuthor");
});

app.get("/quotes/new", async function(req, res) {
   let sql = `SELECT DISTINCT authorId, firstName, lastName, category
              FROM q_authors
              NATURAL JOIN q_quotes
              ORDER BY authorId`;
   let rows = await executeSQL(sql);
   res.render("newQuote", {"quotes": rows});
})

app.get("/authors", async function(req, res){
 let sql = `SELECT *
            FROM q_authors
            ORDER BY lastName`;
 let rows = await executeSQL(sql);
 res.render("authorList", {"authors":rows});
});

app.get("/quotes", async function(req, res) {
   let sql = `SELECT *
              FROM q_quotes
              NATURAL JOIN q_authors
              ORDER BY authorId`;
   let rows = await executeSQL(sql);
   res.render("quoteList", {"quotes":rows});
})

app.get("/dbTest", async function(req, res){
let sql = "SELECT CURDATE()";
let rows = await executeSQL(sql);
res.send(rows);
});

app.get("/author/edit", async function(req, res){
 let authorId = req.query.authorId;
 let sql = `SELECT *, DATE_FORMAT(dob, '%Y-%m-%d') dobISO
            FROM q_authors
            WHERE authorId =  ${authorId}`;
 let rows = await executeSQL(sql);
 res.render("editAuthor", {"authorInfo":rows});
});

app.get("/quotes/edit", async function(req, res) {
   let quoteId = req.query.quoteId;
   let sql = `SELECT *
              FROM q_quotes
              WHERE quoteId = ${quoteId}`;
   let rows = await executeSQL(sql);
   res.render("editQuote", {"quoteInfo":rows});
})



//functions
async function executeSQL(sql, params){
   return new Promise (function (resolve, reject) {
      pool.query(sql, params, function (err, rows, fields) {
         if (err) throw err;
            resolve(rows);
      });
   });
}

app.post("/author/new", async function(req, res){
  let fName = req.body.fName;
  let lName = req.body.lName;
  let birthDate = req.body.birthDate;
  let sex = req.body.sex;
  let profession = req.body.profession;
  let country = req.body.country;
  let portrait = req.body.portrait;
  let biography = req.body.biography;
  let sql = "INSERT INTO q_authors (firstName, lastName, dob, sex, profession, country, portrait, biography) VALUES (?, ?, ? , ?, ?, ?, ?, ?)";
  let params = [fName, lName, birthDate, sex, profession, country, portrait, biography];
  let rows = await executeSQL(sql, params);
  res.render("newAuthor", {"message": "Author added!"});
});

app.post("/quotes/new", async function(req, res) {
   let quote = req.body.quote;
   let authorId = req.body.authorId;
   let category = req.body.category;
   let sql = "INSERT INTO q_quotes (quote, authorId, category) VALUES (?, ?, ?)";
   let params = [quote, authorId, category];
   let rows = await executeSQL(sql, params);
   res.redirect("/quotes");
})

app.post("/author/edit", async function(req, res){
 let sql = `UPDATE q_authors
            SET firstName = ?,
               lastName = ?,
               dob = ?,
               sex = ?,
               profession = ?,
               country = ?
            WHERE authorId =  ?`;


let params = [req.body.fName,  
              req.body.lName, req.body.dob, 
              req.body.sex, req.body.profession, req.body.country, req.body.authorId];         
let rows = await executeSQL(sql,params);

// res.redirect("/author/edit?authorId=" + req.body.authorId);

sql = `SELECT *
        DATE_FORMAT(dob, '%Y-%m-%d') dobISO
        FROM q_authors
        WHERE authorId = ?`;
params = [req.body.authorId];
rows = await executeSQL(sql, params);
   
res.render("editAuthor", {"authorInfo":rows, "message": "Author Updated!"});
});

app.get("/author/delete", async function(req, res) {
   let sql = `DELETE
             FROM q_authors
             WHERE authorId = ${req.query.authorId}`
   let rows = await executeSQL(sql);
   res.redirect("/authors");
});

app.post("/quotes/edit", async function(req, res){
 let sql = `UPDATE q_quotes
            SET quote = ?,
                category = ?
            WHERE quoteId =  ?`;


let params = [req.body.quote,  
              req.body.category, req.body.quoteId];         
let rows = await executeSQL(sql,params);

res.redirect("/quotes");

});

app.get("/quotes/delete", async function(req, res) {
   let sql = `DELETE
             FROM q_quotes
             WHERE quoteId = ${req.query.quoteId}`
   let rows = await executeSQL(sql);
   res.redirect("/quotes");
})





//start server
app.listen(3000, () => {
   console.log("Expresss server running...")
})

