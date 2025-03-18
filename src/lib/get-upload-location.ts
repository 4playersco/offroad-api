const getUploadLocation = (appendage: string) =>
  process.env.NODE_ENV === "development"
    ? `dev_${appendage}`
    : `prod_${appendage}`;

export default getUploadLocation;
