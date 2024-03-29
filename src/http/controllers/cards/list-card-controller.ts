import { Request, Response } from 'express';
import { makeCardUseCase } from '../../../use-cases/factories/card';
import { z } from 'zod';
import { MissingParamError, NotFoundResource} from '../../../helpers/error';

export const listCardByIdController = async (
  req: Request,
  res: Response,
) => {
  const listCardByIdUseCase = await makeCardUseCase();

  const paramsSchema = z.object({
    id: z.string().uuid(),
  });
  try {
    const { id } = paramsSchema.parse(req.params);
    const card = await listCardByIdUseCase.listCard(id);

    return res.status(200).json({
      msg: 'card found successfully',
      card,
    });
  } catch (error) {
    if (error instanceof MissingParamError) {
      return res.json(400).json({
        msg: 'id card is required',
      });
    }
    if (error instanceof NotFoundResource) {
      return res.json(400).json({
        msg: 'id account does not exist',
      });
    }
  }
};
