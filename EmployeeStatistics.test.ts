import { beforeEach, describe, expect, test } from "vitest";
import { EmployeeStatistics } from "./EmployeeStatistics.js";
import type { Employee } from "./Employee.js";

const fejlesztokCsapata: Employee[] = [
  { name: "Asztalos Dávid", age: 32, salary: 850000 },
  { name: "Benkő Miriam", age: 27, salary: 620000 },
  { name: "Csontos Árpád", age: 44, salary: 430000 },
  { name: "Dékány Veronika", age: 38, salary: 970000 },
  { name: "Erdős Barnabás", age: 23, salary: 390000 },
];

const raktarosCsapat: Employee[] = [
  { name: "Fülöp Henrietta", age: 41, salary: 310000 },
  { name: "Gál Kristóf", age: 29, salary: 460000 },
  { name: "Hajdu Szilvia", age: 35, salary: 540000 },
  { name: "Illés Bendegúz", age: 50, salary: 720000 },
  { name: "Juhász Orsolya", age: 26, salary: 380000 },
];

let fejlesztok: EmployeeStatistics;
let raktarosok: EmployeeStatistics;

beforeEach(() => {
  fejlesztok = new EmployeeStatistics(fejlesztokCsapata);
  raktarosok = new EmployeeStatistics(raktarosCsapat);
});

// Konstruktor

describe("Konstruktor", () => {
  test("Sikeres létrehozás több dolgozóval", () => {
    expect(() => new EmployeeStatistics(fejlesztokCsapata)).not.toThrow();
  });

  test("Sikeres létrehozás egyetlen dolgozóval", () => {
    expect(
      () => new EmployeeStatistics([{ name: "Teszt Elek", age: 25, salary: 400000 }])
    ).not.toThrow();
  });

  test("Kivétel üres lista esetén", () => {
    expect(() => new EmployeeStatistics([])).toThrow(
      "A dolgozók megadása kötelező"
    );
  });
});

// getMaxSalary()

describe("getMaxSalary()", () => {
  test("Fejlesztők csapatában a legmagasabb fizetés 970000", () => {
    expect(fejlesztok.getMaxSalary()).toBe(970000);
  });

  test("Raktáros csapatban a legmagasabb fizetés 720000", () => {
    expect(raktarosok.getMaxSalary()).toBe(720000);
  });

  test("Egy dolgozós csapatnál a maximum az ő fizetése", () => {
    const egyDolgozo = new EmployeeStatistics([
      { name: "Kovács Béla", age: 33, salary: 555000 },
    ]);
    expect(egyDolgozo.getMaxSalary()).toBe(555000);
  });
});

// getAverageAge()

describe("getAverageAge()", () => {
  test("Fejlesztők átlagéletkora: (32+27+44+38+23)/5 = 32.8", () => {
    expect(fejlesztok.getAverageAge()).toBeCloseTo(32.8);
  });

  test("Raktárosok átlagéletkora: (41+29+35+50+26)/5 = 36.2", () => {
    expect(raktarosok.getAverageAge()).toBeCloseTo(36.2);
  });

  test("Egy dolgozós csapatnál az átlag egyenlő a dolgozó korával", () => {
    const egyDolgozo = new EmployeeStatistics([
      { name: "Kovács Béla", age: 33, salary: 555000 },
    ]);
    expect(egyDolgozo.getAverageAge()).toBe(33);
  });
});

// getHighestPaidEmployee() 

describe("getHighestPaidEmployee()", () => {
  test("Fejlesztők legjobban fizetett dolgozója Dékány Veronika", () => {
    expect(fejlesztok.getHighestPaidEmployee()).toEqual({
      name: "Dékány Veronika",
      age: 38,
      salary: 970000,
    });
  });

  test("Raktárosok legjobban fizetett dolgozója Illés Bendegúz", () => {
    expect(raktarosok.getHighestPaidEmployee()).toEqual({
      name: "Illés Bendegúz",
      age: 50,
      salary: 720000,
    });
  });

  test("Egy dolgozós csapatnál ő maga a legjobban fizetett", () => {
    const egyDolgozo = { name: "Kovács Béla", age: 33, salary: 555000 };
    const stats = new EmployeeStatistics([egyDolgozo]);
    expect(stats.getHighestPaidEmployee()).toEqual(egyDolgozo);
  });
});

// countEmployeesOverSalary() 

describe("countEmployeesOverSalary()", () => {
  test("Fejlesztők közül 400000 felett keres: 3 fő", () => {
    expect(fejlesztok.countEmployeesOverSalary(400000)).toBe(3);
  });

  test("Fejlesztők közül 800000 felett keres: 2 fő", () => {
    expect(fejlesztok.countEmployeesOverSalary(800000)).toBe(2);
  });

  test("Fejlesztők közül 1000000 felett keres: 0 fő", () => {
    expect(fejlesztok.countEmployeesOverSalary(1000000)).toBe(0);
  });

  test("Raktárosok közül 350000 felett keres: 4 fő", () => {
    expect(raktarosok.countEmployeesOverSalary(350000)).toBe(4);
  });

  test("Raktárosok közül 500000 felett keres: 2 fő", () => {
    expect(raktarosok.countEmployeesOverSalary(500000)).toBe(2);
  });

  test("Raktárosok közül 700000 felett keres: 1 fő", () => {
    expect(raktarosok.countEmployeesOverSalary(700000)).toBe(1);
  });
});
