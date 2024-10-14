import React from "react";
import { checkDiamondNumber } from "./diamond-numbers/diamondNumCheckers";
import { checkGoldNumber } from "./gold-numbers/goldNumCheckers";
import { checkSilverNumber } from "./silver-numbers/silverNumCheckers";

const checkPrice = (number) => {
  if (checkDiamondNumber(number)) {
    return "1";
  }

  if (checkGoldNumber(number)) {
    return "0.1";
  }

  if (checkSilverNumber(number)) {
    return "0.01";
  } else {
    return "0.001";
  }
};

export default checkPrice;
