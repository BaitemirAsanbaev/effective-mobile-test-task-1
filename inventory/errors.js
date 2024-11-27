const BadRequest = (res, message="Bad Request")=>{
    return res.status(400).json({ message });
}

const ServerError = (res, message="Internal Server Error")=>{
    res.status(500).json({ message});
}
module.exports = {BadRequest, ServerError}