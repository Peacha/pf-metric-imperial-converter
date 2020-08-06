/*
*
*
*       Complete the handler logic below
*       
*       
*/

const math = require('mathjs');

function ConvertHandler() {
  
  this.getNum = function(input) {
    //if no number was provided, then return 1
    if (input.match(/^mi$|^km$|^gal$|^l$|^lbs$|^kg$/i)) {
      return 1;
    }
    //split the unit from the input string.
    //if we are dealing with a double fraction or an invalid number, return invalid number
    if (input.length > 0 && input.match(/\/\/|^[^0-9]+/i)){
      return "invalid number";
    }
    //otherwise discover where the unit is supposed to start, and then process it
    var tempNumber = input.substring(0,(input.match(/[a-zA-Z]/i).index))
    //carry out an evaluation.  If there is a number produced, return it.
    var result = math.evaluate(tempNumber)
    if ((typeof result) === 'number')
    {
      return parseFloat(parseFloat(result).toFixed(5));
    } 
    //otherwise its not valid.
    return "invalid number";
  };
  
  this.getUnit = function(input) {
    //pass the unit splitted from numbers and non word characters.  lowercase it all for evaluation
    var result = input.substring(input.match(/[a-zA-Z]+$/).index,input.length).toLowerCase()
    //check the unit provided is valid
    if (result === "mi" || result === "km" || result === "gal" || result === "l" || result === "lbs" || result === "kg")
    {
      return result;
    }
    //return the unit
    return "invalid unit";
  };
  
  this.getReturnUnit = function(initUnit) {
    var result;
    //take the input unit, return the opposite
    switch (initUnit) {
      case "mi":
        return "km";
      case "km":
        return "mi";
      case "gal":
        return "l";
      case "l":
        return "gal";
      case "lbs":
        return "kg";
      case "kg":
        return "lbs"
      default:
        return "invalid unit"
    }
  };

  this.spellOutUnit = function(unit) {
    //convert the short text to long text for the unit.  Use this in getString method.
    var result;
    switch (unit) {
      case "mi":
        return "miles";
      case "km":
        return "kilometres";
      case "gal":
        return "gallons";
      case "l":
        return "litres";
      case "lbs":
        return "pounds";
      case "kg":
        return "kilograms"
      default:
        return "invalid unit"
    }
  };
  
  this.convert = function(initNum, initUnit) {
    //take the input number and unit, return the conversion
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    var result;
    switch (initUnit) {
      case "mi":
        return parseFloat(parseFloat(initNum * miToKm).toFixed('5'))
      case "km":
        return parseFloat(parseFloat(initNum / miToKm).toFixed('5'))
      case "gal":
        return parseFloat(parseFloat(initNum * galToL).toFixed('5'))
      case "l":
        return parseFloat(parseFloat(initNum / galToL).toFixed('5'))
      case "lbs":
        return parseFloat(parseFloat(initNum * lbsToKg).toFixed('5'))
      case "kg":
        return parseFloat(parseFloat(initNum / lbsToKg).toFixed('5'))
      default:
        return "invalid number"
    }
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    //this will format the string property of the object to be returned.
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`  
  };
  
}

module.exports = ConvertHandler;
