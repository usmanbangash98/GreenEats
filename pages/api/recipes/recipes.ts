import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@/lib/mongodb'
import { Db } from 'mongodb'

type YourDatabaseType = Db;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }
  try {
    const db = await dbConnect() as unknown as Db;
    if (!db) {
      throw new Error("Database connection failed");
    }
    const recipesCollection = db.collection("recipes")
    const recipes = await recipesCollection.find({}).toArray()

    return res.status(200).json({ data: recipes })
  } catch (error) {
    console.error("Error fetching recipes:", error)
    return res.status(500).json({ message: "Error fetching recipes" })
  }
}