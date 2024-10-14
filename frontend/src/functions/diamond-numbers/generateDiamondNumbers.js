import axios from "axios";
import { findRepNumber } from "../findRepeatedNums";
import { GlobalURL } from "../../constants";
const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateDiamondNumbers = async (number) => {
  const randSingleDigit = findRepNumber(number)
    ? findRepNumber(number)
    : generateRandomNumber(0, 9);

  const allRepeatNumber = Array(10).fill(randSingleDigit).join("");
  const nineRepeatNumberArray = Array(9).fill(randSingleDigit);
  nineRepeatNumberArray.splice(
    generateRandomNumber(0, 8),
    0,
    generateRandomNumber(0, 9)
  );
  const nineRepeatNumber = nineRepeatNumberArray.join("");

  const randAscDigit = generateRandomNumber(0, 109);
  const ascendingSeqNumber = Array.from(Array(10))
    .map((e, i) =>
      i + randAscDigit > 9 ? i + randAscDigit - 10 : i + randAscDigit
    )
    .join("")
    .substring(0, 10);

  const randDescDigit = generateRandomNumber(9, 100);
  const descendingSeqNumber = Array.from(Array(10))
    .map((e, i) => randDescDigit - i)
    .join("")
    .substring(0, 10);

  const similarNumbers = [
    allRepeatNumber,
    nineRepeatNumber,
    ascendingSeqNumber,
    descendingSeqNumber,
  ];

  try {
    const uniqueNumbersToCheck = [...new Set(similarNumbers)];

    const res = await axios.post(`${GlobalURL}/coinbase/checknumbersgen`, {
      numbers: uniqueNumbersToCheck,
    });

    const { results } = res.data;

    const availableNumbers = results
      .filter((result) => !result.exists)
      .map((result) => result.number);
    console.log("diamond values", availableNumbers);
    return availableNumbers;
  } catch (error) {
    console.error("Error checking numbers with backend:", error);
    throw error;
  }

  // return similarNumbers;
};

export { generateDiamondNumbers };
