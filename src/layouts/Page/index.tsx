import { UnorderedListOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Spin } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import AvatarButton from "../../AvatarButton";
import { Link, Outlet, useLocation } from "react-router-dom";
import Select from "../../common/SelectInput";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setUser, userIdSelector } from "../../store/slices/userSlice";
import { useFetch } from "../../hooks/useFetch";
import { User } from "../../types/User.dto";
import { SelectOption } from "../../types/SelectOption.dto";
import "./Page.css";

const pathToTitle: Record<string, string> = {
  "/": "Posts",
  "/posts": "Posts",
  "/active-user": "User Details",
};

const Page: React.FC = () => {
  const [users, setUsers] = useState<SelectOption[] | null>(null);
  const dispatch = useAppDispatch();
  const selectedUser = useAppSelector(userIdSelector);
  const location = useLocation();

  const { data, isLoading, error } = useFetch<User[]>("users");

  useEffect(() => {
    if (data) {
      setUsers(data?.map((usr) => ({ label: usr.name, value: usr.id })));
      dispatch(setUser(data[0].id));
    }
  }, [data, dispatch]);

  const handleUserChange = (value: string) => {
    dispatch(setUser(value));
  };

  const title = pathToTitle[location.pathname] || "Default Title";

  if (error) return <div role='alert'>Error: {error}</div>;

  if (isLoading || !users) return <Spin />;

  return (
    <Layout>
      <Header className='page-header'>
        <div className='page-header-item left'>
          <Link to='/active-user'>
            <AvatarButton icon={<UserOutlined />} />
          </Link>
          <Link to='/posts'>
            <AvatarButton icon={<UnorderedListOutlined />} />
          </Link>
        </div>
        <h1>{title}</h1>
        <div className='page-header-item right'>
          <Select
            options={users}
            value={selectedUser ?? users?.[0].label}
            onChange={handleUserChange}
          />
        </div>
      </Header>
      <Content className='page-content'>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default Page;
