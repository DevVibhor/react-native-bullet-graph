import React, {memo} from 'react';
import {View, Text} from 'react-native';
import {colors} from '../utils/colors';
import styles from './styles';

export type Props = {
  index?: number;
  item?: object;
  numberPrefix?: string;
  internationalNumberSystem?: boolean;
  timelineFontSize?: number;
};

const BottomTimeline: React.FC<Props> = ({
  index = 0,
  item,
  numberPrefix,
  internationalNumberSystem,
  timelineFontSize,
}) => {
  return (
    <View style={styles?.mainContainer}>
      {/* Divider Line code begins */}
      <View
        style={{
          height: index % 2 ? 10 : 15,
          width: index % 2 ? 0.5 : 1,
          backgroundColor: colors?.black,
        }}
      />
      {/*  Divider Line code ends */}

      {/* Divider Line Number code begins */}
      <View style={styles?.numberContainer}>
        <Text
          style={[
            styles?.textStyle,
            {
              fontSize: timelineFontSize ?? 12,
            },
          ]}
          numberOfLines={1}>
          {index % 2
            ? ''
            : `${numberPrefix ?? ''}${
                internationalNumberSystem === true
                  ? item?.value
                      .toString()
                      .replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')
                  : item?.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }`}
        </Text>
      </View>
      {/* Divider Line Number code ends */}
    </View>
  );
};

function arePropsEqual(prevProps, nextProps) {
  return nextProps?.item === prevProps?.item;
}

export default memo(BottomTimeline, arePropsEqual);
