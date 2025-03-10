const app = require('./server')

const port = process.env.PORT || 8000;
const listening=()=>{
    console.log('Server Running');
    console.log(`Running on localhost: ${port}`);
}
const server = app.listen(process.env.PORT || port, listening);


module.exports = server;