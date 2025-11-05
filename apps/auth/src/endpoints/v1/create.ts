import { Bool, OpenAPIRoute } from "chanfana";
import { z } from "zod";
// @ts-ignore
import { type AppContext, Task } from "../../types";

export class AccountCreate extends OpenAPIRoute {
	schema = {
		tags: ["Accounts"],
		summary: "Create a new Account",
		request: {
			body: {
				content: {
					"application/json": {
						schema: Task,
					},
				},
			},
		},
		responses: {
			"200": {
				description: "Returns the created account JWT",
				content: {
					"application/json": {
						schema: z.object({
                            series: z.object({
								success: Bool(),
								result: z.object({
									account: z.object({
										id: z.string().uuid(),
										email: z.string().email(),
										name: z.string().min(2).max(100),
										created_at: z.string().datetime(),
										updated_at: z.string().datetime(),
									}),
								}),
							}),
						}),
					},
				},
			},
		},
	};

	async handle(c: AppContext) {
		const data = await this.getValidatedData<typeof this.schema>();

		return {
			success: true,
			account: {
                id: data.body.id,
                email: data.body.email,
                name: data.body.name,
                created_at: data.body.created_at,
                updated_at: data.body.updated_at,
			},
		};
	}
}
