export const findRepNumber = (number) => {
      //--- Check how many digits are repeated at the initial number ----
      const digitCounts = {};
      for (let i = 0; i < number.length; i++) {
        const digit = number[i];
        if (digitCounts[digit]) {
          digitCounts[digit]++;
        } else {
          digitCounts[digit] = 1;
        }
      }
    
      const repeatedDigits = Object.values(digitCounts).filter(
        (count) => count >= 5
      );
    
      if (repeatedDigits.length > 0) {
        //If at least 5 digits are repeated in the number.
    
        for (const key in digitCounts) {
          if (digitCounts[key] === repeatedDigits[0]) {
            return key;
          }
        }
      } else {
        console.log("No 5 or more digits are repeated in the number.");
        return null;
      }
    };
    