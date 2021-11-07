import React from 'react';
import axios from 'axios';
import {
  notification, TableColumnGroupType, TableColumnType, Table, Row, Input, Col, PageHeader, Skeleton,
} from 'antd';
import { useParams, useNavigate } from 'react-router-dom';

function GenericTableView() {
  const params = useParams();
  const navigate = useNavigate();

  const [data, setData] = React.useState<Record<string, any>[]>([]);
  const [total, setTotal] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [search, setSearch] = React.useState('');

  /**
   * Function that fetch data from SWAPI
   * @returns A set of data depending of the endpoint
   */
  const fetchData = async () => {
    let result = [];
    try {
      const response = await axios.get(`https://swapi.dev/api/${params.endpoint}?page=${currentPage}&search=${search}`);
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
    const currentEndpoint = params.endpoint;

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
  const handleTableChange = (e: any) => {
    setCurrentPage(e.current);
  };

  /**
   * Function to set search variable
   * @param e Event of the search bar
   */
  const handleSearch = (e: any) => {
    setSearch(e);
  };

  const handleRow = (record: any) => ({
    onClick: () => {
      const id = record.url.split('/').slice(-2)[0];
      navigate(`/${params.endpoint}/${id}`);
    },
  });

  /**
   * Update on change of the location, pagination and search
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
  }, [currentPage, search]);

  /**
   * Update on change of the location, pagination and search
   */
  React.useEffect(() => {
    (async () => {
      setLoading(true);
      setCurrentPage(1);
      setSearch('');
      const result = await fetchData();
      if (result) {
        setData(result.results);
        setTotal(result.count);
        setLoading(false);
      }
    })();
  }, [params.endpoint]);

  return (
    <>
      {loading
        && <Skeleton />}
      {!loading
        && (
        <>
          <PageHeader title={params.endpoint} />
          <Row>
            <Col span={24}>
              <Input.Search placeholder="Search" onSearch={handleSearch} enterButton="Search" />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Table
                loading={loading}
                columns={getCorrectColumns()}
                dataSource={data}
                rowKey={data[0] && data[0].name ? 'name' : 'title'}
                pagination={
              {
                current: currentPage,
                defaultPageSize: 10,
                total,
                hideOnSinglePage: true,
                showSizeChanger: false,
              }
            }
                onChange={handleTableChange}
                onRow={handleRow}
              />
            </Col>
          </Row>
        </>
        )}
    </>
  );
}

export default GenericTableView;
