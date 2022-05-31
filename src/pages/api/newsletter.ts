import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<String>
) {
  const { email } = req.body

  try {
    const response = await fetch(
      `${process.env.LAMBDA_REGISTER_EMAIL_URL}`,
      {
        "body": JSON.stringify({
          email
        }),
        headers: {
          'X-Api-Key': `${process.env.LAMBDA_API_KEY}`,
          'Content-Type': 'application/json',
        },
        method: 'POST'
      }
    );
    return res.status(response.status).json("E-mail cadastrado com sucesso!");
  } catch (error) {
    return res.status(500).json("Erro interno. Tente novamente mais tarde.");
  }
}
