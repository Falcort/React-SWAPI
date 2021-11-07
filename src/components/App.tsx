import React from 'react';
import '../styles/App.css';
import { Layout, Menu } from 'antd';
import {
  Routes, Route, Link, useParams,
} from 'react-router-dom';
import GenericTableView from './GenericTableView';
import GenericObjectView from './GenericObjectView';

const { Header, Sider, Content } = Layout;

function App() {
  const [currentEndpoint, setCurrentEndpoint] = React.useState<string[]>([]);

  React.useEffect(() => {
    (async () => {
      setCurrentEndpoint([window.location.pathname.split('/')[1] || '']);
    })();
  }, []);

  const handleClick = (e: any) => {
    setCurrentEndpoint([e.key]);
  };

  return (
    <Layout>
      <Header
        style={{
          color: 'white',
          fontSize: '2em',
        }}
      >
        Starwars universe explorer
      </Header>
      <Layout>
        <Sider
          style={{
            backgroundColor: 'white',
          }}
        >
          <Menu
            mode="inline"
            selectedKeys={currentEndpoint}
            onClick={handleClick}
          >
            <Menu.Item key="people">
              <Link to="/people">
                People
              </Link>
            </Menu.Item>
            <Menu.Item key="planets">
              <Link to="/planets">
                Planets
              </Link>
            </Menu.Item>
            <Menu.Item key="films">
              <Link to="/films">
                Films
              </Link>
            </Menu.Item>
            <Menu.Item key="species">
              <Link to="/species">
                Species
              </Link>
            </Menu.Item>
            <Menu.Item key="vehicles">
              <Link to="/vehicles">
                Vehicles
              </Link>
            </Menu.Item>
            <Menu.Item key="starships">
              <Link to="/starships">
                Starships
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Content>
          <Routes>
            <Route
              path="/"
              element={(
                <div>
                  <h1>Welcome to Star Wars universe explorer</h1>
                </div>
              )}
            />
            <Route path="/:endpoint" element={<GenericTableView />} />
            <Route path="/:endpoint/:id" element={<GenericObjectView />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
