import { Injectable } from "@nestjs/common";


@Injectable()
export class UsersService {
	private readonly users = [
		{
			userId: 1,
			username: "1",
			password: "1",
		},
		{
			userId: 2,
			username: "2",
			password: "2",
		},
	];

	async findUserByName(username: string): Promise<any | undefined> {
		return this.users.find((user) => user.username === username);
	}
}
