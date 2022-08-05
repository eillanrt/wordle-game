// original code from rando js -- https://github.com/nastyox/Rando.js
// slightly modifed for only needed code

function cryptoRandom() {
  try {
    var cryptoRandoms,
      cryptoRandomSlices = [],
      cryptoRandom;
    while ((cryptoRandom = "." + cryptoRandomSlices.join("")).length < 30) {
      cryptoRandoms = (window.crypto || window.msCrypto).getRandomValues(new Uint32Array(5));
      for (var i = 0; i < cryptoRandoms.length; i++) {
        var cryptoRandomSlice = cryptoRandoms[i] < 4000000000 ? cryptoRandoms[i].toString().slice(1) : "";
        if (cryptoRandomSlice.length > 0) cryptoRandomSlices[cryptoRandomSlices.length] = cryptoRandomSlice;
      }
    }
    return Number(cryptoRandom);
  } catch (e) {
    return Math.random();
  }
}

function chooseRandom(arr) {
  var pickedIndex = (cryptoRandom() * arr.length) << 0;
  return arr[pickedIndex];
}

export default chooseRandom;
