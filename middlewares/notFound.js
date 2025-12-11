function notFound(req, res, next) {
    res.status(404).json({
        error: true,
        message: err.message
    })
}

module.exports = notFound