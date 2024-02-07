import { connectToDatabase } from '../../../lib/db';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { productId, quantity, userId } = req.body;

    if (!productId || !quantity || !userId) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    const client = await connectToDatabase();
    const productsCollection = client.db.collection('products');
    const ordersCollection = client.db.collection('orders');
    const userCollection = client.db.collection('users');

    try {
      // Check if the product exists
      const product = await productsCollection.findOne({ _id: new ObjectId(productId) });
      if (!product) {
        res.status(404).json({ message: 'Product not found' });
        return;
