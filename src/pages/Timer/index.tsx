import { FC, useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { Space } from 'antd-mobile';
import {
  PauseOutlined,
  CheckOutlined,
  CaretRightOutlined
} from '@ant-design/icons';

import ITodo from '../../models/Todo';
import { Nav } from '../../constant';
import { Response } from '../../models/Http';
import { getRequest, postRequest } from '../../utils/http';
import { getTodoByUUID, saveTodoByUUID } from '../../api/todos.api';
import { formatSecondTohhmmss } from '../../utils/formatDate';
import { randomImage } from '../../utils/random';
import isMobile from '../../utils/isMobile';

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
  const [bgImg, setBgImg] = useState('');
  const [fontColor, setFontColor] = useState('');

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
    // eslint-disable-next-line no-restricted-globals
    if (isMobile(navigator.userAgent) && screen.height >= 667) {
      const [bgImg, fontColor] = randomImage();
      setBgImg(bgImg);
      setFontColor(fontColor);
    }
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
    <div
      className={`timer-container ${isHidden ? 'hidden' : ''}`}
      style={{
        color: fontColor,
        backgroundImage: `url(${bgImg})`
      }}
    >
      <div className='timer-container-main'>
        <div className='text-xl md:text-2xl'>{todo.title}</div>
        <div className='main-time'>
          {padNumberStart(hour)}:{padNumberStart(minute)}:
          {padNumberStart(second)}
        </div>
      </div>
      <div className='timer-container-tool'>
        <Space size='10rem'>
          {isPause ? (
            <CaretRightOutlined
              className='tool-icon'
              onClick={handlePauseClick}
            />
          ) : (
            <PauseOutlined className='tool-icon' onClick={handlePauseClick} />
          )}

          <CheckOutlined className='tool-icon' onClick={handleFinishClick} />
        </Space>
      </div>
    </div>
  );
};

export default Timer;
