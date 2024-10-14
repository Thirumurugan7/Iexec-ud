// Checking if 3,4,5 pattern digits are the same
const checkAllSame = (number) => {
      if (number.length !== 10) {
        return false; // Return false if the number doesn't have exactly 10 digits
      }
    
      let digitCounts = 1;
      const digitCountsArray = [];
    
      for (let i = 0; i < 9; i++) {
        if (number[i] === number[i + 1]) {
          digitCounts += 1;
          if (i === 8) {
            digitCountsArray.push(digitCounts);
          }
        } else {
          digitCountsArray.push(digitCounts);
          digitCounts = 1;
        }
      }
    
      return digitCountsArray.some((count) => [3, 4, 5].includes(count));
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
            ? parseInt(number[i]) === parseInt(number[i + 1]) - 1
            : parseInt(number[i]) === parseInt(number[i + 1]) + 1
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
    
      return ascSeqArray.some((count) => [3, 4, 5].includes(count));
    };
    
    export const checkSilverNumber = (number) => {
      if (
        checkAllSame(number) ||
        checkSequence(number, true) ||
        checkSequence(number, false)
      ) {
        return true; // Number is silver
      } else {
        return false; // Number is not silver
      }
    };
    