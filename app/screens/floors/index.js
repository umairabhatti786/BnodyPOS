import React, { useEffect, useState } from "react";

import Design from "./design";

const FloorScreen = (props) => {
  return (
    <Design
      TableArray={props.screenData}
      onSelectTable={props.onPress}
      dispatch={props.dispatch}
      navigation={props.navigation}
      setScreenData={props.setScreenData}
      setLoading={props.setLoading}
      setTableID={props.setTableID}
      storageItems={props.storageItems}
      setStorageItems={props.setStorageItems}
      StringsList={props.StringsList}
      orderCode={props?.orderCode}
      setOrderCode={props?.setOrderCode}
    />
  );
};

export default FloorScreen;
