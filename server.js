const express = require('express');
const app = express();
const router = express.Router();

const PORT = process.env.PORT || 5500;

router.get('/', (req, res) => {

    const date = new Date(Date.now());
    
    res.json({
        unix: date.getTime(),
        utc: date.toUTCString()
    });
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

    if(isNaN(timestamp)){
        return res.json({
            error : "Invalid Date"
        });
    }

    date = new Date(timestamp);

    res.json({
        unix: date.getTime(),
        utc: date.toUTCString()
    });
});

app.use((req, res, next) => {
    console.log(`${req.method} - ${req.path} : ${req.ip}`);
    next();
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.use("/public", express.static(__dirname + '/public'));

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