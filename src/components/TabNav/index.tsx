import { FC, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { TabBar } from 'antd-mobile';

import { Nav } from '../../constant';

import './index.css';

export interface ITabNavProps {
  tabs: { key: string; title: string; icon: JSX.Element }[];
  onChange: (active: string) => void;
}

const TabNav: FC<ITabNavProps> = (props) => {
  const routerLocation = useLocation();
  const [activePath, setActivePath] = useState('');
  const [isHidden, setIsHidden] = useState(false);
  useEffect(() => {
    const path = routerLocation.pathname.split('/').filter(Boolean);
    path.includes(Nav.TIMER) ? setIsHidden(true) : setIsHidden(false);
    setActivePath(path[0]);
  }, [routerLocation]);

  const handlePathChange = (path: string) => {
    setActivePath(path);
    props.onChange(path);
  };

  return (
    <TabBar
      className={`tabnav-tabbar ${isHidden ? 'hidden' : ''}`}
      activeKey={activePath}
      onChange={handlePathChange}
    >
      {props.tabs.map((item) => (
        <TabBar.Item {...item} />
      ))}
    </TabBar>
  );
};

export default TabNav;
