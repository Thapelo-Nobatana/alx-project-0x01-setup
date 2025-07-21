import UserCard from "@/components/common/UserCard";
import UserModal from "@/components/common/UserModal";
import Header from "@/components/layout/Header";
import { UserData, UsersProps, PostsPageProps } from "@/interfaces";
import { useState } from "react";

const Users: React.FC<PostsPageProps> = ({ users }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [allUsers, setAllUsers] = useState<UserData[]>(users);


  const handleAddUser = (newUser: UserData) => {
    setAllUsers((prev) => [...prev, { ...newUser, id: prev.length + 1 }]);
  };


  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="p-4">
        <div className="flex justify-between">
          <h1 className=" text-2xl font-semibold">User Content</h1>
          <button onClick={() => setModalOpen(true)}
            className="bg-blue-700 px-4 py-2 rounded-full text-white">Add User</button>
        </div>
        <div className="grid grid-cols-3 gap-2 ">
          {
            allUsers?.map(({ id, name, username }: UserData, key: number) => (
              <UserCard name={name} username={username} id={id} key={key} email={""} address={{
                    street: "",
                    suite: "",
                    city: "",
                    zipcode: "",
                    geo: {
                        lat: "",
                        lng: ""
                    }
                }} phone={""} website={""} company={{
                    name: "",
                    catchPhrase: "",
                    bs: ""
                }} />
            ))
          }
        </div>
      </main>

      {isModalOpen && (
        <UserModal onClose={() => setModalOpen(false)} onSubmit={handleAddUser} />
      )}
    </div>
  )
}


export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users")
  const users = await response.json()

  return {
    props: {
      users
    }
  }
}

export default Users;