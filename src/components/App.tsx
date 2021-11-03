import React from 'react';
import '../styles/App.css';
import { Layout, Menu } from 'antd';
import { Routes, Route, Link } from 'react-router-dom';
import GenericTableView from './GenericTableView';

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
            <Route path="/people" element={<GenericTableView />} />
            <Route path="/planets" element={<GenericTableView />} />
            <Route path="/films" element={<GenericTableView />} />
            <Route path="/species" element={<GenericTableView />} />
            <Route path="/vehicles" element={<GenericTableView />} />
            <Route path="/starships" element={<GenericTableView />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
