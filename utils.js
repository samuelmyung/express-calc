const { BadRequestError } = require("./expressError");


/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */

function convertStrNums(strNums) {
  // if the conversion isn't successful, throw a BadRequestError and will
  // be handled in your route
  const nums = [];
  for (let num of strNums){
    console.log(Number(num))
    if (isNaN(Number(num))){
      throw new BadRequestError(`${num} is not a number`);
    }
    nums.push(Number(num));
    }
    return nums;
  }


module.exports = { convertStrNums };