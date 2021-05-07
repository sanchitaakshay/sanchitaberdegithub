const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
 
const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'12345',
    database:'faculty'
});
 
connection.connect(function(error){
    if(!!error) console.log(error);
    else console.log('Database Connected!');
}); 
 
//set views file
app.set('views',path.join(__dirname,'views'));
			
//set view engine
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('images'));
app.use(express.static(__dirname + '/images'));

//faculty page view

app.get('/testD',(req, res) => {
    let sql = "SELECT * FROM fac";
    let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
        res.render('faculty1view', {
            
            fac : rows
        });
    });
});
//faculty registration

app.get('/testA',(req, res) => {
    res.render('facultyregistration', {
    
    });
});
 
app.post('/facultyreg',(req, res) => { 
    let data = {fullname: req.body.name, mobile: req.body.mobno, birthdate: req.body.Date,qualification: req.body.qualification, email: req.body.email, password: req.body.password};
    let sql = "INSERT INTO fac SET ?";
    let query = connection.query(sql, data,(err, results) => {
      if(err) throw err;
      res.redirect('testA');
    });
});

//faculty edit button
 
app.get('/edit1/:userId',(req, res) => {
    const userId = req.params.userId;
    let sql = `Select * from fac Where id = ${userId}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.render('facultyregedit', {
            
            teacher : result[0]
        });
    });
});

app.post('/facupdate/:id',(req, res) => {
    const userId = req.body.id;
    let sql = "update fac SET fullname='"+req.body.name+"', mobile ='"+req.body.mobno+"',  birthdate='"+req.body.Date+"',Qualification='"+req.body.qualification+"', email ='"+req.body.email+"',  password='"+req.body.password+"' where id ='"+userId+"'";
    let query = connection.query(sql,(err, results) => {
      if(err) throw err;
      res.redirect('/testD');
    });
});

//faculty delete button

app.get('/delete/:userId',(req, res) => {
    const userId = req.params.userId;
    let sql = `DELETE from fac where id = ${userId}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.redirect('/testD');
    });
});

//studentattendancehome page

app.get('/testF',function(req,res){
    res.sendFile(__dirname+'/studentattendancehome.html')
});

//faculty login
 
app.get('/testE',function(req,res){
    res.sendFile(__dirname+'/facultylogin.html')
});
app.post('/faclogin',function(req,res){
   var email=req.body.email;
   var password=req.body.password;
   if(email && password){
       connection.query('select * from fac where email=? and password=?',[email,password],function(err,results,field){
        if(results.length>0)
        {
            res.redirect('/testF');
        }
        else{
            res.send('incorrect username or password')
        }
        res.end();

    });
}
else{
    res.send('please enter user name and password' );
    res.end();
}
});

     






 
 //student page view
 
 app.get('/test4',(req, res) => {
    let sql = "SELECT * FROM student";
    let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
        res.render('studentview', {
            
            student : rows
        });
    });
});

//student registration page

app.get('/test1',(req, res) => {
    res.render('studentregistration', {
    
    });
});
 
app.post('/studentreg',(req, res) => { 
    let data = {fullname: req.body.name, address: req.body.address, gender: req.body.gender,birthday: req.body.Date, mobilenum: req.body.mobno, bid: req.body.bid, email: req.body.email, age: req.body.age};
    let sql = "INSERT INTO student SET ?";
    let query = connection.query(sql, data,(err, results) => {
      if(err) throw err;
      res.redirect('/test4');
    });
});
 
//student edit button page
app.get('/edit2/:userSId',(req, res) => {
    const userSId = req.params.userSId;
    let sql = `Select * from student Where id = ${userSId}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.render('studentedit', {
            
            stud : result[0]
        });
    });
});

app.post('/regupdate1/:id',(req, res) => {
    const userId = req.body.id;
    let sql = "update student SET fullname='"+req.body.name+"', address ='"+req.body.address+"',  gender='"+req.body.gender+"',birthday='"+req.body.Date+"', mobilenum ='"+req.body.mobno+"',  bid='"+req.body.bid+"',email ='"+req.body.email+"',  age='"+req.body.age+"'  where id ='"+userId+"'";
    let query = connection.query(sql,(err, results) => {
      if(err) throw err;
      res.redirect('/test4');
    });
});

//student delete button page
 
app.get('/delete/:userId',(req, res) => {
    const userId = req.params.userId;
    let sql = `DELETE from student where id = ${userId}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.redirect('/test4');
    });
});



//batch table view

app.get('/tests',(req, res) => {
    // res.send('CRUD Operation using NodeJS / ExpressJS / MySQL');
    let sql = "SELECT * FROM batch";
    let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
        res.render('batchview', {
            
            batch : rows
        });
    });
});


//batch registration page
app.get('/testp',(req, res) => {
    res.render('batchregistration', {
    
    });
});
 
app.post('/batchreg',(req, res) => { 
    let data = {batchname: req.body.batchname, startdate: req.body.startdate, enddate: req.body.enddate};
    let sql = "INSERT INTO batch SET ?";
    let query = connection.query(sql, data,(err, results) => {
      if(err) throw err;
      res.redirect('tests');
    });
});
 
//batch edit button page

app.get('/edit3/:userBId',(req, res) => {
    const userBId = req.params.userBId;
    let sql = `Select * from batch Where bid = ${userBId}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.render('batchedit', {
            
            bat: result[0]
        });
    });
});

app.post('/batchedit/:bid',(req, res) => {
    const userBId = req.body.bid;
    let sql = "update batch SET batchname='"+req.body.batchname+"', startdate ='"+req.body.startdate+"',  enddate='"+req.body.enddate+"' where bid ='"+userBId+"'";
    let query = connection.query(sql,(err, results) => {
      if(err) throw err;
      res.redirect('/tests');
    });
});

//batch delete button page
app.get('/delete/:userBId',(req, res) => {
    const userBId = req.params.userBId;
    let sql = `DELETE from batch where bid = ${userBId}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.redirect('/tests');
    });
});

//attendance table
/*app.get('/testIV',(req, res) => {
    // res.send('CRUD Operation using NodeJS / ExpressJS / MySQL');
    let sql = "SELECT * FROM attendance";
    let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
        res.render('attendanceview', {
            
            attendance: rows
        });
    });
});*/


/*app.get('/testI',(req, res) => {
    res.render('attendancereg', {
    
    });
});
 
app.post('/attendancereg',(req, res) => { 
    let data = {attendance:req.body.attendance,attendancedate:req.body.attendancedate};
    
    let sql = "INSERT INTO attendance SET ?";
    let query = connection.query(sql, data,(err, results) => {
      if(err) throw err;
      res.redirect('/testIV');
    });
});*/
 

/*app.get('/edit/:userSId',(req, res) => {
    const userSId = req.params.userSId;
    let sql = `Select * from attendance Where sid = ${userSId}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.render('attendanceedit', {
            
            attend : result[0]
        });
    });
});


app.post('/attendanceedit1/:sid',(req, res) => {
    const userSId = req.body.sid;
    let sql = "update attendance SET attendance='"+req.body.attendance+"',attendancedate='"+req.body.attendancedate+"' where sid ='"+userSId+"'";
    let query = connection.query(sql,(err, results) => {
      if(err) throw err;
      res.redirect('/testIV');
    });
});
 
app.get('/delete/:userSId',(req, res) => {
    const userSId = req.params.userSId;
    let sql = `DELETE from attendance where Sid = ${userSId}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.redirect('/testIV');
    });
});*/
//view join method
app.get('/testG',(req, res) => {
    let sql = "select id,fullname,batchname FROM student s inner join batch b on s.bid = b.bid";
    let query = connection.query(sql, (err,rows) => {
        if(err) throw err;
        res.render('all',{
            regs:rows

        });
    });
});


/*app.get('/testse',(req, res) => {
    let sql = "select id,fullname,batchname FROM student s inner join batch b on s.bid = b.bid ";
   
    let query = connection.query(sql, (err,rows) => {
        if(err) throw err;
        res.render('all',{
            regs:rows

        });
    });
});*/

//attendance view
app.get('/testc2',(req, res) => {
    // res.send('CRUD Operation using NodeJS / ExpressJS / MySQL');
    let sql = "select id,fullname,batchname,attendancedate,attendcheck FROM student s inner join batch b on s.bid = b.bid join attendancecheck";
   
    let query = connection.query(sql, (err,rows) => {
        if(err) throw err;
        res.render('attendcheck',{
            attend:rows

        });
    });
});







//search record in join table
app.get('/testO',(req, res) => {
    res.render('search',{
    
    });
});
 
app.get('/search1',(req, res) => { 
    const batchname=req.query.batchname;
    const attendancedate=req.query.attendancedate;
    let sql = "select id,fullname,batchname,attendancedate,attendcheck FROM student s inner join batch b on s.bid = b.bid join attendancecheck where batchname='"+batchname+"' and attendancedate='"+attendancedate+"'";
    let query = connection.query(sql,(err, rows) => {
      if(err) throw err;
      res.render('attendcheck',{
          attend:rows

      });
    });
});


/*app.get('/testm',(req, res) => {
     const batchname=req.query.batchname;
    // res.send('CRUD Operation using NodeJS / ExpressJS / MySQL');
    let sql = "select id,fullname,batchname,attendance,attendancedate FROM student s inner join batch b on s.bid = b.bid inner join attendance a on a.sid=s.id where batchname='fullstack'";
   
    let query = connection.query(sql, (err,rows) => {
        if(err) throw err;
        res.render('all',{
            regs:rows

        });
    });
});*/


//attendancecheck

app.get('/testC',(req, res) => {
    // res.send('CRUD Operation using NodeJS / ExpressJS / MySQL');
    let sql = "SELECT * FROM attendancecheck";
    let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
        res.render('ch', {
            
            attendancechecked: rows
        });
    });
});


app.get('/testc1',(req, res) => {
    res.render('ckecked', {
    
    });
});
 
/*app.post('/attendancecheck',(req, res) => { 
    let data = req.body.attendance;
    
    let sql = "INSERT INTO attendancecheck (attendcheck) values('"+data+"')";
    let query = connection.query(sql, data,(err, results) => {
      if(err) throw err;
      res.redirect('/testc2');
    });
});*/
app.post('./attendancecheck',(req,res) =>{
    var attendcheck=req.body.attendance;
    if(attendchecked=="true")
    {

       connection.query('insert into attendancheck (attendcheck) values("present")');
    
    }else{

    
        connection.query('insert into attendancheck (attendcheck) values("absent")');
    }
});
 
//dropdown.html
app.get('/testdropdown',function(req,res){
    res.sendFile(__dirname+'/dropdown.html')
});

//fullstackattendance
app.get('/fullstackattend',(req, res) => {
    const batchname=req.query.batchname;
   let sql = "select id,fullname,batchname FROM student s inner join batch b on s.bid = b.bid where batchname='fullstack'";
  
   let query = connection.query(sql, (err,rows) => {
       if(err) throw err;
       res.render('all',{
           regs:rows

       });
   });
});

//javaattend
app.get('/javaattend',(req, res) => {
    const batchname=req.query.batchname;
   let sql = "select id,fullname,batchname FROM student s inner join batch b on s.bid = b.bid where batchname='java'";
  
   let query = connection.query(sql, (err,rows) => {
       if(err) throw err;
       res.render('all',{
           regs:rows

       });
   });
});

//dot net attend
app.get('/dotnetattend',(req, res) => {
    const batchname=req.query.batchname;
   let sql = "select id,fullname,batchname FROM student s inner join batch b on s.bid = b.bid where batchname='dot net'";
  
   let query = connection.query(sql, (err,rows) => {
       if(err) throw err;
       res.render('all',{
           regs:rows

       });
   });
});


// Server Listening
app.listen(4000, () => {
    console.log('Server is running at port 4000');
});