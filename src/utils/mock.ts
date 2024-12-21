import { type BaseData, type BaseTableData, type BaseTableViewData } from "@/store/reducers/baseSlice";
import { faker } from '@faker-js/faker';
import { ColumnSort, SortingState } from "@tanstack/react-table";

export type Person = {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  phone: string;
  city: string;
};

function generatePerson(): Person {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int({ min: 18, max: 65 }),
    email: faker.internet.email(),
    phone: faker.phone.imei(),
    city: faker.location.city(),
  };
}

// use fakerjs to generate table
const table_1 = Array.from({ length: 10000 }, generatePerson);
const table_2 = Array.from({ length: 10000 }, generatePerson);
const table_3 = Array.from({ length: 10000 }, generatePerson);


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

export type PersonApiResponse = {
  data: Person[]
  meta: {
    totalRowCount: number
  }
}

export async function fetchBases() {
  return new Promise<BaseData[]>((resolve) => {
    setTimeout(() => {
      resolve(bases);
    }, Math.floor(Math.random() * 100) + 50);
  });
}

export async function fetchTableMetadata(ids: string[]) {
  return new Promise<BaseTableData[]>((resolve) => {
    setTimeout(() => {
      resolve(tables.filter((table) => ids.includes(table.id)));
    }, 2000);
  });
}

export async function fetchTableData(id: string, offset: number, limit: number, sorting: SortingState) {
  return new Promise<PersonApiResponse>((resolve) => {
    setTimeout(() => {
      const data = id === "1" ? table_1 : id === "2" ? table_2 : table_3;
      const dbData = [...data]

      if (sorting.length) {
        const sort = sorting[0]!
        const { id, desc } = sort as { id: keyof Person; desc: boolean }
        dbData.sort((a, b) => {
          if (desc) {
            return a[id] < b[id] ? 1 : -1
          }
          return a[id] > b[id] ? 1 : -1
        })
      }
      resolve({
        data: dbData.slice(offset, offset + limit),
        meta: {
          totalRowCount: dbData.length,
        },
      });
    }, 2000);
  });
}

export async function fetchViews(id: string) {
  return new Promise<BaseTableViewData>((resolve) => {
    setTimeout(() => {
      resolve(views.find((view) => view.id === id)!);
    }, Math.floor(Math.random() * 100) + 50);
  });
}