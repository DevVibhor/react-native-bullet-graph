import React from "react";
import { View } from "react-native";
import { colors } from "../utils/colors";

const BottomTimeline = (props) => {
  const { item, index } = props;

  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "center",
        alignSelf: "center",
      }}
    >
      <View
        style={{
          height: index % 2 ? 10 : 15,
          width: index % 2 ? 0.5 : 1,
          backgroundColor: colors?.black,
          alignSelf: "center",
        }}
      />
    </View>
  );
};

export default BottomTimeline;
