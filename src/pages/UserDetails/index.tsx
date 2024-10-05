import { Spin } from "antd";
import {  useAppSelector } from "../../store/hooks";
import { userIdSelector } from "../../store/slices/userSlice";
import { useFetch } from "../../hooks/useFetch";

interface UserDetails {
  name: string;
  email: string;
  phone: string;
  website: string;
}

const UserDetailsPage: React.FC = () => {
  const userId = useAppSelector(userIdSelector);
  const { data, error, isLoading } = useFetch<UserDetails>(`users/${userId}`);

  if (error) return <div role='alert'>Error: {error}</div>;

  if (isLoading) return <Spin />;

  return (
    <>
      {data === null ? (
        <Spin />
      ) : (
        <div>
          <p>
            <b>Name:</b> {data.name}
          </p>
          <p>
            <b>Email:</b> {data.email}
          </p>
          <p>
            <b>Phone:</b> {data.phone}
          </p>
          <p>
            <b>Website:</b> {data.website}
          </p>
        </div>
      )}
    </>
  );
};

export default UserDetailsPage;
