import React from 'react';
import axios from 'axios';
import {
  notification, TableColumnGroupType, TableColumnType, Table,
} from 'antd';
import { useLocation } from 'react-router-dom';

function GenericTableView() {
  const location = useLocation();

  const [data, setData] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);

  /**
   * Function to extract the current endpoint of the URL
   * @returns String of the current endpoint en SWAPI endpoint to request
   */
  const getCurrentEndpoint = () => location.pathname.split('/')[1];

  /**
   * Function that fetch data from SWAPI
   * @returns A set of data depending of the endpoint
   */
  const fetchData = async () => {
    let result = [];
    try {
      const response = await axios.get(`https://swapi.dev/api/${getCurrentEndpoint()}?page=${currentPage}`);
      result = response.data;
    } catch (e) {
      notification.error({
        message: 'Error',
        description: `${e}`,
      });
    }
    return result;
  };

  /**
   * Function to return the correct columns depending of the current URL
   * @returns AntD format of columns
   */
  const getCorrectColumns = (): (TableColumnGroupType<Object> | TableColumnType<Object>)[] => {
    const currentEndpoint: string = getCurrentEndpoint();

    switch (currentEndpoint) {
      case 'people':
        return [
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
      case 'planets':
        return [
          {
            title: 'Name',
            dataIndex: 'name',
          },
          {
            title: 'Diameter',
            dataIndex: 'diameter',
          },
          {
            title: 'Terrain',
            dataIndex: 'terrain',
          },
        ];
      case 'films':
        return [
          {
            title: 'Title',
            dataIndex: 'title',
          },
          {
            title: 'Director',
            dataIndex: 'director',
          },
          {
            title: 'Producer',
            dataIndex: 'producer',
          },
        ];
      case 'species':
        return [
          {
            title: 'Name',
            dataIndex: 'name',
          },
          {
            title: 'Classification',
            dataIndex: 'classification',
          },
          {
            title: 'Designation',
            dataIndex: 'designation',
          },
        ];
      case 'starships':
      case 'vehicles':
        return [
          {
            title: 'Name',
            dataIndex: 'name',
          },
          {
            title: 'Model',
            dataIndex: 'model',
          },
          {
            title: 'Manufacturer',
            dataIndex: 'manufacturer',
          },
        ];
      default:
        return [];
    }
  };

  /**
   * Function to handle AntD pagination change
   * @param e The AntD table event
   */
  const handleChange = (e: any) => {
    setCurrentPage(e.current);
  };

  /**
   * Update on change of the location and pagination
   */
  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await fetchData();
      if (result) {
        setData(result.results);
        setTotal(result.count);
        setLoading(false);
      }
    })();
  }, [location.pathname, currentPage]);

  return (
    <Table
      loading={loading}
      columns={getCorrectColumns()}
      dataSource={data}
      pagination={
        {
          defaultPageSize: 10,
          total,
          hideOnSinglePage: true,
          showSizeChanger: false,
        }
      }
      onChange={handleChange}
    />
  );
}

export default GenericTableView;
