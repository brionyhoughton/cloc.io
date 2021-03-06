import React from "react";
import HomeScreen from "../../components/user/HomeScreen/HomeScreen";
import NotificationCont from "../../components/user/Notifications/NotificationCont"

const HomeScreenView = props => {
  return (
    <div>
      <HomeScreen
      auth_lvl={props.auth_lvl}
      />
      <NotificationCont />
    </div>
  );
};

export default HomeScreenView;
