const { expect } = require('chai');
const MockDate = require('mockdate');
const { env, normalizePort, getDateFormat, getFullUrl } = require('./utils');

describe('env', () => {
  it('should return a default value for non-existing config', () => {
    expect(env('DUMMY_CONFIG', 'debug')).equal('debug');
  });
  it("should return truthy value for 'true'", () => {
    process.env.TRUTHY_CONFIG = 'true';
    expect(env('TRUTHY_CONFIG')).true;
  });
  it("should return falsy value for 'false'", () => {
    process.env.FALSY_CONFIG = 'false';
    expect(env('FALSY_CONFIG')).false;
  });
  it("should return empty string value for '(empty)'", () => {
    process.env.EMPTY_CONFIG = '(empty)';
    expect(env('EMPTY_CONFIG')).equal('');
  });
});

describe('normalizePort', () => {
  it('should parse a given port to integer', () => {
    expect(normalizePort('8080')).equal(8080);
  });
  it('should return false if port is below zero', () => {
    expect(normalizePort(-1)).false;
  });
  it('should return NaN for NaN value', () => {
    expect(normalizePort(NaN)).NaN;
  });
});

describe('getDateFormat', () => {
  beforeEach(() => {
    MockDate.set('2020-4-9');
  });

  afterEach(function() {
    MockDate.reset();
  });

  it('should return the current formatted date', () => {
    expect(getDateFormat()).equal('20200409000');
  });
});

describe('getFullUrl', () => {
  beforeEach(() => {
    process.env.APP_URL = '';
  });

  it('should return the current formatted date', () => {
    expect(getFullUrl('public/image.jpg')).equal('/image.jpg');
  });
});
