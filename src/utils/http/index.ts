export const is200 = (statusCode: number): boolean => statusCode === 200;
export const is201 = (statusCode: number): boolean => statusCode === 201;
export const is204 = (statusCode: number): boolean => statusCode === 204;
export const is20x = (statusCode: number): boolean => statusCode >= 200 && statusCode <= 299;
export const is400 = (statusCode: number): boolean => statusCode === 400;
export const is401 = (statusCode: number): boolean => statusCode === 401;
export const is403 = (statusCode: number): boolean => statusCode === 403;
export const is404 = (statusCode: number): boolean => statusCode === 404;
export const is422 = (statusCode: number): boolean => statusCode === 422;
export const is40x = (statusCode: number): boolean => statusCode >= 400 && statusCode <= 499;
export const is500 = (statusCode: number): boolean => statusCode === 500;
export const is50x = (statusCode: number): boolean => statusCode >= 500 && statusCode <= 599;

export default {
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
