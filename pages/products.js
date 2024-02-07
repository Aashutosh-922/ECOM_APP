import { useEffect, useState } from 'react';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [editing, setEditing] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/products', {
        name,
        description,
        price,
        category,
        image,
      });

      setProducts([...products, response.data]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(`/api/products/${productToEdit._id}`, {
        name: productToEdit.name,
        description: productToEdit.description,
        price: productToEdit.price,
        category: productToEdit.category,
        image: productToEdit.image,
      });

      const updatedProducts = products.map((product) =>
        product._id === productToEdit._id ? response.data : product
      );

      setProducts(updatedProducts);
      setEditing(false);
      setProductToEdit(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Products</h1>
      {editing && (
        <form onSubmit={handleUpdate}>
          <label>
            Name:
            <input
              type="text"
              value={productToEdit.name}
              onChange={(e) =>
                setProductToEdit({ ...productToEdit, name: e.target.value })
              }
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              value={productToEdit.description}
              onChange={(e) =>
                setProductToEdit({
                  ...productToEdit,
                  description: e.target.value,
                })
              }
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              value={productToEdit.price}
              onChange={(e) =>
                setProductToEdit({ ...productToEdit, price: e.target.value })
              }
            />
          </
