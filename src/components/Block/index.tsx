import { FC } from 'react';
import { Card } from 'antd-mobile';

import { formatSecondToHourWithMiute } from '../../utils/formatDate';

import './index.css';

export interface IBlockProps {
  title: string;
  leftLabel: string;
  centerLabel: string;
  rightLabel: string;
  count: number;
  totalTime: number;
  avgTime: number;
}

const Block: FC<IBlockProps> = (props) => {
  const [avgTimeHour, avgTimeMiute] = formatSecondToHourWithMiute(
    props.avgTime
  );
  const [totalTimeHour, totalTimeMiute] = formatSecondToHourWithMiute(
    props.totalTime
  );

  return (
    <Card className='block-card'>
      <div className='flex flex-col'>
        <div className='text-xs mb-1 md:text-lg'>{props.title}</div>
        <div className='flex text-center'>
          <div className='card-container'>
            <div className='block-card-label'>{props.leftLabel}</div>
            <span className='text-base font-medium md:text-3xl'>
              {props.count}
            </span>
          </div>
          <div className='card-container'>
            <div className='block-card-label'>{props.centerLabel}</div>
            <span className='block-card-number'>
              {totalTimeHour !== 0 && (
                <span>
                  {totalTimeHour} <span className='block-card-font'>小时</span>{' '}
                </span>
              )}
              {totalTimeMiute}
              <span className='block-card-font'> 分钟</span>
            </span>
          </div>
          <div className='card-container'>
            <div className='block-card-label'>{props.rightLabel}</div>
            <span className='block-card-number'>
              {avgTimeHour !== 0 && (
                <span>
                  {avgTimeHour} <span className='block-card-font'>小时</span>{' '}
                </span>
              )}
              {avgTimeMiute}
              <span className='block-card-font'> 分钟</span>
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Block;
