import { FC, useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { Space } from 'antd-mobile';
import {
  PauseOutlined,
  CheckOutlined,
  PlayCircleOutlined
} from '@ant-design/icons';

import ITodo from '../../models/Todo';
import { Nav } from '../../constant';
import { Response } from '../../models/Http';
import { getRequest, postRequest } from '../../utils/http';
import { getTodoByUUID, saveTodoByUUID } from '../../api/todos.api';
import { formatSecondTohhmmss } from '../../utils/formatDate';

import './index.css';

const Timer: FC = () => {
  const router = useHistory();
  const { uuid }: { uuid: string } = useParams();
  const [isHidden, setIsHidden] = useState(true);
  const [isPause, setIsPause] = useState(false);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [todo, setTodo] = useState<ITodo>({} as ITodo);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isPause) return;
      setSecond((second) => {
        if (second === 59) {
          setMinute((minute) => {
            if (minute === 59) {
              setHour(hour + 1);
              return 0;
            }
            return minute + 1;
          });
          return 0;
        }
        return second + 1;
      });
    }, 1000);
    return () => {
      clearInterval(timer as NodeJS.Timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPause]);
  useEffect(() => {
    const fetchTodoData = async () => {
      const {
        data: { data }
      }: Response<ITodo> = await getRequest(getTodoByUUID, {
        uuid
      });
      setTodo(data);
      const [hour, minute, second] = formatSecondTohhmmss(data.todayTime);
      setHour(hour);
      setMinute(minute);
      setSecond(second);
      setIsHidden(false);
    };
    fetchTodoData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const padNumberStart = (n: number) => {
    return n.toString().padStart(2, '0');
  };
  const handlePauseClick = async () => {
    setIsPause(!isPause);
    if (!isPause) {
      const todayTime = hour * 3600 + minute * 60 + second;
      await postRequest(saveTodoByUUID, {
        uuid,
        options: { todayTime }
      });
    }
  };
  const handleFinishClick = () => {
    const todayTime = hour * 3600 + minute * 60 + second;
    postRequest(saveTodoByUUID, {
      uuid,
      options: { todayTime }
    });
    router.replace(`/${Nav.TODO}`);
  };

  return (
    <div className={`timer-container ${isHidden ? 'hidden' : ''}`}>
      <div className='timer-container-main'>
        <div className='text-base'>{todo.title}</div>
        <div className='text-3xl font-medium'>
          {padNumberStart(hour)}:{padNumberStart(minute)}:
          {padNumberStart(second)}
        </div>
      </div>
      <div className='timer-container-tool'>
        <Space size='10rem'>
          {isPause ? (
            <PlayCircleOutlined
              className='outline-none'
              onClick={handlePauseClick}
            />
          ) : (
            <PauseOutlined
              className='outline-none'
              onClick={handlePauseClick}
            />
          )}

          <CheckOutlined className='outline-none' onClick={handleFinishClick} />
        </Space>
      </div>
    </div>
  );
};

export default Timer;
