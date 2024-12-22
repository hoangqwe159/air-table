import '@testing-library/jest-dom'
import { applyFilter, type Person, type Filter } from "../mock";

const mockData: Person[] = [
  { firstName: 'John', lastName: 'Doe', age: 30, email: 'john.doe@example.com', phone: '1234567890', city: 'New York' },
  { firstName: 'Jane', lastName: 'Smith', age: 25, email: 'jane.smith@example.com', phone: '0987654321', city: 'Los Angeles' },
  { firstName: 'Alice', lastName: 'Johnson', age: 35, email: 'alice.johnson@example.com', phone: '1122334455', city: 'Chicago' },
  { firstName: 'John', lastName: 'Smith', age: 40, email: 'john.smith@example.com', phone: '2233445566', city: 'San Francisco' },
  { firstName: 'John', lastName: 'Doe', age: 50, email: 'john.doe2@example.com', phone: '3344556677', city: 'New York' },
  { firstName: 'Jane', lastName: 'Doe', age: 28, email: 'jane.doe@example.com', phone: '4455667788', city: 'Boston' },
];

describe('applyFilter', () => {
  it('should filter by contains operator', () => {
    const filter: Filter = [{ column: 'firstName', operator: 'contains', type: 'and', value: 'Jane' }];
    const result = applyFilter(mockData, filter);
    expect(result).toEqual([mockData[1], mockData[5]]);
  });

  it('should filter by notContains operator', () => {
    const filter: Filter = [{ column: 'firstName', operator: 'notContains', type: 'and', value: 'Jane' }];
    const result = applyFilter(mockData, filter);
    expect(result).toEqual([mockData[0], mockData[2], mockData[3], mockData[4]]);
  });

  it('should filter by equals operator', () => {
    const filter: Filter = [{ column: 'age', operator: 'equals', type: 'and', value: 30 }];
    const result = applyFilter(mockData, filter);
    expect(result).toEqual([mockData[0]]);
  });

  it('should filter by notEquals operator', () => {
    const filter: Filter = [{ column: 'age', operator: 'notEquals', type: 'and', value: 30 }];
    const result = applyFilter(mockData, filter);
    expect(result).toEqual([mockData[1], mockData[2], mockData[3], mockData[4], mockData[5]]);
  });

  it('should filter by empty operator', () => {
    const filter: Filter = [{ column: 'phone', operator: 'empty', type: 'and' }];
    const result = applyFilter(mockData, filter);
    expect(result).toEqual([]);
  });

  it('should filter by notEmpty operator', () => {
    const filter: Filter = [{ column: 'phone', operator: 'notEmpty', type: 'and' }];
    const result = applyFilter(mockData, filter);
    expect(result).toEqual(mockData);
  });

  it('should filter by multiple conditions with and operator', () => {
    const filter: Filter = [
      { column: 'firstName', operator: 'contains', type: 'and', value: 'John' },
      { column: 'city', operator: 'equals', type: 'and', value: 'New York' },
    ];
    const result = applyFilter(mockData, filter);
    expect(result).toEqual([mockData[0], mockData[4]]);
  });

  it('should filter by multiple conditions with or operator', () => {
    const filter: Filter = [
      { column: 'firstName', operator: 'contains', type: 'or', value: 'Jane' },
      { column: 'city', operator: 'equals', type: 'or', value: 'Chicago' },
    ];
    const result = applyFilter(mockData, filter);
    expect(result).toEqual([mockData[1], mockData[2], mockData[5]]);
  });

  it('should filter by tricky name', () => {
    const filter: Filter = [{ column: 'firstName', operator: 'contains', type: 'and', value: 'Jo' }];
    const result = applyFilter(mockData, filter);
    expect(result).toEqual([mockData[0], mockData[3], mockData[4]]);
  });

  it('should filter by people with the same name', () => {
    const filter: Filter = [{ column: 'firstName', operator: 'equals', type: 'and', value: 'John' }];
    const result = applyFilter(mockData, filter);
    expect(result).toEqual([mockData[0], mockData[3], mockData[4]]);
  });

  it('should filter by people with the same name and different last name', () => {
    const filter: Filter = [
      { column: 'firstName', operator: 'equals', type: 'and', value: 'John' },
      { column: 'lastName', operator: 'notEquals', type: 'and', value: 'Doe' },
    ];
    const result = applyFilter(mockData, filter);
    expect(result).toEqual([mockData[3]]);
  });
});