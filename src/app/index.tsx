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

import { Nav } from '../constant';
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
    onChange: (activePath) => {
      router.replace(`/${activePath}`);
    }
  };

  return (
    <div>
      <div className='mb-14 md:mb-16'>
        <Switch>
          <Route exact path={`/${Nav.TODO}`} component={Todos} />
          <Route exact path={`/${Nav.ANALYZE}`} component={Analyze} />
          <Route exact path={`/${Nav.PROFILE}`} component={Profile} />
          <Redirect to={`/${Nav.TODO}`} />
        </Switch>
      </div>
      <TabNav {...tabProps} />
    </div>
  );
};

export default App;
