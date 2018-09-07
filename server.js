const axios = require('axios');
const purchaseModel = require('./schema/purchase');
const mongoose = require('mongoose');
const createBitemexOption = require('./createBitmexOption');

mongoose.connect(
  'mongodb+srv://martin:OS9L9FgNjUXhQDJL@bluemongocluster-fberf.mongodb.net/test?retryWrites=true',
  { useNewUrlParser: true }
);

const getCurrencyList = require('./currencyList');
const currencyList = getCurrencyList();

const bithumbApiList = [];
const bitMexApiList = ['XBT', 'ADA', 'BCH', 'EOS', 'ETH', 'LTC', 'TRX', 'XRP'];

for (var i = 0; i < currencyList.length; i++) {
  bithumbApiList.push(
    'https://api.bithumb.com/public/transaction_history/' + currencyList[i]
  );
}

var count1 = 0;
var count2 = 0;

const bithumbCall = function() {
  axios.get(bithumbApiList[count1 % bithumbApiList.length]).then(
    res => {
      //   console.log('result:', res.data);
      purchaseModel.create({
        price: res.data.data[0].price,
        type: bithumbApiList[count1 % bithumbApiList.length].split('/')[
          bithumbApiList[count1 % bithumbApiList.length].split('/').length - 1
        ],
        createdAt: Date.now()
      });

      count1++;
    },
    err => {
      console.log(err);
    }
  );
};

const bitmexCall = function() {
  const option = createBitemexOption(
    bitMexApiList[count2 % bitMexApiList.length]
  );

  console.log(option);
  console.log(bithumbApiList[count2 % bitMexApiList.length]);

  axios
    .get(
      'https://www.bitmex.com/api/v1/quote?symbol=' +
        bitMexApiList[count2 % bitMexApiList.length],
      option
    )
    .then(
      res => {
        console.log('result:', res);
        purchaseModel.create({
          price: res.data.data[0].price,
          type: bitMexApiList[count2 % bitMexApiList.length],
          createdAt: Date.now()
        });

        count2++;
      },
      err => {
        // console.log(err);
      }
    );
};

setInterval(bithumbCall, 3000);
setInterval(bitmexCall, 3000);
