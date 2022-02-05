const express = require('express');
const app = express();
const router = express.Router();

const PORT = process.env.PORT || 5500;

app.use((req, res, next) => {
    console.log(`${req.method} - ${req.path} : ${req.ip}`);
    next();
});

app.use("/public", express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

router.get('/:timestamp', (req, res) => {

    var date;
    var timestamp = req.params.timestamp;

    if(isNaN(timestamp)){
        timestamp = Date.parse(timestamp);
    }
    else{
        timestamp = parseInt(timestamp);
    }

    console.log(timestamp);

    date = new Date(timestamp);

    res.json({
        unix: date.getTime(),
        utc: date.toUTCString()
    })
});

app.use('/api', router);

app.use(function (req, res) {
    if (req.method.toLowerCase() === "options") {
        res.end();
    } else {
        res.status(404).type("txt").send("404 Not Found");
    }
});

app.listen(PORT, () => {
    console.log('Node is listening on port ' + PORT + '...');
});