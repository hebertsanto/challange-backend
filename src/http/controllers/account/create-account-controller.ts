import { Request, Response } from 'express';
import { ZodError, z } from 'zod';
import { makeAccountUseCase } from '../../../use-cases/factories/account';

export const createAccountController = async (
  req: Request,
  res: Response,
) => {
  const createAccountUseCase = await makeAccountUseCase();

  const bodySchema = z.object({
    email: z.string(),
    password: z.string().min(8, 'password must have at least 6 characters')
  });

  try {
    const { email, password } = bodySchema.parse(req.body);

    const account = await createAccountUseCase.create({ email, password });

    return res.status(200).json({
      msg: 'account created successfully',
      account,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.json({
        msg:'error validating data',
        error
      });
    }
  }
};
