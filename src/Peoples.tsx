import React from 'react';
import { notification } from 'antd';
import axios from 'axios';
import Table from './Table';

function Peoples() {
  const [peoples, setPeoples] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  const fetchPeoples = async () => {
    let result = [];
    try {
      const response = await axios.get('https://swapi.dev/api/people');
      result = response.data;
    } catch (e) {
      notification.error({
        message: 'Error',
        description: `${e}`,
      });
    }
    return result;
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
    },
    {
      title: 'Birth year',
      dataIndex: 'birth_year',
    },
  ];

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await fetchPeoples();
      if (result) {
        setPeoples(result.results);
        setTotal(result.count);
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      <Table loading={loading} columns={columns} data={peoples} />
    </div>
  );
}

export default Peoples;
