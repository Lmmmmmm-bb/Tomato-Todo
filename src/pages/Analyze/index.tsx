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
        <Block />
        <Block />
      </div>
    </div>
  );
};

export default Analyze;
