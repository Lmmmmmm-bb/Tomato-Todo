import { FC, useState, useEffect } from 'react';
import {
  Divider,
  Button,
  Space,
  Input,
  Card,
  Grid,
  Mask,
  Toast
} from 'antd-mobile';
import { PlusOutlined } from '@ant-design/icons';

import Todo from '../../models/Todo';
import { getTodos, saveTodos } from '../../utils/storage';
import randomColor from '../../utils/randomColor';
import './index.css';

const Todos: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [value, setValue] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const all = JSON.parse(getTodos() || '[]');
    setTodos(all);
  }, []);
  useEffect(() => {
    return () => {
      if (todos.length !== 0) {
        saveTodos(todos);
      }
    };
  }, [todos]);

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
      setTodos([{ title: target, countTime: 0 }, ...todos]);
      setVisible(false);
      setValue('');
    }
  };
  const handleTodoRoutePath = (todo: Todo) => {
    console.log(todo);
  };

  return (
    <div>
      <div className='mt-6'>
        <Divider contentPosition='right'>
          <Button size='mini' onClick={() => setVisible(true)}>
            <Space>
              <PlusOutlined />
              添加待办
            </Space>
          </Button>
        </Divider>
      </div>
      <div>
        {todos.map((todo) => (
          <Card className={`mx-5 my-3 ${randomColor()}`} key={todo.title}>
            <Grid columns={3} gap={8}>
              <Grid.Item>
                <div className='todo-card-info'>
                  <div>{todo.title}</div>
                  <div>{todo.countTime} 分钟</div>
                </div>
              </Grid.Item>
              <Grid.Item></Grid.Item>
              <Grid.Item>
                <div
                  className='todo-card-start'
                  onClick={() => handleTodoRoutePath(todo)}
                >
                  开始
                </div>
              </Grid.Item>
            </Grid>
          </Card>
        ))}
      </div>
      {visible ? (
        <Mask
          visible={visible}
          onMaskClick={() => setVisible(false)}
          afterClose={() => setValue('')}
        >
          <Card title='添加事项' className='mx-8 mt-48'>
            <Input
              value={value}
              className='border-b-2 px-5 my-4 todo-input'
              placeholder='请输入事项名称'
              onChange={(val) => setValue(val)}
              autoFocus
            />
            <div className='flex'>
              <Button
                className='mx-auto'
                size='mini'
                onClick={handleAddTodoClick}
              >
                添加
              </Button>
            </div>
          </Card>
        </Mask>
      ) : null}
    </div>
  );
};

export default Todos;
