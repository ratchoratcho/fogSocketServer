const app = require('express')();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const io = require("socket.io")(http);
const EventEmitter = require('events');
const myEvent = new EventEmitter();

io.on('connection', socket => {
  console.log('a user connected');
  // predictionData == {"receive": 600B}
  myEvent.on('predictionComplete', (predictionData) => {
    io.emit('predictionData', predictionData);
  });
  myEvent.on('extractionComplete', (extractionData) => {
    io.emit('extractionData', extractionData);
  });
});

http.listen(4000, () => {
  console.log('listening on 4000 ...');
});

app.listen(5000, () => {
  console.log('litening on 5000 ...');
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/predictionData', (req, res, next) => {
  console.log('prediction data received');
  console.log(req.body);
  myEvent.emit('predictionComplete', req.body);
  res.send('prediction data received');
});
app.post('/extractionData', (req, res, next) => {
  console.log('extraction data received');
  console.log(req.body);
  myEvent.emit('extractionComplete', req.body);
  res.send('extraction data received');
});
