import React, {useEffect, useState} from 'react';
import {Text, View, SafeAreaView, FlatList} from 'react-native';
import styles from './styles';
import {colors} from '../../utils/colors';
import BottomTimeline from '../../components/BottomTimeline';

const SimpleBulletGraph = props => {
  const [targetValue, setTargetValue] = useState(0);
  const [actualValue, setActualValue] = useState(0);
  const [targetBarHeight, setTargetBarHeight] = useState(0);
  const [targetBarWidth, setTargetBarWidth] = useState(0);
  const [barWidth, setBarWidth] = useState('90%');
  const [barHeight, setBarHeight] = useState(40);
  const [dataTimeline, setDataTimeline] = useState([]);

  useEffect(() => {
    const calculateGraphDimensions = () => {
      let tgValue = (props?.data?.target / props?.data?.upper) * 100;
      let actValue = (props?.data?.actual / props?.data?.upper) * 100;

      setTargetValue(tgValue);
      setActualValue(actValue);

      if (props?.barWidth ?? 90 > 50) {
        setDataTimeline([
          {
            value: 0,
          },
          {
            value: props?.data?.upper * 0.12,
          },
          {
            value: props?.data?.upper * 0.25,
          },
          {
            value: props?.data?.upper * 0.37,
          },
          {
            value: props?.data?.upper * 0.5,
          },
          {
            value: props?.data?.upper * 0.62,
          },
          {
            value: props?.data?.upper * 0.75,
          },
          {
            value: props?.data?.upper * 0.87,
          },
          {
            value: props?.data?.upper,
          },
        ]);
      } else {
        setDataTimeline([
          {
            value: 0,
          },
          {
            value: props?.data?.upper * 0.25,
          },
          {
            value: props?.data?.upper * 0.5,
          },
          {
            value: props?.data?.upper * 0.75,
          },
          {
            value: props?.data?.upper,
          },
        ]);
      }
    };
    calculateGraphDimensions();

    setTargetBarHeight(props?.targetBarHeight ?? 40);
    setTargetBarWidth(props?.targetBarWidth ?? 5);
    setBarHeight(props?.barHeight ?? 20);
    setBarWidth(`${props?.barWidth ?? 90}%`);
  }, []);

  return (
    <SafeAreaView style={styles?.mainStyle}>
      <View
        style={[
          styles?.barStyle,
          {
            width: barWidth,
            height: barHeight,
            backgroundColor: props?.barColor ?? colors?.yellow,
            borderRadius: props?.barBorderRadius ?? 10,
          },
        ]}>
        <View
          style={[
            styles?.actualStyle,
            {
              width: `${actualValue}%`,
              height: barHeight,
              backgroundColor: props?.actualBarColor ?? colors?.green,
              borderRadius: props?.barBorderRadius ?? 10,
            },
          ]}
        />

        <View style={styles?.centerAlignedAbsoluteViews}>
          <View
            style={[
              styles?.targetStyle,
              {
                left: `${targetValue}%`,
                height: targetBarHeight,
                width: targetBarWidth,
                borderRadius: props?.barBorderRadius ?? 10,
                backgroundColor: props?.targetBarColor ?? colors?.black,
              },
            ]}
          />
        </View>

        {props?.hideTargetValue === true ? null : (
          <Text
            style={[
              styles?.targetValue,
              {
                left: `${targetValue - 5}%`,
                top: -targetBarHeight / 1.2,
                color: props?.targetTextColor ?? colors?.black,
                fontSize: props?.numericSize ?? 12,
              },
            ]}>
            {props?.numberPrefix ?? ''}
            {props?.internationalNumberSystem === true
              ? props?.data?.target
                  .toFixed(Number?.isInteger(props?.data?.target) ? 0 : 2)
                  .toString()
                  .replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')
              : props?.data?.target
                  .toFixed(Number?.isInteger(props?.data?.target) ? 0 : 2)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </Text>
        )}

        <View
          style={[
            styles?.centerAlignedAbsoluteViews,
            {
              width: `${actualValue}%`,
            },
          ]}>
          {props?.hideActualValue === true ? null : (
            <Text
              style={[
                styles?.actualTextValue,
                {
                  color: props?.actualTextColor ?? colors?.black,
                  fontSize: props?.numericSize ?? 12,
                },
              ]}>
              {props?.numberPrefix ?? ''}
              {props?.internationalNumberSystem === true
                ? props?.data?.actual
                    .toFixed(Number?.isInteger(props?.data?.actual) ? 0 : 2)
                    .toString()
                    .replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')
                : props?.data?.actual
                    .toFixed(Number?.isInteger(props?.data?.actual) ? 0 : 2)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </Text>
          )}
        </View>
      </View>

      <FlatList
        data={dataTimeline}
        renderItem={({item, index}) => (
          <BottomTimeline item={item} index={index} />
        )}
        contentContainerStyle={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: barWidth,
          alignSelf: 'center',
        }}
      />

      <FlatList
        data={dataTimeline}
        renderItem={({item, index}) => (
          <View
            style={{
              alignSelf: 'center',
              alignItems: 'center',
              left:
                index === 0 || index === dataTimeline?.length - 1 ? 0 : '50%',
            }}>
            <Text
              style={{
                textAlign: 'center',
                alignSelf: 'center',
                width: '100%',
                fontSize: props?.timelineFontSize ?? 12,
              }}
              numberOfLines={1}>
              {index % 2 ? '' : `${props?.numberPrefix ?? ''}${item?.value}`}
            </Text>
          </View>
        )}
        contentContainerStyle={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: barWidth,
          alignSelf: 'center',
          alignItems: 'center',
        }}
      />
    </SafeAreaView>
  );
};

export default SimpleBulletGraph;
