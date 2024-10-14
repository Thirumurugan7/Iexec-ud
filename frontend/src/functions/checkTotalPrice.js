import React from "react";
import checkPrice from "./checkPrice";
import { checkDiamondNumber } from "./diamond-numbers/diamondNumCheckers";
import { checkGoldNumber } from "./gold-numbers/goldNumCheckers";
import { checkSilverNumber } from "./silver-numbers/silverNumCheckers";
import checkTier from "./checkTier";

const checkTotalPrice = (arr) => {
  let totalPrice = 0;
  arr.map((num, index) => {
    if (checkDiamondNumber(num.toString())) {
      totalPrice += 1;
    } else if (checkGoldNumber(num.toString())) {
      totalPrice += 0.1;
    } else if (checkSilverNumber(num.toString())) {
      totalPrice += 0.01;
    } else {
      totalPrice += 0.001;
    }

    // console.log("onep", onep);
    // totalPrice = totalPrice + parseFloat(onep);
  });
  return totalPrice;
};

export default checkTotalPrice;
