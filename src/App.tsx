import React from 'react';
import './App.css';
import { Layout, Menu } from 'antd';
import Peoples from './Peoples';

const { Header, Sider, Content } = Layout;

function App() {
  const [menuSelected, setMenuSelected] = React.useState('1');

  const handleMenuClick = (e: { key: string }) => {
    setMenuSelected(e.key);
  };

  const getComponent = (key: string) => {
    if (key === '1') {
      return <Peoples />;
    }
    return <div>Bug</div>;
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
            defaultSelectedKeys={['1']}
            onClick={handleMenuClick}
          >
            <Menu.Item key="1">Peoples</Menu.Item>
            <Menu.Item key="2">Planets</Menu.Item>
            <Menu.Item key="3">Starships</Menu.Item>
            <Menu.Item key="4">Films</Menu.Item>
            <Menu.Item key="5">Species</Menu.Item>
            <Menu.Item key="6">Vehicles</Menu.Item>
          </Menu>
        </Sider>
        <Content>
          {getComponent(menuSelected)}
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
