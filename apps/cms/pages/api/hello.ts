// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { invokeLambda, LambdaFunctions, LambdaResponse } from '@amyflow/invoke-lambda'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LambdaResponse<typeof LambdaFunctions.helloWorld>>,
) {
  const { data } = await invokeLambda(LambdaFunctions.helloWorld, { name: 'Next.js' })
  res.status(200).json({ data })
}
