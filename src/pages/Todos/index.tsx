import { FC } from 'react';
import { Divider, Button, Space, Dialog, Input } from 'antd-mobile';
import { PlusOutlined } from '@ant-design/icons';

import './index.css';

const InputTodoDialog = () => {
  Dialog.confirm({
    title: <div className='text-lg'>添加待办</div>,
    content: (
      <>
        <Input
          className='border-b-2 px-5 todo-input'
          placeholder='请输入事项名称'
        />
      </>
    ),
    onConfirm: () => {}
  });
};

const Todos: FC = () => {
  return (
    <div>
      <div>
        <Divider contentPosition='right'>
          <Button size='mini' onClick={InputTodoDialog}>
            <Space>
              <PlusOutlined />
              添加待办
            </Space>
          </Button>
        </Divider>
      </div>
    </div>
  );
};

export default Todos;
