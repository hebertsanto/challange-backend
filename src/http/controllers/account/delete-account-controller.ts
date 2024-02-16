import { Request, Response } from 'express';
import {z } from 'zod';
import { MissingParamError, ParamDoesNotExist } from '../../../helpers/error';
import { makeAccountUseCase } from '../../../use-cases/factories/make-create-account';

/**
 *deleteAccountController
 * @param {Request } req request object express
 * @param {Response } res response object express
 * @returns { Promise<TTransaction | unknown>} promise to be solved
 */

export const deleteAccountController = async (
  req: Request,
  res: Response,
) => {
  const  makeAccount = await makeAccountUseCase();

  const paramsSchema = z.object({
    id: z.string()
  });

  try {
    const { id } = paramsSchema.parse(req.params);
    await makeAccount.deleteAccount(id);

    return res.status(200).json({
      msg: 'account deleted successfully'
    });

  } catch (error) {
    if (error instanceof ParamDoesNotExist) {
      return res.status(400).json({
        msg: 'id account does not exist'
      });
    }
    if (error instanceof MissingParamError) {
      return res.status(400).json({
        msg: 'id account is required',
        error,
      });
    }
  }
};