const formatError = (error: unknown) => {
  if (typeof error === "string") {
    return error;
  } else if (error instanceof Error) {
    return error.message;
  }

  return "";
};

export default formatError;
