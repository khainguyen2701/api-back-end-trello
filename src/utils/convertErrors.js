const convertErrors = (error) => {
  const errorMessages = {};

  error?.forEach((detail) => {
    const key = detail.context.key;
    const message = detail.message;

    if (errorMessages[key]) {
      errorMessages[key].push(message);
    } else {
      errorMessages[key] = [message];
    }
  });
  console.log(errorMessages);
  return errorMessages;
};

export default convertErrors;
