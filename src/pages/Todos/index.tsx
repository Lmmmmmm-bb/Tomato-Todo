import { FC, useState, useCallback, useEffect, ChangeEvent } from 'react';
import { Divider, Button, Space, Card, Grid, Mask, Toast } from 'antd-mobile';
import { PlusOutlined } from '@ant-design/icons';
import UUID from 'react-uuid';

import ITodo from '../../models/Todo';
import randomColor from '../../utils/randomColor';
import { getRequest, putRequest } from '../../utils/http';
import { getAllTodos, createTodo } from '../../api/todos.api';

import './index.css';

const Todos: FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [value, setValue] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  // Fetch Todo list data from database.
  useEffect(() => {
    fetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchList = useCallback(async () => {
    const { data: list } = await getRequest(getAllTodos);
    setTodos(list.data);
    console.log(list.data);
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
      const newTodo: ITodo = {
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
    console.log(todo);
  };
  const handleMaskClosed = useCallback(() => setValue(''), []);
  const toggleVisible = () => setIsVisible(!isVisible);
  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
    []
  );

  return (
    <div>
      <div className='mt-6'>
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
                    已进行 {todo.todayTime} 分钟
                  </div>
                </div>
              </Grid.Item>
              <Grid.Item></Grid.Item>
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
