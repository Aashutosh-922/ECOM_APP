import { connectToDatabase } from '../../../lib/db';

export default async (req, res) => {
  if (req.method === 'GET') {
    const { productId } = req.query;

    if (!productId) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    const client = await connectToDatabase();
    const productsCollection = client.db.collection('products');

    try {
      // Check if the product exists
      const product = await productsCollection.findOne({ _id: new ObjectId(productId) });
      if (!product) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }

      // Return the status of the product
      res.status(200).json({ message: 'Product found', status: product.status });
    } catch (error) {
      res.status(500).json({ message: 'Error getting product status', error });
    } finally {
      client.close();
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
