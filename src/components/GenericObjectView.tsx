import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  notification, PageHeader, Button, Skeleton,
} from 'antd';
import axios from 'axios';

function GenericObjectView() {
  const params = useParams();
  const navigate = useNavigate();

  const [data, setData] = React.useState<Record<string, any>>([]);
  const [loading, setLoading] = React.useState(false);
  const [rows, setRows] = React.useState<any>([]);

  /**
   * Function to handle the return to GenericTableView
   */
  const handleBack = () => {
    navigate(`/${params.endpoint}`);
  };

  /**
   * Fetch data from the API
   *
   * @returns The selected object from the SWAPI
   */
  const fetchData = async () => {
    let result = [];
    try {
      const response = await axios.get(`https://swapi.dev/api/${params.endpoint}/${params.id}`);
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
   * Create a table from the API JSON
   *
   * TODO: Types & eslint
   * @returns JSX of the API JSON into a HTML Table
   */
  const createTable = async () => {
    const result: any[] = [];
    try {
      const keys = Object.keys(data);
      for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
        if (key === 'url' || key === 'episode_id') {
          // eslint-disable-next-line no-continue
          continue;
        }
        if (Array.isArray(data[key])) {
          const currentColumn: any[] = [];
          for (let j = 0; j < data[key].length; j += 1) {
            const currentURL = data[key][j];
            // eslint-disable-next-line no-await-in-loop
            const currentURLResult = await axios.get(currentURL);
            currentColumn.push(
              <Link to={`/${currentURL.split('/').slice(-3).join('/')}`}>
                <Button>{currentURLResult.data.name || currentURLResult.data.title}</Button>
              </Link>,
            );
          }
          result.push(
            <tr key={key}>
              <th>{key}</th>
              <td>{currentColumn}</td>
            </tr>,
          );
        } else if (data[key].includes('https')) {
          // eslint-disable-next-line no-await-in-loop
          const currentLink = await axios.get(data[key]);
          result.push(
            <tr key={key}>
              <th>{key}</th>
              <td>
                <Link to={`/${data[key].split('/').slice(-3).join('/')}`}>
                  <Button>{currentLink.data.name || currentLink.data.title}</Button>
                </Link>
              </td>
            </tr>,
          );
        } else {
          result.push(
            <tr key={key}>
              <th>{key}</th>
              <td>{data[key]}</td>
            </tr>,
          );
        }
      }
    } catch (e) {
      notification.error({
        message: 'Error',
        description: `${e}`,
      });
    }
    return result;
  };

  /**
   * Update on change of the endpoint or ID
   */
  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await fetchData();
      if (result) {
        setData(result);
        setLoading(false);
      }
    })();
  }, [params.endpoint, params.id]);

  /**
   * Update the table after an update to the data
   */
  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await createTable();
      if (result) {
        setRows(result);
        setLoading(false);
      }
    })();
  }, [data]);

  return (
    <>
      { loading
      && <Skeleton />}
      { !loading
      && (
      <>
        <PageHeader
          onBack={handleBack}
          title={data.name || data.title}
          subTitle={params.endpoint}
        />
        <div>
          <table>
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>
      </>
      )}
    </>
  );
}
export default GenericObjectView;
