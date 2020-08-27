const is200 = (statusCode: number): boolean => statusCode === 200;
const is201 = (statusCode: number): boolean => statusCode === 201;
const is204 = (statusCode: number): boolean => statusCode === 204;
const is20x = (statusCode: number): boolean => statusCode >= 200 && statusCode <= 299;
const is400 = (statusCode: number): boolean => statusCode === 400;
const is401 = (statusCode: number): boolean => statusCode === 401;
const is403 = (statusCode: number): boolean => statusCode === 403;
const is404 = (statusCode: number): boolean => statusCode === 404;
const is422 = (statusCode: number): boolean => statusCode === 422;
const is40x = (statusCode: number): boolean => statusCode >= 400 && statusCode <= 499;
const is500 = (statusCode: number): boolean => statusCode === 500;
const is50x = (statusCode: number): boolean => statusCode >= 500 && statusCode <= 599;

export {
  is200,
  is201,
  is204,
  is20x,
  is400,
  is401,
  is403,
  is404,
  is422,
  is40x,
  is500,
  is50x,
};
