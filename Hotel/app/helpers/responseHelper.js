function getError(err, responce, data) {
    console.log(err);
    responce.set({
        'Content-Type': 'application/json'
    });
    responce.statusCode = 409;
    responce.send(JSON.stringify({ message : data}));
}

function getSuccess(responce, data) {
    responce.set({
        'Status': '202',
        'Content-Type': 'application/json'
    });
    responce.send(JSON.stringify({ message : data}));
}

exports.getSuccess = getSuccess
exports.getError = getError