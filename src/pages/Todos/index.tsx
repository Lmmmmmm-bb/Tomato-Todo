import { FC, useState, useCallback, ChangeEvent } from 'react';
import { Divider, Button, Space, Card, Grid, Mask, Toast } from 'antd-mobile';
import { PlusOutlined } from '@ant-design/icons';
import uuid from 'react-uuid';

import Todo from '../../models/Todo';
import randomColor from '../../utils/randomColor';
import './index.css';

const Todos: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [value, setValue] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const handleAddTodoClick = () => {
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
        content: '事项已存在'
      });
    } else {
      const newTodo: Todo = {
        uuid: uuid(),
        title: target,
        totalTime: 0,
        todayTime: 180,
        totalTimes: 0,
        todayTimes: 0,
        themeClass: randomColor()
      };
      setTodos([newTodo, ...todos]);
      setIsVisible(false);
      setValue('');
    }
  };
  const handleTodoRoutePath = (todo: Todo) => {
    console.log(todo);
  };
  const handleMaskClosed = useCallback(() => {
    setValue('');
  }, []);
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
          <Card className={`todo-card ${todo.themeClass}`} key={todo.title}>
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
