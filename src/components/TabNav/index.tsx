import { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TabBar } from 'antd-mobile';

import './index.css';

export interface ITabNavProps {
  tabs: { key: string; title: string; icon: JSX.Element }[];
  onChange: (active: string) => void;
}

const TabNav: FC<ITabNavProps> = (props) => {
  const router = useHistory();
  const [activePath, setActivePath] = useState(
    router.location.pathname.replace('/', '')
  );
  const handlePathChange = (path: string) => {
    setActivePath(path);
    props.onChange(path);
  };

  return (
    <TabBar
      className='tabnav-tabbar'
      activeKey={activePath}
      onChange={handlePathChange}
    >
      {props.tabs.map((item) => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  );
};

export default TabNav;
