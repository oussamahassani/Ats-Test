
console.log(process.env.NODE_ENV === "development")
export const baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_DEV_URL
    : process.env.REACT_APP_PROD_URL
