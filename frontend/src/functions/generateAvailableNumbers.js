export const generateAvailableNumbers = (number, numSuggestions) => {
    const firstThreeDigits = number.substring(0, 3); // extract the first three digits
  
    const similarNumbers = []; // an array to store the similar numbers
    let count = 0; // a counter for the number of similar numbers generated
  
    while (count < numSuggestions) {
      // repeat until 6 similar numbers are generated
      let similarNumber;
  
      do {
        const lastSevenDigits = Math.floor(Math.random() * 10000000)
          .toString()
          .padStart(7, "0"); // generate a random combination of the last seven digits
  
        similarNumber = firstThreeDigits + lastSevenDigits; // combine the first three digits with the random combination of the last seven digits
      } while (
        similarNumber === number ||
        similarNumbers.includes(similarNumber)
      ); // repeat until a different number is generated
  
      similarNumbers.push(similarNumber); // add the similar number to the array
      count++; // increment the counter
    }
  
    return similarNumbers;
  };