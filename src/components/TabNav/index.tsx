import { FC } from 'react';
import { TabBar } from 'antd-mobile';

export interface ITabNavProps {
  tabs: { key: string; title: string; icon: JSX.Element }[];
  onChange: (active: string) => void;
}

const TabNav: FC<ITabNavProps> = (props) => {
  return (
    <TabBar
      className='fixed bottom-0 left-0 right-0 bg-white h-14'
      onChange={props.onChange}
    >
      {props.tabs.map((item) => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  );
};

export default TabNav;
