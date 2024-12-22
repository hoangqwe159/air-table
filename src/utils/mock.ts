import { type BaseData, type BaseTableData, type BaseTableViewData } from "@/store/reducers/baseSlice";
import { faker } from '@faker-js/faker';
import { type SortingState } from "@tanstack/react-table";

export type Person = {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  phone: string;
  city: string;
};

export type PersonApiResponse = {
  data: Person[]
  meta: {
    totalRowCount: number
  }
}

export type AddApiResponse = {
  message: "success" | "error"
  meta: {
    totalRowCount: number
  }
}

export function generatePerson(): Person {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int({ min: 18, max: 65 }),
    email: faker.internet.email(),
    phone: faker.phone.imei(),
    city: faker.location.city(),
  };
}

const TIMEOUT = 600;

// use fakerjs to generate table
const table_1 = Array.from({ length: 100 }, generatePerson);
const table_2 = Array.from({ length: 100 }, generatePerson);
const table_3 = Array.from({ length: 100 }, generatePerson);


const bases = [
  {
    id: "1",
    name: "Base 1",
    tables: ["1", "2"],
  },
  {
    id: "2",
    name: "Base 2",
    tables: ["3"],
  },
] satisfies BaseData[];

const tables = [
  {
    id: "1",
    name: "Table 1",
    views: ["1", "2"],
  },
  {
    id: "2",
    name: "Table 2",
    views: ["3"],
  },
  {
    id: "3",
    name: "Table 3",
    views: [],
  },
] satisfies BaseTableData[];

const views = [
  {
    id: "1",
    name: "View 1",
    state: {},
  },
  {
    id: "2",
    name: "View 2",
    state: {},
  },
  {
    id: "3",
    name: "View 3",
    state: {},
  },
] satisfies BaseTableViewData[];

export async function fetchBases() {
  return new Promise<BaseData[]>((resolve) => {
    setTimeout(() => {
      resolve(bases);
    }, TIMEOUT);
  });
}

export async function fetchTableMetadata(ids: string[]) {
  return new Promise<BaseTableData[]>((resolve) => {
    setTimeout(() => {
      resolve(tables.filter((table) => ids.includes(table.id)));
    }, TIMEOUT);
  });
}

export type FilterCondition = {
  column: string;
  operator: 'contains' | 'notContains' | 'equals' | 'notEquals' | 'empty' | 'notEmpty';
  type: 'and' | 'or';
  value?: string | number;
};

export type Filter = FilterCondition[];

export function applyFilter(data: Person[], filter: Filter): Person[] {
  if (!filter || filter.length === 0) return data;

  const applyCondition = (person: Person, condition: FilterCondition): boolean => {
    const { column, operator, value } = condition;
    const columnValue = person[column as keyof Person];

    switch (operator) {
      case 'contains':
        return typeof columnValue === 'string' && columnValue.includes(value as string);
      case 'notContains':
        return typeof columnValue === 'string' && !columnValue.includes(value as string);
      case 'equals':
        return columnValue === value;
      case 'notEquals':
        return columnValue !== value;
      case 'empty':
        return columnValue === null || columnValue === undefined || columnValue === '';
      case 'notEmpty':
        return columnValue !== null && columnValue !== undefined && columnValue !== '';
      default:
        return true;
    }
  };

  const applyConditions = (person: Person, conditions: FilterCondition[]): boolean => {
    const andConditions = conditions.filter(condition => condition.type === 'and');
    const orConditions = conditions.filter(condition => condition.type === 'or');

    const andResult = andConditions.every(condition => applyCondition(person, condition));
    const orResult = orConditions.length === 0 || orConditions.some(condition => applyCondition(person, condition));

    return andResult && orResult;
  };

  return data.filter(person => applyConditions(person, filter));
}

export async function fetchTableData(id: string, offset: number, limit: number, sorting?: SortingState, filter?: Filter) {
  console.log('fetchTableData', id, offset, limit, sorting, filter);
  return new Promise<PersonApiResponse>((resolve) => {
    setTimeout(() => {
      const data = id === "1" ? table_1 : id === "2" ? table_2 : table_3;
      let dbData = [...data];

      // Apply filters
      if (filter) {
        dbData = applyFilter(dbData, filter);
      }

      // Apply sorting
      if (sorting?.length) {
        const sort = sorting[0]!;
        const { id, desc } = sort as { id: keyof Person; desc: boolean };
        dbData.sort((a, b) => {
          if (desc) {
            return a[id] < b[id] ? 1 : -1;
          }
          return a[id] > b[id] ? 1 : -1;
        });
      }

      resolve({
        data: dbData.slice(offset, offset + limit),
        meta: {
          totalRowCount: dbData.length,
        },
      });
    }, TIMEOUT);
  });
}

export async function fetchViews(id: string) {
  return new Promise<BaseTableViewData>((resolve) => {
    setTimeout(() => {
      resolve(views.find((view) => view.id === id)!);
    }, TIMEOUT);
  });
}

export async function addTableData (id: string, data: Person[]) {
  return new Promise<AddApiResponse>((resolve, reject) => {
    setTimeout(() => {
      if (!id) {
        reject(new Error("Invalid table id"));
        return;
      }

      const currentTable = id === "1" ? table_1 : id === "2" ? table_2 : table_3;
      currentTable.push(...data);

      resolve({
        message: "success",
        meta: {
          totalRowCount: currentTable.length,
        },
      });
    }, TIMEOUT);
  });
}

export async function addTableDataButCanFail (id: string, data: Person[]) {
  return new Promise<AddApiResponse>((resolve, reject) => {
    setTimeout(() => {
      // Radom error
      if (Math.random() < 0.5) {
        reject(new Error("Random error"));
        return;
      }

      if (!id) {
        reject(new Error("Invalid table id"));
        return;
      }

      const currentTable = id === "1" ? table_1 : id === "2" ? table_2 : table_3;
      currentTable.push(...data);

      resolve({
        message: "success",
        meta: {
          totalRowCount: currentTable.length,
        },
      });
    }, TIMEOUT);
  });
}