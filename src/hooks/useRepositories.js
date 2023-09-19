import { useEffect, useState } from 'react';

const useRepositories = () => {
  const [repositories, setRepositories] = useState();
  const [loading, setLoading] = useState(false);

  const fetchRespositories = async () => {
    setLoading(true);

    const response = await fetch('http://192.168.0.12:5000/api/repositories');
    const json = await response.json();

    setLoading(false);
    setRepositories(json);
  };

  useEffect(() => {
    fetchRespositories();
  }, []);

  return { repositories, loading, refetch: fetchRespositories };
};

export default useRepositories;
