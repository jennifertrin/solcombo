import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../util/mongodb";

type Data = {
  address: string | string[] | undefined;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const address = req.query.address;
  try {
    const { db } = await connectToDatabase();
    const userAccountCollection = db.collection('userAccount');
    await userAccountCollection.insertOne({
        address
    })
    return res.status(200).json({ address });
  } catch (e) {
    console.log(e);
    res.status(500);
  }
}
