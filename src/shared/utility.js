export const checkValidity = (value, rule) => {
  let isValid = true;
  if (rule.required) isValid = value.trim() !== "" && isValid;
  if (rule.maxLength) isValid = value.length <= rule.maxLength && isValid;
  if (rule.minLength) isValid = value.length >= rule.minLength && isValid;
  if (rule.isEmail) {
    isValid =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
        value
      ) && isValid;
  }
  if (rule.isNumeric) isValid = /^\d+$/.test(value) && isValid;

  return isValid;
};
