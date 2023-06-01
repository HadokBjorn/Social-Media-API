import joi from "joi";

export const signupSchema = joi.object({
	username: joi.string().min(3).required(),
	image: joi.string().uri().required(),
	email: joi
		.string()
		.email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "br"] } })
		.required(),
	password: joi.string().min(6).required(),
	confirmPassword: joi.ref("password"),
});