# kotidata

This is a project to transform an extra display at home to display useful information. Right now it shows time and date (of course), nearest bus and tram stops timetables, and also current price of electricity as well as electricity prices in columns.

The data is fetched from different APIs and displayed in a simple react app.

- Electricity data: https://porssisahko.net/api
- Timetables: https://digitransit.fi/en/developers/

## client

### React & vite

Client starts with `npm run dev` and runs in port 5173.

## server

### Node.js & Express

Server starts with `npx nodemon`and runs in port 5004.


## Electricity prices

Columns are done with recharts

## TODO

Weather would be nice!
And I have couple of ruuvitags at home, it would be wonderful to show data from them too.
