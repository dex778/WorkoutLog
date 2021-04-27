const headers = (req, res, next) => {
    res.header('Acess-Control-Allow-Origin', '*') //this lets anyone communicate with my server
    res.header('Acess-Control-Allow-Methods', 'POST, PUT, GET, DELETE, OPTIONS'); //limits what methods are allowed to work on our servers
    res.header('Acess-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Authorization')
    return next();
} 

module.exports = headers