import joi from "joi";

export const signupSchema = joi.object({
	username: joi.string().min(3).required(),
	image: joi.string().uri().required(),
	email: joi
		.string()
		.email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "br"] } })
		.required(),
	password: joi.string().min(6).required(),
});

export const loginSchema = joi.object({
	email: joi
		.string()
		.email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "br"] } })
		.required(),
	password: joi.string().min(6).required(),
});

export const descriptionUpdateSchema = joi.object({
	description: joi.string().min(1).required()
})
