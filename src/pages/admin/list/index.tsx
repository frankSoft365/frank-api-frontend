import { PageContainer } from '@ant-design/pro-components';
import '@umijs/max';
import { Table } from 'antd';
import { QueryFilter, ProFormText } from '@ant-design/pro-components';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { getUserList } from '@/services/ant-design-pro/api';
const List: React.FC = () => {
    const [rows, setRows] = useState<API.CurrentUser[]>([]);
    useEffect(() => {
        const fetchUserList = async () => {
            const res = await getUserList();
            setRows(res.data);
        }
        fetchUserList();
    }, []);
    const getGender = (index: number) => {
        switch (index) {
            case 1:
                return '男'
            case 2:
                return '女'
            default:
                return '未设置'
        }
    }
    const columns = [
        {
            title: '序号',
            key: 'index',
            render: (_text: any, _record: any, index: number) => index + 1,
        },
        {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '账户名',
            dataIndex: 'userAccount',
            key: 'userAccount',
        },
        {
            title: '性别',
            dataIndex: 'gender',
            key: 'gender',
            render: (_text: any, _record: any, index: number) => getGender(_record.gender),
        },
        {
            title: '电话',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: '头像',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (_text: any, _record: any, index: number) => <img src={_record.avatar} alt="avatar" style={{ width: 40 }} />
        },
        {
            title: '注册时间',
            dataIndex: 'createTime',
            key: 'createTime',
            render: (_text: any, _record: any, index: number) => dayjs(_record.createTime).format('YYYY-MM-DD HH:mm:ss'),
        },
        {
            title: '用户状态',
            dataIndex: 'userStatus',
            key: 'userStatus',
            render: (_text: any, _record: any, index: number) => _record.userStatus === 1 && '正常',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: '用户权限',
            dataIndex: 'role',
            key: 'role',
            render: (_text: any, _record: any, index: number) => _record.role === 0 ? '普通用户' : '管理员',
        },
    ];

    const handleQuery = async (values: any) => {
        const res = await getUserList(values);
        setRows(res.data);
    }
    const handleReset = async () => {
        const res = await getUserList();
        setRows(res.data);
    }
    return (
        <PageContainer>
            {/* 条件查询的条件筛选面板 */}
            <QueryFilter onFinish={handleQuery} onReset={handleReset}>
                <ProFormText name="username" label="用户名" placeholder='请输入用户名' />
            </QueryFilter>
            <Table dataSource={rows} columns={columns} />
        </PageContainer>
    );
};
export default List;
