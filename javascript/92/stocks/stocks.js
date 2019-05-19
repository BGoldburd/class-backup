const express = require('express');
const path = require('path');
const https = require('https');
const bl = require('bl');

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.get('/', (req, res, next) => {
    if (!req.query.symbol) {
        return res.render('layout');
    }

    https.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${req.query.symbol}&apikey=KNITZGP6FG8IZGZR`, httpRes => {
        httpRes.pipe(bl((err, data) => {
            if (err) {
                next(err);
            } else {
                data = JSON.parse(data.toString());
                if (data['Error Message']) {
                    return next(new Error('Did you enter a valid symbol?'));
                }
                const md = data['Meta Data'];
                const lastRefreshed = new Date(md['3. Last Refreshed']);
                const stockInfo = {
                    information: md['1. Information'],
                    symbol: md['2. Symbol'].toUpperCase(),
                    lastRefreshed: `${lastRefreshed.toLocaleDateString()} ${lastRefreshed.toLocaleTimeString()}`
                };
                const ts = data['Time Series (Daily)'];
                const timeSeries = Object.keys(ts).map(d => {
                    return {
                        date: d,
                        open: ts[d]['1. open'],
                        high: ts[d]['2. high'],
                        low: ts[d]['3. low'],
                        close: ts[d]['4. close'],
                        volume: ts[d]['5. volume'],
                    };
                });
                if (req.query.sort && req.query.sort !== 'date') {
                    timeSeries.sort((a, b) => (a[req.query.sort] - b[req.query.sort]) * -1);
                }
                if (req.query.direction === "asc") {
                    timeSeries.reverse();
                }
                res.render('layout', {
                    stockInfo,
                    timeSeries,
                    dateDirection: (!req.query.sort || req.query.sort === 'date') && !req.query.direction ? '&direction=asc' : undefined,
                    openDirection: req.query.sort === 'open' && !req.query.direction ? '&direction=asc' : undefined,
                    highDirection: req.query.sort === 'high' && !req.query.direction ? '&direction=asc' : undefined,
                    lowDirection: req.query.sort === 'low' && !req.query.direction ? '&direction=asc' : undefined,
                    closeDirection: req.query.sort === 'close' && !req.query.direction ? '&direction=asc' : undefined,
                    volumeDirection: req.query.sort === 'volume' && !req.query.direction ? '&direction=asc' : undefined,
                    partials: {
                        content: 'stocks'
                    }
                });
            }
        }));
    }).on('error', err => next(err));
});

app.use((err, req, res, next) => {
    res.render('layout', {
        message: err.message,
        partials: {
            content: 'error'
        }
    });
});

app.listen(8080);