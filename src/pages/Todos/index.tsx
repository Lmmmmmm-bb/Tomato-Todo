import { FC, useState, useCallback, useEffect, ChangeEvent } from 'react';
import {
  Divider,
  Button,
  Space,
  Card,
  Grid,
  Mask,
  Toast,
  Popover
} from 'antd-mobile';
import { useHistory } from 'react-router';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import UUID from 'react-uuid';

import { Nav } from '../../constant';
import ITodo from '../../models/Todo';
import { Response } from '../../models/Http';
import randomColor from '../../utils/randomColor';
import { getRequest, putRequest, deleteRequest } from '../../utils/http';
import { getAllTodos, createTodo, deleteTodoByUUID } from '../../api/todos.api';
import { formatSecondToMinute } from '../../utils/formatDate';

import './index.css';

type CreateTodo = Pick<ITodo, 'uuid' | 'title' | 'themeClass'>;

const Todos: FC = () => {
  const router = useHistory();
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [value, setValue] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  // Fetch Todo list data from database.
  useEffect(() => {
    fetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchList = useCallback(async () => {
    const { data: list }: Response<ITodo[]> = await getRequest(getAllTodos);
    setTodos(list.data);
  }, []);
  const handleAddTodoClick = async () => {
    const target = value.trim();
    const index = todos.findIndex((todo) => todo.title === target);
    if (target.length === 0) {
      Toast.show({
        icon: 'fail',
        content: '请输入事项名称'
      });
    } else if (index !== -1) {
      Toast.show({
        icon: 'fail',
        content: '该事项已存在'
      });
    } else {
      const newTodo: CreateTodo = {
        uuid: UUID(),
        title: target,
        themeClass: randomColor()
      };
      await putRequest(createTodo, { todo: newTodo });
      fetchList();
      setIsVisible(false);
      setValue('');
    }
  };
  const handleTodoRoutePath = (todo: ITodo) => {
    router.replace(`${Nav.TIMER}/${todo.uuid}`);
  };
  const handleMaskClosed = useCallback(() => setValue(''), []);
  const toggleVisible = () => setIsVisible(!isVisible);
  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
    []
  );
  const handleDeleteClick = async (uuid: string) => {
    await deleteRequest(deleteTodoByUUID, { uuid });
    fetchList();
  };

  return (
    <div>
      <div className='mt-5'>
        <Divider contentPosition='right'>
          <Button className='todo-add-btn' size='mini' onClick={toggleVisible}>
            <Space>
              <PlusOutlined />
              添加事项
            </Space>
          </Button>
        </Divider>
      </div>
      <div>
        {todos.map((todo) => (
          <Card className={`todo-card ${todo.themeClass}`} key={todo.uuid}>
            <Grid columns={3} gap={8}>
              <Grid.Item>
                <div className='todo-card-info'>
                  <div className='card-info-title'>{todo.title}</div>
                  <div className='text-xs md:text-sm'>
                    已进行 {formatSecondToMinute(todo.todayTime)} 分钟
                  </div>
                </div>
              </Grid.Item>
              <Grid.Item>
                <Popover.Menu
                  actions={[
                    {
                      text: <span className='card-popover-text'>删除</span>,
                      icon: <DeleteOutlined className='card-popover-icon' />
                    }
                  ]}
                  onSelect={() => handleDeleteClick(todo.uuid)}
                  placement='top'
                  trigger='click'
                >
                  <div className='m-auto w-2/3 h-1/2'></div>
                </Popover.Menu>
              </Grid.Item>
              <Grid.Item>
                <div
                  className='todo-card-start'
                  onClick={() => handleTodoRoutePath(todo)}
                >
                  开&nbsp;始
                </div>
              </Grid.Item>
            </Grid>
          </Card>
        ))}
      </div>
      <Mask
        visible={isVisible}
        onMaskClick={toggleVisible}
        afterClose={handleMaskClosed}
      >
        <Card
          title={<span className='md:text-xl'>添加事项</span>}
          className='todo-mask'
        >
          <input
            value={value}
            className='mask-input'
            placeholder='请输入事项名称'
            onChange={handleInputChange}
          />
          <div className='flex'>
            <Button
              className='mask-btn'
              color='primary'
              fill='outline'
              size='mini'
              onClick={handleAddTodoClick}
            >
              添加
            </Button>
          </div>
        </Card>
      </Mask>
    </div>
  );
};

export default Todos;
