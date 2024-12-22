import { validEmail, stringToColor } from '../utils';

describe('validEmail', () => {
  it('should return true for valid email addresses', () => {
    expect(validEmail('test@example.com')).toBe(true);
    expect(validEmail('user.name+tag+sorting@example.com')).toBe(true);
    expect(validEmail('user.name@example.co.uk')).toBe(true);
  });

  it('should return false for invalid email addresses', () => {
    expect(validEmail('plainaddress')).toBe(false);
    expect(validEmail('@missingusername.com')).toBe(false);
    expect(validEmail('username@.com')).toBe(false);
    expect(validEmail('username@.com.')).toBe(false);
    expect(validEmail('username@com')).toBe(false);
  });
});

describe('stringToColor', () => {
  it('should return a valid hex color code for a given string', () => {
    expect(stringToColor('test')).toMatch(/^#[0-9a-fA-F]{6}$/);
    expect(stringToColor('example')).toMatch(/^#[0-9a-fA-F]{6}$/);
    expect(stringToColor('color')).toMatch(/^#[0-9a-fA-F]{6}$/);
  });

  it('should return the same color code for the same string', () => {
    expect(stringToColor('test')).toBe(stringToColor('test'));
    expect(stringToColor('example')).toBe(stringToColor('example'));
    expect(stringToColor('color')).toBe(stringToColor('color'));
  });

  it('should return different color codes for different strings', () => {
    expect(stringToColor('test')).not.toBe(stringToColor('example'));
    expect(stringToColor('example')).not.toBe(stringToColor('color'));
    expect(stringToColor('color')).not.toBe(stringToColor('test'));
  });
});