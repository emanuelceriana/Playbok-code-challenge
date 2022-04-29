import React from 'react';
import './App.css';
import Expenses from './Components/Expenses';
import { Layout } from 'antd';

const App: React.FC = () => {
  const { Header, Footer, Content } = Layout;

  return (
    <Layout className="App">
      <Header className="Header">
        <div>Let's code 👨‍💻</div>
      </Header>
      <Content className="Content-container">
        <Expenses />
      </Content>
      <Footer className="Footer">Code Challenge: Emanuel Ceriana</Footer>
    </Layout>
  );
};

export default App;
