// Checking if 6,7,8 pattern digits are the same
const checkAllSame = (number) => {
  if (number.length !== 10) {
    return false; // Return false if the number doesn't have exactly 10 digits
  }
  const digitCounts = new Array(10).fill(0);
  const numberString = number.toString();

  for (let i = 0; i < numberString.length; i++) {
    const digit = parseInt(numberString[i]);
    digitCounts[digit]++;
  }

  const maxCount = Math.max(...digitCounts);
  return maxCount === 8 || maxCount === 7 || maxCount === 6;
};

const checkSequence = (number, isAsc) => {
  if (number.length !== 10) {
    return false; // Return false if the number doesn't have exactly 10 digits
  }

  let ascSeq = 1;
  const ascSeqArray = [];
  for (let i = 0; i < 9; i++) {
    if (
      isAsc
        ? parseInt(number[i]) === parseInt(number[i + 1] - 1)
        : parseInt(number[i]) === parseInt(number[i + 1] + 1)
    ) {
      ascSeq += 1;
      if (i === 8) {
        ascSeqArray.push(ascSeq);
      }
    } else {
      ascSeqArray.push(ascSeq);
      ascSeq = 1;
    }
  }

  return ascSeqArray.some((count) => [6, 7, 8].includes(count));
};

export const checkGoldNumber = (number) => {
  if (
    checkAllSame(number) ||
    checkSequence(number, true) ||
    checkSequence(number, false)
  ) {
    return true; //Numbers is gold - true
  } else {
    return false; //Number is gold - false
  }
};
