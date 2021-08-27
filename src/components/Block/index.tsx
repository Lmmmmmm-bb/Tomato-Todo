import { FC } from 'react';
import { Card } from 'antd-mobile';

import './index.css';

const Block: FC = () => {
  return (
    <Card className='px-3 py-1 mx-4 my-3 bg-gray-300 shadow-md'>
      <div className='flex flex-col'>
        <div className='text-xs mb-4'>累计数据</div>
        <div className='flex text-center'>
          <div className='flex flex-1 flex-col'>
            <div className='text-xs'>次数</div>
            <span className='text-base font-medium'>1</span>
          </div>
          <div className='flex flex-1 flex-col'>
            <div className='text-xs'>时长</div>
            <span className='text-base font-medium'>
              1 <span className='text-xs font-normal'>小时</span> 20{' '}
              <span className='text-xs font-normal'>分钟</span>
            </span>
          </div>
          <div className='flex flex-1 flex-col'>
            <div className='text-xs'>次均时长</div>
            <span className='text-base font-medium'>
              1 <span className='text-xs font-normal'>小时</span> 20{' '}
              <span className='text-xs font-normal'>分钟</span>
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Block;
