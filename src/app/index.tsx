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
import Timer from '../pages/Timer';
import TabNav, { ITabNavProps } from '../components/TabNav';
import { Nav } from '../constant';

import 'nprogress/nprogress.css';
import './index.css';

const App: FC = () => {
  const router = useHistory();
  const tabProps: ITabNavProps = {
    tabs: [
      {
        key: Nav.TODO,
        title: '待办',
        icon: <UnorderedListOutlined />
      },
      {
        key: Nav.ANALYZE,
        title: '数据统计',
        icon: <PieChartOutlined />
      },
      {
        key: Nav.PROFILE,
        title: '我的',
        icon: <UserOutlined />
      }
    ],
    onChange: (activePath: string) => {
      router.replace(`/${activePath}`);
    }
  };

  return (
    <div>
      <div id='container'>
        <Switch>
          <Route exact path={`/${Nav.TODO}`} component={Todos} />
          <Route exact path={`/${Nav.ANALYZE}`} component={Analyze} />
          <Route exact path={`/${Nav.PROFILE}`} component={Profile} />
          <Route exact path={`/${Nav.TIMER}/:uuid`} component={Timer} />
          <Redirect to={`/${Nav.TODO}`} />
        </Switch>
      </div>
      <TabNav {...tabProps} />
    </div>
  );
};

export default App;
