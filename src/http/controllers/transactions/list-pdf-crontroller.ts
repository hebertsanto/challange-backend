import { Request, Response } from 'express';
import htmlpdf from 'html-pdf-node';
import { z } from 'zod';
import { makeTransactionUseCase } from '../../../use-cases/factories/transactions';
import { NotFoundResource } from '../../../helpers/error';

export const generatePdfTransaction = async (
  req: Request,
  res: Response,
)  => {
  const transtion = await makeTransactionUseCase();
  const paramsShcema = z.object({
    id: z.string().uuid(),
  });
  try {
    const { id } = paramsShcema.parse(req.params);
    const transationId = await transtion.findById(id);

    const options = { format: 'A4' };

    const template = {
      content: `
     <h1>your transitions</h1>
     <p>identificador da transação ${transationId?.id}</p>
     <p>valor da transação ${transationId?.ammout}</p>
     <p>identificador do cartão ${transationId?.card_id}</p>
    `,
    };
    res.contentType('application/pdf');

    const fileGenerated = await htmlpdf.generatePdf(template, options);

    return res.send(fileGenerated);
  } catch (error) {
    if (error instanceof NotFoundResource) {
      return res.status(400).json({
        msg: 'transaction not found on database',
        error,
      });
    }
  }
};
