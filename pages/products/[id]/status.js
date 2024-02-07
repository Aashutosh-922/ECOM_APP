import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const ProductStatus = () => {
  const router = useRouter();
  const { id } = router.query;
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/products/status?productId=${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            setError('Product not found');
          } else {
            setError('Error getting product status');
          }
          return;
        }

        const data = await response.json();
        setStatus(data.status);
      } catch (error) {
        setError('Error getting product status');
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <div>
      {error && <p>{error}</p>}
      {status && <p>Status: {status}</p>}
    </div>
  );
};

export default ProductStatus;
