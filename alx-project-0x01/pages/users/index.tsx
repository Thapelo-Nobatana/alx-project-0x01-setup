import UserCard from "@/components/common/UserCard";
import UserModal from "@/components/common/UserModal";
import Header from "@/components/layout/Header";
import { UserData, PostsPageProps } from "@/interfaces";
import { UserPageProps } from "@/interfaces";
import { useState } from "react";



const Users: React.FC<UserPageProps> = ({ posts }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [allUsers, setAllUsers] = useState<UserData[]>(posts);

  const handleAddUser = (newUser: UserData) => {
    setAllUsers((prev) => [...prev, { ...newUser, id: prev.length + 1 }]);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="p-4">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold">User Content</h1>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-blue-700 px-4 py-2 rounded-full text-white"
          >
            Add User
          </button>
        </div>

        
        <div className="grid grid-cols-3 gap-2">
          {posts.map((user: UserData, index: number) => (
            <UserCard
              key={index}
              id={user.id}
              name={user.name}
              username={user.username}
              email={user.email}
              address={user.address}
              phone={user.phone}
              website={user.website}
              company={user.company}
            />
          ))}
        </div>
      </main>

      {isModalOpen && (
        <UserModal onClose={() => setModalOpen(false)} onSubmit={handleAddUser} />
      )}
    </div>
  );
};


export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const posts = await response.json();

  return {
    props: {
      posts,
    },
  };
}

export default Users;