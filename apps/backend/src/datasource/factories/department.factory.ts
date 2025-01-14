import { setSeederFactory } from "typeorm-extension";
import { Department } from "../../entities/department.entity";

export const DepartmentFactory = setSeederFactory(Department, (faker) => {
    const department = new Department();
    department.name = faker.commerce.department();
    return department;
});