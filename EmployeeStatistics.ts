import type { Employee } from "./Employee.js";

export class EmployeeStatistics {
    private readonly employees: Employee[];

    constructor(employees: Employee[]) {
        if (employees.length === 0) {
            throw new Error("A dolgozók megadása kötelező");
        }
        this.employees = employees;
    }

    getMaxSalary(): number {
        let max = 0;
        for (const employee of this.employees) {
            if (employee.salary > max) {
                max = employee.salary;
            }
        }
        return max;
    }

    getAverageAge(): number {
        let sum = 0;
        for (const employee of this.employees) {
            sum += employee.age;
        }
        return sum / this.employees.length;
    }

    getHighestPaidEmployee(): Employee {
        let highest = this.employees[0] ?? this.employees[0];
        for (const employee of this.employees) {
            if (employee.salary > (highest?.salary ?? 0)) {
                highest = employee;
            }
        }
        return highest!;
    }

    countEmployeesOverSalary(salary: number): number {
        let count = 0;
        for (const employee of this.employees) {
            if (employee.salary > salary) {
                count++;
            }
        }
        return count;
    }
}
