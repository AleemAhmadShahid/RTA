function validateAlphabeticWithSpace(input) 
{
    const regex = /^[A-Za-z\s]+$/;
    if (!regex.test(input)) {
      return "Alphabetic characters and Space allowed only";
    }
    return "";
  }
  
function validateAlphanumericWithSpace(input) 
{
    const regex = /^[A-Za-z0-9\s]+$/;
    if (!regex.test(input)) {
        return "Alphanumeric characters and Spaces allowed only.";
    }
    return "";
}
  

function validateEmail(input)
{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(input)) {
        return "Invalid email address.";
    }
    return "";
}

function validateNumeric(input) 
{
    const regex = /^[0-9]+$/;
    if (!regex.test(input)) {
    return "Numeric characters allowed only.";
    }
    return "";
}


export { 
    validateAlphabeticWithSpace, 
    validateAlphanumericWithSpace, 
    validateEmail, 
    validateNumeric,
  };