import { FC } from 'react';
import { Redirect, Route } from 'react-router';
import { Switch, useHistory } from 'react-router-dom';
import {
  UnorderedListOutlined,
  PieChartOutlined,
  UserOutlined
} from '@ant-design/icons';

import Analyze from '../pages/Analyze';
import Todos from '../pages/Todos';
import Profile from '../pages/Profile';
import TabNav, { ITabNavProps } from '../components/TabNav';

import { NAV } from '../constant';
import './index.css';

const App: FC = () => {
  const router = useHistory();
  const tabProps: ITabNavProps = {
    tabs: [
      {
        key: NAV.TODO,
        title: '待办',
        icon: <UnorderedListOutlined />
      },
      {
        key: NAV.ANALYZE,
        title: '数据统计',
        icon: <PieChartOutlined />
      },
      {
        key: NAV.PROFILE,
        title: '我的',
        icon: <UserOutlined />
      }
    ],
    onChange: (activePath) => {
      router.replace(`/${activePath}`);
    }
  };

  return (
    <div>
      <div className='mb-14'>
        <Switch>
          <Route exact path='/todos' component={Todos} />
          <Route exact path='/analyze' component={Analyze} />
          <Route exact path='/profile' component={Profile} />
          <Redirect to='/todos' />
        </Switch>
      </div>
      <TabNav {...tabProps} />
    </div>
  );
};

export default App;
