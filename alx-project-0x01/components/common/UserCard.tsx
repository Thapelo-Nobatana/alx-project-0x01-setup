import React from "react"
import { UserProps } from "@/interfaces"

const UserCard: React.FC <UserProps> = ({id, name, username, email}) => {
    return (
        <div>
              <div className="max-w-xl mx-auto my-6 p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">{username}</h2>
      </div>
      <p className="text-gray-600"> UserEmail: {email}</p>
      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <span>User ID: {id}</span>
        <span>User name : {name}</span>
      </div>
    </div>
        </div>
    )
}

export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users")
  const posts = await response.json()

  return {
    props: {
      posts
    }
  }
}


export default UserCard;