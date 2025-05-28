import { UserAvatar } from "../components/UserAvatar";
import { sampleUsers } from "../data/sample-users";
import { useAppContext } from "../context/AppContext";

export const LoginView = () => {
  const { setUser } = useAppContext();
  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center'>
      <div className='bg-white rounded-lg shadow-xl p-8 '>
        <h1 className='text-3xl font-bold text-center mb-8 text-gray-800'>Mini Trello</h1>
        <div className='space-y-4'>
          <h2 className='text-lg font-semibold text-gray-700'>Select User:</h2>
          {sampleUsers.map((user) => (
            <button
              key={user.id}
              onClick={() => setUser(user)}
              className='w-full p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg border transition-colors flex items-center space-x-3'
            >
              <UserAvatar userId={user} size='md' />
              <div>
                <div className='font-medium'>{user.name}</div>
                <div className='text-sm text-gray-600'>{user.email}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
