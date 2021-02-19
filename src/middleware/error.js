const errorHandler = (err, req, res, next) =>{
    res.status(500).send({
        success: false,
        error: err.message
    })
}
module.exports = errorHandler;