module.exports = {
  getNumbersToTen: (numbersObj) => {
    return [
      parseInt(numbersObj.n1, 10),
      parseInt(numbersObj.n2),
      parseInt(numbersObj.n3),
      parseInt(numbersObj.n4),
      parseInt(numbersObj.n5),
      parseInt(numbersObj.n6),
      parseInt(numbersObj.n7),
      parseInt(numbersObj.n8),
      parseInt(numbersObj.n9),
      parseInt(numbersObj.n10),
    ];
  },
  getNumbersToTwenty: (numbersObj) => {
    return [
      parseInt(numbersObj.n11),
      parseInt(numbersObj.n12),
      parseInt(numbersObj.n13),
      parseInt(numbersObj.n14),
      parseInt(numbersObj.n15),
      parseInt(numbersObj.n16),
      parseInt(numbersObj.n17),
      parseInt(numbersObj.n18),
      parseInt(numbersObj.n19),
      parseInt(numbersObj.n20),
    ];
  },
  getEmptyNumbersObj: () => ({
    n1: 0,
    n2: 0,
    n3: 0,
    n3: 0,
    n4: 0,
    n5: 0,
    n6: 0,
    n7: 0,
    n8: 0,
    n9: 0,
    n10: 0,
    n11: 0,
    n12: 0,
    n13: 0,
    n14: 0,
    n15: 0,
    n16: 0,
    n17: 0,
    n18: 0,
    n19: 0,
    n20: 0,
  })
};
