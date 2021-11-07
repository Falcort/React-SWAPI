import React from 'react';
import '../styles/App.css';
import { Layout, Menu } from 'antd';
import { Routes, Route, Link } from 'react-router-dom';
import GenericTableView from './GenericTableView';
import GenericObjectView from './GenericObjectView';

const { Header, Sider, Content } = Layout;

function App() {
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
            defaultSelectedKeys={['1']}
          >
            <Menu.Item key="1">
              <Link to="/people">
                People
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/planets">
                Planets
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/films">
                Films
              </Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/species">
                Species
              </Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to="/vehicles">
                Vehicles
              </Link>
            </Menu.Item>
            <Menu.Item key="6">
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
