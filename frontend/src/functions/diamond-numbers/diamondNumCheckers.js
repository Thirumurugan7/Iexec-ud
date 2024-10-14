// Checking if at least 9 digits are the same
const checkAllSame = (number) => {
  if (number.length !== 10) {
    return false; // Return false if the number doesn't have exactly 10 digits
  }

  const digitCounts = {};

  for (let i = 0; i < number.length; i++) {
    const digit = number[i];
    digitCounts[digit] = (digitCounts[digit] || 0) + 1;
  }

  const repeatedDigits = Object.values(digitCounts).filter(
    (count) => count >= 9
  );

  return repeatedDigits.length > 0;
};

// Checking ascending/descending order if single digits only are in order
const checkSingle = (number, isAscOrder) => {
  if (number.length !== 10) {
    return false; // Return false if the number doesn't have exactly 10 digits
  }

  let ascSeq = 0;
  for (let i = 0; i < 9; i++) {
    if (
      isAscOrder
        ? parseInt(number[i]) >= parseInt(number[i + 1])
        : parseInt(number[i]) <= parseInt(number[i + 1])
    ) {
      ascSeq = ascSeq + 1;
      if (ascSeq === 2) {
        return false;
      }
    }
  }

  return true; // If all digits are in ascending order, return true
};

// Check only for double digits in asc/desc order
const checkDouble = (number, isAscOrder, isSameDigits) => {
  if (number.length !== 10) {
    return false; // Return false if the number doesn't have exactly 10 digits
  }

  for (let i = 0; i < 7; i += 2) {
    //Check for the simple double digits (for ex: 1213141516) and double digits of the same digits in asc order. For example 1122334455, etc
    if (
      parseInt(`${number[i]}${number[i + 1]}`) !==
      parseInt(
        isAscOrder
          ? isSameDigits
            ? `${number[i + 2]}${number[i + 3]}` - 11
            : `${number[i + 2]}${number[i + 3]}` - 1
          : isSameDigits
          ? +`${number[i + 2]}${number[i + 3]}` + 11 //use unary operator + before '', to add to a string and convert it to number
          : +`${number[i + 2]}${number[i + 3]}` + 1
      )
    ) {
      return false;
    }
  }

  return true;
};

// Checking if single and double digits are in ascending/descending order
const checkBothAsc = (number) => {
  if (number.length !== 10) {
    return false; // Return false if the number doesn't have exactly 10 digits
  }

  for (let i = 0; i < 9; i++) {
    if (parseInt(number[i]) !== parseInt(number[i + 1]) - 1) {
      //if it is latest single digit in the order
      if (
        (i === 0 || i === 1) &&
        (parseInt(`${number[i + 1]}${number[i + 2]}`) !==
          parseInt(`${number[i + 3]}${number[i + 4]}` - 1) ||
          parseInt(`${number[i + 3]}${number[i + 4]}`) !==
            parseInt(`${number[i + 5]}${number[i + 6]}` - 1) ||
          parseInt(`${number[i + 5]}${number[i + 6]}`) !==
            parseInt(`${number[i + 7]}${number[i + 8]}` - 1))
      ) {
        return false;
      }

      if (
        (i === 2 || i === 3) &&
        (parseInt(`${number[i + 1]}${number[i + 2]}`) !==
          parseInt(`${number[i + 3]}${number[i + 4]}` - 1) ||
          parseInt(`${number[i + 3]}${number[i + 4]}`) !==
            parseInt(`${number[i + 5]}${number[i + 6]}` - 1))
      ) {
        return false;
      }

      if (
        (i === 4 || i === 5) &&
        parseInt(`${number[i + 1]}${number[i + 2]}`) !==
          parseInt(`${number[i + 3]}${number[i + 4]}` - 1)
      ) {
        return false;
      }

      if (
        (i === 6 || i === 7) &&
        parseInt(number[i]) !== parseInt(`${number[i + 1]}${number[i + 2]}` - 1)
      ) {
        return false;
      } else {
        return true;
      }
    }
  }
};

// Checking if single and double digits are in ascending/descending order
const checkBothDesc = (number) => {
  if (number.length !== 10) {
    return false; // Return false if the number doesn't have exactly 10 digits
  }

  for (let i = 0; i < 9; i += 2) {
    if (
      parseInt(`${number[i]}${number[i + 1]}`) !==
      parseInt(+`${number[i + 2]}${number[i + 3]}` + 1)
    ) {
      // if (
      //   i === 0 &&
      //   parseInt(number[i + 2]) !== parseInt(number[i + 3]) + 1 &&
      //   parseInt(number[i + 3]) !== parseInt(number[i + 4]) + 1 &&
      //   parseInt(number[i + 4]) !== parseInt(number[i + 5]) + 1 &&
      //   parseInt(number[i + 5]) !== parseInt(number[i + 6]) + 1 &&
      //   parseInt(number[i + 6]) !== parseInt(number[i + 7]) + 1 &&
      //   parseInt(number[i + 7]) !== parseInt(number[i + 8]) + 1
      // ) {
      //   return false;
      // }
      if (
        i === 2 &&
        parseInt(number[i + 2]) === parseInt(number[i + 3]) + 1 &&
        parseInt(number[i + 3]) === parseInt(number[i + 4]) + 1 &&
        parseInt(number[i + 4]) === parseInt(number[i + 5]) + 1 &&
        parseInt(number[i + 5]) === parseInt(number[i + 6]) + 1 &&
        parseInt(number[i + 6]) === parseInt(number[i + 7]) + 1
      ) {
        return true;
      }

      if (
        i === 4 &&
        parseInt(number[i + 2]) === parseInt(number[i + 3]) + 1 &&
        parseInt(number[i + 3]) === parseInt(number[i + 4]) + 1 &&
        parseInt(number[i + 4]) === parseInt(number[i + 5]) + 1
      ) {
        return true;
      }

      if (i === 6 && parseInt(number[i + 2]) === parseInt(number[i + 3]) + 1) {
        return true;
      } else {
        return false;
      }
    }
  }
};

export const checkDiamondNumber = (number) => {
  if (
    checkAllSame(number) ||
    checkSingle(number, false) ||
    checkSingle(number, true) ||
    checkBothAsc(number) ||
    checkBothDesc(number) ||
    checkDouble(number, false, false) ||
    checkDouble(number, false, true) ||
    checkDouble(number, true, false) ||
    checkDouble(number, true, true)
  ) {
    return true; //Number is diamond - true
  } else {
    return false; //Number is not diamond
  }
};
