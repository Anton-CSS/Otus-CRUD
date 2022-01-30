const express = require("express");

const PORT = 7000;
const app = express();
const cors = require("cors");

let events = [
  {
    id: 1,
    date: "2022-01-01",
    tag: "job",
    status: false,
    text: "don't forget the key",
    fill: true,
  },
  {
    id: 2,
    date: "2022-01-02",
    tag: "job",
    status: false,
    text: "don't forget the key",
    fill: true,
  },
  {
    id: 3,
    date: "2022-01-03",
    tag: "job",
    status: false,
    text: "don't forget the key",
    fill: true,
  },
  { id: 4, date: "2022-01-04", fill: false },
  { id: 5, date: "2022-01-05", fill: false },
  { id: 6, date: "2022-01-06", fill: false },
  { id: 7, date: "2022-01-07", fill: false },
  { id: 8, date: "2022-01-08", fill: false },
  { id: 9, date: "2022-01-09", fill: false },
  {
    id: 10,
    date: "2022-01-10",
    tag: "home",
    status: false,
    text: "You need to take your children from kindergarten",
    fill: true,
  },
  {
    id: 11,
    date: "2022-01-11",
    tag: "home",
    status: false,
    text: "You need to take your children from kindergarten",
    fill: true,
  },
  {
    id: 12,
    date: "2022-01-12",
    tag: "home",
    status: false,
    text: "You need to take your children from kindergarten",
    fill: true,
  },
  { id: 13, date: "2022-01-13", fill: false },
  { id: 14, date: "2022-01-14", fill: false },
  { id: 15, date: "2022-01-15", fill: false },
  { id: 16, date: "2022-01-16", fill: false },
  { id: 17, date: "2022-01-17", fill: false },
  { id: 18, date: "2022-01-18", fill: false },
  { id: 19, date: "2022-01-19", fill: false },
  { id: 20, date: "2022-01-20", fill: false },
  { id: 21, date: "2022-01-21", fill: false },
  { id: 22, date: "2022-01-22", fill: false },
  { id: 23, date: "2022-01-23", fill: false },
  { id: 24, date: "2022-01-24", fill: false },
  {
    id: 25,
    date: "2022-01-25",
    tag: "purchase",
    status: true,
    text: "don't forget the key",
    fill: true,
  },
  {
    id: 26,
    date: "2022-01-26",
    tag: "purchase",
    status: true,
    text: "don't forget the key",
    fill: true,
  },
  {
    id: 27,
    date: "2022-01-27",
    tag: "purchase",
    status: true,
    text: "don't forget the key",
    fill: true,
  },
  { id: 28, date: "2022-01-28", fill: false },
  { id: 29, date: "2022-01-29", fill: false },
  { id: 30, date: "2022-01-30", fill: false },
  { id: 31, date: "2022-01-31", fill: false },
];
app.use(express.json());
app.use(cors());

app.get("/events", async (req, res) => {
  res.status(200).json(events);
});

app.get("/text", async (req, res) => {
  const { text } = req.query;
  const result = [];
  events.forEach((item) => {
    if (item.text && item.text.includes(text)) {
      result.push(item);
    }
  });
  res.status(200).json(result);
});

app.get("/status", async (req, res) => {
  const status = req.query.status === "true";
  const result = [];
  events.forEach((item) => {
    if (item.status === status) {
      result.push(item);
    }
  });
  res.status(200).json(result);
});

app.get("/tag", async (req, res) => {
  const { tag } = req.query;
  const result = [];
  events.forEach((item) => {
    if (item.tag && item.tag === tag) {
      result.push(item);
    }
  });
  res.status(200).json(result);
});

app.get("/date", async (req, res) => {
  const { date } = req.query;
  let result;
  events.forEach((item) => {
    if (item.date === date) {
      result = JSON.parse(JSON.stringify(item));
    }
  });
  res.status(200).json(result);
});

app.post("/event", async (req, res) => {
  const elem = req.body;
  let result;
  events = events.map((item) => {
    if (item.id === elem.id) {
      item.tag = elem.tag;
      item.status = false;
      item.text = elem.text;
      item.fill = true;
      result = item;
      return item;
    }
    return item;
  });
  res.status(200).json(result);
});

app.delete("/events/:id", async (req, res) => {
  const id = +req.params.id;
  const result = events.find((item) => item.id === id);
  delete result.text;
  delete result.tag;
  delete result.status;
  result.fill = false;
  res.status(200).json(result);
});

app.put("/event", async (req, res) => {
  const elem = req.body;
  const result = events.find((item) => item.id === elem.id);
  result.tag = elem.tag;
  result.status = elem.status;
  result.text = elem.text;
  res.status(200).json(result);
});

app.listen(PORT, () => console.log(`The server is working on port ${PORT}`));
