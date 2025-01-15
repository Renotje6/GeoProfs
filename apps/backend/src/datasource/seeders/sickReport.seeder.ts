import { faker } from "@faker-js/faker";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { Role } from "../../auth/enums/role.enum";
import { SickReport } from "../../entities/sickReport.entity";
import { User } from "../../entities/user.entity";

export default class SickReportSeeder implements Seeder {
    track?: boolean;
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const sickReportRepository = dataSource.getRepository(SickReport);
        const userRepository = dataSource.getRepository(User);

        const users = await userRepository.find({where: {role: Role.employee}});

        for (const user of users) {
            await sickReportRepository.save(sickReportRepository.create({
                user,
                startDate: faker.date.past(),
                endDate: new Date(),
            }));
        }

        // Grab 10 random users who are still sick
        const randomUsers = faker.helpers.arrayElements(users, 10);

        for (const user of randomUsers) {
            await sickReportRepository.save(sickReportRepository.create({
                user,
                startDate: faker.date.past(),
                endDate: null,
            }));
        }
    }

}