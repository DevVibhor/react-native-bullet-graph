import React, {useEffect, useState} from 'react';
import {Text, View, SafeAreaView, FlatList} from 'react-native';
import styles from './styles';
import {colors} from '../../utils/colors';
import BottomTimeline from '../../components/BottomTimeline';

export type Props = {
  data?: object;
  barHeight?: number;
  barWidth?: number;
  barColor?: string;
  barBorderRadius?: number;
  targetBarHeight?: number;
  targetBarWidth?: number;
  targetBarColor?: string;
  targetTextColor?: string;
  actualBarColor?: string;
  actualTextColor?: string;
  numericSize?: number;
  timelineFontSize?: number;
  hideActualValue?: boolean;
  hideTargetValue?: boolean;
  numberPrefix?: string;
  internationalNumberSystem?: boolean;
  hideScale?: boolean;
};

const SimpleBulletGraph: React.FC<Props> = ({
  data = {},
  barHeight = 20,
  barWidth = 85,
  barColor = colors?.yellow,
  barBorderRadius = 2,
  targetBarHeight = 40,
  targetBarWidth = 5,
  targetBarColor = colors?.black,
  targetTextColor = colors?.black,
  actualBarColor = colors?.green,
  actualTextColor = colors?.black,
  numericSize = 12,
  timelineFontSize = 12,
  hideActualValue = false,
  hideTargetValue = false,
  numberPrefix = '',
  internationalNumberSystem = false,
  hideScale = false,
}) => {
  const [targetVal, setTargetVal] = useState(0);
  const [actualVal, setActualVal] = useState(0);
  const [barWidthVal, setBarWidthVal] = useState(barWidth);
  const [scaleData, setScaleData] = useState({});

  useEffect(() => {
    const calculateGraphDimensions = () => {
      // Calculating target and actual values in percentage to set the width
      let tgValue = (data?.target / data?.upper) * 100;
      let actValue = (data?.actual / data?.upper) * 100;

      setTargetVal(tgValue);
      setActualVal(actValue);

      if (barWidthVal ?? 90 > 50) {
        setScaleData([
          {
            value: 0,
          },
          {
            value: data?.upper * 0.12,
          },
          {
            value: data?.upper * 0.25,
          },
          {
            value: data?.upper * 0.37,
          },
          {
            value: data?.upper * 0.5,
          },
          {
            value: data?.upper * 0.62,
          },
          {
            value: data?.upper * 0.75,
          },
          {
            value: data?.upper * 0.87,
          },
          {
            value: data?.upper,
          },
        ]);
      } else {
        setScaleData([
          {
            value: 0,
          },
          {
            value: data?.upper * 0.25,
          },
          {
            value: data?.upper * 0.5,
          },
          {
            value: data?.upper * 0.75,
          },
          {
            value: data?.upper,
          },
        ]);
      }
    };

    // Calculating dimensions for bottom timeline
    calculateGraphDimensions();
    setBarWidthVal(`${barWidthVal}%`);
  }, []);

  return (
    <SafeAreaView style={styles?.mainStyle}>
      <View
        style={[
          styles?.barStyle,
          {
            width: barWidthVal,
            height: barHeight,
            backgroundColor: barColor,
            borderRadius: barBorderRadius,
          },
        ]}>
        {/*
         * Actual Bar
         */}
        <View
          style={[
            styles?.actualStyle,
            {
              width: `${actualVal}%`,
              height: barHeight,
              backgroundColor: actualBarColor,
              borderRadius: barBorderRadius,
            },
          ]}>
          {hideActualValue === true ? null : (
            <View
              style={[
                styles?.centerAlignedAbsoluteViews,
                {
                  // width: `${actualVal}%`,
                },
              ]}>
              <Text
                style={[
                  styles?.actualTextValue,
                  {
                    color: actualTextColor,
                    fontSize: numericSize,
                  },
                ]}>
                {numberPrefix ?? ''}
                {internationalNumberSystem === true
                  ? data?.actual
                      .toFixed(Number?.isInteger(data?.actual) ? 0 : 2)
                      .toString()
                      .replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')
                  : data?.actual
                      .toFixed(Number?.isInteger(data?.actual) ? 0 : 2)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </Text>
            </View>
          )}
        </View>

        {/*
         * Target Bar
         */}
        <View style={styles?.centerAlignedAbsoluteViews}>
          {hideTargetValue === true ? null : (
            <Text
              style={[
                styles?.targetValueStyle,
                {
                  left:
                    numberPrefix === ''
                      ? `${targetVal - 5}%`
                      : `${targetVal - 7}%`,
                  height: targetBarHeight + 30,
                  color: targetTextColor,
                  fontSize: numericSize,
                },
              ]}>
              {numberPrefix ?? ''}
              {internationalNumberSystem === true
                ? data?.target
                    .toFixed(Number?.isInteger(data?.target) ? 0 : 2)
                    .toString()
                    .replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')
                : data?.target
                    .toFixed(Number?.isInteger(data?.target) ? 0 : 2)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </Text>
          )}
          <View
            style={[
              styles?.targetStyle,
              {
                left: `${targetVal - 0.7}%`,
                height: targetBarHeight,
                width: targetBarWidth,
                borderRadius: barBorderRadius,
                backgroundColor: targetBarColor,
              },
            ]}
          />
        </View>
      </View>

      {/*
       * Quantitative Scale Code Begins
       */}
      {hideScale !== false ? null : (
        <FlatList
          data={scaleData}
          renderItem={({item, index}) => (
            <BottomTimeline
              item={item}
              index={index}
              numberPrefix={numberPrefix}
              internationalNumberSystem={internationalNumberSystem}
              timelineFontSize={timelineFontSize}
            />
          )}
          contentContainerStyle={[
            styles?.flatListContainerStyle,
            {
              width: barWidthVal,
            },
          ]}
        />
      )}
      {/*
       * Quantitative Scale Code Ends
       */}
    </SafeAreaView>
  );
};

export default SimpleBulletGraph;
