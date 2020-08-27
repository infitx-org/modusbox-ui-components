import * as http from './index';

function testWrongCodes(tester, skipStatusCode) {
  const statusCodes = [100, 200, 300, 400, 500];
  statusCodes
    .filter(statusCode => statusCode !== skipStatusCode)
    .forEach(statusCode => {
      expect(tester(statusCode)).toBe(false);
    });
}

describe('tests the HTTP status code testers', () => {
  it('Should test for the 200 status code', () => {
    expect(http.is200(200)).toBe(true);
    testWrongCodes(http.is200, 200);
  });
  it('Should test for the 201 status code', () => {
    expect(http.is201(201)).toBe(true);
    testWrongCodes(http.is201, 200);
  });
  it('Should test for the 204 status code', () => {
    expect(http.is204(204)).toBe(true);
    testWrongCodes(http.is204, 200);
  });
  it('Should test for the 400 status code', () => {
    expect(http.is400(400)).toBe(true);
    testWrongCodes(http.is400, 400);
  });
  it('Should test for the 401 status code', () => {
    expect(http.is401(401)).toBe(true);
    testWrongCodes(http.is401, 400);
  });
  it('Should test for the 403 status code', () => {
    expect(http.is403(403)).toBe(true);
    testWrongCodes(http.is403, 400);
  });
  it('Should test for the 404 status code', () => {
    expect(http.is404(404)).toBe(true);
    testWrongCodes(http.is404, 400);
  });
  it('Should test for the 422 status code', () => {
    expect(http.is422(422)).toBe(true);
    testWrongCodes(http.is422, 400);
  });
  it('Should test for the 500 status code', () => {
    expect(http.is500(500)).toBe(true);
    testWrongCodes(http.is500, 500);
  });
  it('Should test for the 20x status codes', () => {
    expect(http.is20x(200)).toBe(true);
    expect(http.is20x(201)).toBe(true);
    expect(http.is20x(299)).toBe(true);
    testWrongCodes(http.is20x, 200);
  });
  it('Should test for the 40x status codes', () => {
    expect(http.is40x(400)).toBe(true);
    expect(http.is40x(401)).toBe(true);
    expect(http.is40x(499)).toBe(true);
    testWrongCodes(http.is40x, 400);
  });
  it('Should test for the 50x status codes', () => {
    expect(http.is50x(500)).toBe(true);
    expect(http.is50x(501)).toBe(true);
    expect(http.is50x(599)).toBe(true);
    testWrongCodes(http.is50x, 500);
  });
});
