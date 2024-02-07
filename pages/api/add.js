import { connectToDatabase } from '../../../lib/db';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { name, description, price, category, image } = req.body;

    if (!name || !description || !price || !category || !image) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    const client = await connectToDatabase();
    const productsCollection = client.db.collection('products');

    try {
      const result = await productsCollection.insertOne({
        name,
        description,
        price,
        category,
        image,
        createdAt: new Date(),
      });

      res.status(201).json({ message: 'Product added successfully', result });
    } catch (error) {
      res.status(500).json({ message: 'Error adding product', error });
    } finally {
      client.close();
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
