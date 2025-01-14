// main.seeder.ts
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { Department } from "../../entities/department.entity";

export default class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const departmentFactory = factoryManager.get(Department);
    const departmentRepository = dataSource.getRepository(Department);

    await departmentRepository.insert({
        name: "IT",
    })

    const departments = await departmentFactory.saveMany(10);
  }
}