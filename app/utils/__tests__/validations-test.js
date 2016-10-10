/* eslint-env node, jest */
'use strict';

import * as validations from '../validations';

describe('validate email', () => {
  describe('incorrect validations', () => {
    it('should be false when email is blank', () => {
      expect(validations.validateEmail('')).toBeFalsy();
    });

    it('should be false when email is not formatted correctly', () => {
      expect(validations.validateEmail('abcdi12d')).toBeFalsy();
    });
  });

  describe('correct validations', () => {
    it('should return true witch correctly formatted email', () => {
      expect(validations.validateEmail('hello@underbelly.is')).toBeTruthy();
    });
  });
});

describe('validate password', () => {
  describe('incorrect validations', () => {
    it('should be false when password =< 5 characters', () => {
      expect(validations.validatePassword('abc12')).toBeFalsy();
    });
  });

  describe('correct validations', () => {
    it('should be true when password >= 6 characters', () => {
      expect(validations.validatePassword('abc123')).toBeTruthy();
    });
  });
});

describe('Validate number', () => {
  describe('incorrect validations', () => {
    it('should be false if it is a letter passed in', () => {
      expect(validations.validateNum('a')).toBeFalsy();
    });
  });

  describe('correct validations', () => {
    it('should be true when int is passed in as a string', () => {
      expect(validations.validateNum('123')).toBeTruthy();
    });

    it('should be true when int is passed in as a int', () => {
      expect(validations.validateNum(123)).toBeTruthy();
    });

    it('should be true when int is passed in as a float', () => {
      expect(validations.validateNum(123.0)).toBeTruthy();
    });
  });
});

describe('Validate credentials', () => {
  describe('incorrect validations', () => {
    it('should be false when email is blank', () => {
      expect(validations.validateCredentials({
        email: '',
        password: 'abcd123',
      })).toBeFalsy();
    });

    it('should be false when email is not formatted correctly', () => {
      expect(validations.validateCredentials({
        email: 'abcdi12d',
        password: 'abcd123',
      })).toBeFalsy();
    });

    it('should return false if password is <= 5 characters', () => {
      expect(validations.validateCredentials({
        email: 'abcdi12d',
        password: 'abc12',
      })).toBeFalsy();
    });
  });

  describe('correct validations', () => {
    it('should return true witch correctly formatted email', () => {
      expect(validations.validateCredentials({
        email: 'hello@underbelly.is',
        password: 'abcd123',
      })).toBeTruthy();
    });

    it('should return true if password is >= 6 characters', () => {
      expect(validations.validateCredentials({
        email: 'hello@underbelly.is',
        password: 'abc123',
      })).toBeTruthy();
    });
  });
});
