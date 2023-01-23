import type { NextApiResponse } from "next";
import { connectToDatabase } from "../../../util/mongodb";

export default async function handler(
  res: NextApiResponse<any>
) {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('collection-combinations');
    const allCollections = collection.find();
    return res.status(200).json({ allCollections });
  } catch (e: any) {
    return e;
  }
}
