const express = require('express');
const bodyParser = require('body-parser')

const { userRoute } = require('./backend/routes/user')
//const { privateApp } = require('./backend/routes/private')

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
//app.use(bodyParser);


app.get('/', (req, res) => {
    res.json({
        message: 'HomePage'
    })
})

app.use("/user", userRoute);

//app.use('/user', privateApp)

app.listen(3000, () => {
    console.log('Server is Running on Port 3000')
})
