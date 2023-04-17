import React, { forwardRef } from "react";
import DoorDashFavorite from "../../../Loader/Loader";
import ListBox from "./ListBox";
import Catalog from "../../../Loader/Catalog";
import {BiMessageError as Error} from 'react-icons/bi'

const MemberList = forwardRef(({ list, hasMore, isLoading }, ref) => {

  if (isLoading && list.length==0) {
    return <Catalog/>
  }
  if (!list.length) {
    return (
      <div className="text-lg text-gray-500  h-16 mb-6 shadow rounded-lg flex items-center justify-center border-t-2 border-purple-700">
        <Error size={23} className="text-purple-700 mx-2"/>
        <div>Sorry, No members were found</div>
      </div>
    )
  }
  return (
    <div>
      <div className="px-3 grid grid-cols-2 gap-2">
        {list.map((user, i) => (
          <ListBox
            key={i}
            username={user.username}
            active={user.active}
            postCount={user.postCount}
            followerCount={user.followerCount}
            followingCount={user.followingCount}
            isfollow={user.isfollow}
          />
        ))}

        {hasMore && (list.length % 2 == 0 ? (
          <>
            <DoorDashFavorite width={"100%"} height={"100%"} ref={ref}/>
            <DoorDashFavorite width={"100%"} height={"100%"} ref={ref}/>
          </>
        ) : (
          <DoorDashFavorite ref={ref}/>
        ))}
       
      </div>
    </div>
  ); 
})


export default MemberList;
