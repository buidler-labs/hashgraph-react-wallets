import { forwardRef } from "react";

const UsersList = forwardRef(({users}, ref) => {
    console.log('render')
    return <ul ref={ref}>
      {users?.map((item, index) => <li key={item.id}> {item.name} </li>)}
    </ul>
  })

  export default UsersList;