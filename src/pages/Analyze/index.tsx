import { FC } from 'react';
import { Divider, Space } from 'antd-mobile';
import { PieChartOutlined } from '@ant-design/icons';

import Block from '../../components/Block';

import './index.css';

const Analyze: FC = () => {
  return (
    <div>
      <div className='mt-6'>
        <Divider className='text-base' style={{ color: '#333' }}>
          <Space>
            <PieChartOutlined />
            统计数据
          </Space>
        </Divider>
      </div>
      <div>
        <Block
          title='累计数据'
          leftLabel='总次数'
          centerLabel='总时长'
          rightLabel='总平均时长'
          count={3}
          totalTime={1202}
          avgTime={234}
        />
        <Block
          title='今日数据'
          leftLabel='次数'
          centerLabel='时长'
          rightLabel='平均时长'
          count={2}
          totalTime={0}
          avgTime={23234}
        />
      </div>
    </div>
  );
};

export default Analyze;
