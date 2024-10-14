import React from "react";
import { checkDiamondNumber } from "./diamond-numbers/diamondNumCheckers";
import { checkGoldNumber } from "./gold-numbers/goldNumCheckers";
import { checkSilverNumber } from "./silver-numbers/silverNumCheckers";

const checkTier = (number) => {
  if (checkDiamondNumber(number)) {
    return "diamond";
  }

  if (checkGoldNumber(number)) {
    return "golden";
  }

  if (checkSilverNumber(number)) {
    return "silver";
  } else {
    return "bronze";
  }
};

export default checkTier;
