var express = require('express');
var router = express.Router();
var itemList = [
  {
    "img": "/images/sample.png",
    "name": 0,
    "describ": "infossssssssssssssssssssssssssssssssssssssssssssssssss"
  },
  {
    "img": "/images/sample.png",
    "name": 1,
    "describ": "info"
  },
  {
    "img": "/images/sample.png",
    "name": 2,
    "describ": "info"
  },
  {
    "img": "/images/sample.png",
    "name": 3,
    "describ": "info"
  },
  {
    "img": "/images/sample.png",
    "name": 4,
    "describ": "info"
  },
  {
    "img": "/images/sample.png",
    "name": 5,
    "describ": "info"
  },
  {
    "img": "/images/sample.png",
    "name": 6,
    "describ": "info"
  },
  {
    "img": "/images/sample.png",
    "name": 7,
    "describ": "info"
  },
  {
    "img": "/images/sample.png",
    "name": 8,
    "describ": "info"
  },
  {
    "img": "/images/sample.png",
    "name": 9,
    "describ": "info"
  },
  {
    "img": "/images/sample.png",
    "name": 10,
    "describ": "info"
  },
  {
    "img": "/images/sample.png",
    "name": 11,
    "describ": "info"
  },
  {
    "img": "/images/sample.png",
    "name": 12,
    "describ": "info"
  },
  {
    "img": "/images/sample.png",
    "name": 13,
    "describ": "info"
  },
];
var cssList = [
  "/stylesheets/footer.css",
  "/stylesheets/header.css",
];

/* GET home page. */

router.get('/', (req, res, next) => {
  res.redirect('/1');
});

router.get('/:id', (req, res, next) => {
  res.totalPage = parseInt(itemList.length / 8 + 1);
  next();
});

router.get('/:id', (req, res, next) => {
  res.itemList = itemList.slice(
    (req.params.id-1) * 8, 
    (req.params.id) * 8 < itemList.length -1  ? (req.params.id)*8 : itemList.length -1
  );
  next();
})

router.get('/:id', (req, res, next) => {
  res.cssList = [
    "/stylesheets/index.css",
    ...cssList,
  ];
  next();
});

router.get('/:id', (req, res, next) => {
  res.render('index', {
    title: 'ItemList', 
    itemList: res.itemList, 
    cssList: res.cssList,
    nowPage: req.params.id,
    totalPage: res.totalPage,
  });
});

module.exports = router;
