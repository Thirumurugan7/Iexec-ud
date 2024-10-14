import { findRepNumber } from "../findRepeatedNums";
import {GlobalURL} from "../../constants";
import axios from "axios";

export const generateGoldNumbers = async (number) => {
  //------------------------------------------Functions for all same or at least 9 same numbers---------------------------

  //generate rand number, except some number
  function randomExcluded(excluded) {
    var n = Math.floor(Math.random() * 9);
    if (n >= excluded) n++;
    return n;
  }

  const randSingleDigit = findRepNumber(number)
    ? findRepNumber(number)
    : Math.floor(Math.random() * 9); // Generate a random digit (0 to 9)

  const eightRepeatNumberArray = Array(8).fill(randSingleDigit);
  const sevenRepeatNumberArray = Array(7).fill(randSingleDigit);
  const sixRepeatNumberArray = Array(6).fill(randSingleDigit);

  for (let i = 0; i < 2; i++) {
    eightRepeatNumberArray.splice(
      Math.floor(Math.random() * 9),
      0,
      randomExcluded(randSingleDigit)
    );
  }

  const eightRepeatNumber = eightRepeatNumberArray.join("");

  for (let i = 0; i < 3; i++) {
    sevenRepeatNumberArray.splice(
      Math.floor(Math.random() * 9),
      0,
      randomExcluded(randSingleDigit)
    );
  }

  const sevenRepeatNumber = sevenRepeatNumberArray.join("");

  for (let i = 0; i < 4; i++) {
    sixRepeatNumberArray.splice(
      Math.floor(Math.random() * 9),
      0,
      Math.floor(Math.random() * 9)
    );
  }

  const sixRepeatNumber = sixRepeatNumberArray.join("");

  const similarNumbers = [];

  similarNumbers.push(eightRepeatNumber, sevenRepeatNumber, sixRepeatNumber);

  try {
    const uniqueNumbersToCheck = [...new Set(similarNumbers)];

    const res = await axios.post(`${GlobalURL}/coinbase/checknumbersgen`, {
      numbers: uniqueNumbersToCheck,
    });

    const { results } = res.data;

    const availableNumbers = results
      .filter((result) => !result.exists)
      .map((result) => result.number);
    console.log("gold values", availableNumbers);
    return availableNumbers;
  } catch (error) {
    console.error("Error checking numbers with backend:", error);
    throw error;
  }

  return similarNumbers;
};
