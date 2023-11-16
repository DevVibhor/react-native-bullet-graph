import React, {useEffect, useState} from 'react';
import {Text, View, SafeAreaView, FlatList} from 'react-native';
import styles from './styles';
import BottomTimeline from '../../components/BottomTimeline';
import {colors} from '../../utils/colors';

export type Props = {
  data?: object;
  barWidth?: number;
  barHeight?: number;
  barColor?: string;
  barBorderRadius?: number;
  targetBarHeight?: number;
  targetBarWidth?: number;
  targetBarColor?: string;
  targetTextColor?: string;
  actualBarColor?: string;
  actualTextColor?: string;
  actualBarHeight: number;
  lowerBarColor?: string;
  mediumBarColor?: string;
  numericSize?: number;
  timelineFontSize?: number;
  hideActualValue?: boolean;
  hideTargetValue?: boolean;
  numberPrefix?: string;
  internationalNumberSystem?: boolean;
  hideScale?: boolean;
};

const BetterBulletGraph: React.FC<Props> = ({
  data = {},
  barWidth = 85,
  barHeight = 30,
  barColor = colors?.green,
  barBorderRadius = 10,
  targetBarHeight = 40,
  targetBarWidth = 5,
  targetBarColor = colors?.black,
  targetTextColor = colors?.black,
  actualBarColor = colors?.black,
  actualTextColor = colors?.white,
  actualBarHeight = 15,
  lowerBarColor = colors?.red,
  mediumBarColor = colors?.yellow,
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
  const [barWidthVal, setBarWidthVal] = useState('85%');
  const [scaleData, setScaleData] = useState({});

  const [actualBarHeightVal, setActualBarHeightVal] = useState(actualBarHeight);
  const [lowBarWidth, setLowBarWidth] = useState(0);
  const [mediumBarWidth, setMediumBarWidth] = useState(0);

  useEffect(() => {
    const calculateGraphDimensions = () => {
      // Calculating target, actual, lower bar and medium bar values in percentage to set the width
      let tgValue = (data?.target / data?.upper) * 100;
      let actValue = (data?.actual / data?.upper) * 100;
      let lowValue = (data?.lower / data?.upper) * 100;
      let mediumValue = (data?.medium / data?.upper) * 100;

      setLowBarWidth(lowValue);
      setMediumBarWidth(mediumValue);
      setTargetVal(tgValue ?? 0);
      setActualVal(actValue ?? 0);

      if (barWidth > 50) {
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
    calculateGraphDimensions();

    setBarWidthVal(`${barWidth}%`);
    setActualBarHeightVal(actualBarHeightVal ?? barHeight * 0.7);
  }, []);

  return (
    <SafeAreaView style={styles?.mainStyle}>
      <View
        style={[
          styles?.mainBarStyle,
          {
            width: barWidthVal,
            height: barHeight,
            backgroundColor: barColor,
            borderRadius: barBorderRadius,
          },
        ]}>
        {/*
         * Main Bar (Good Range)
         */}
        <View style={[styles?.centerAlignedAbsoluteViews, {zIndex: 3}]}>
          <View
            style={[
              styles?.actualStyle,
              {
                width: `${actualVal}%`,
                height: actualBarHeightVal,
                backgroundColor: actualBarColor,
              },
            ]}
          />
        </View>

        {/*
         * Lower Bar (Bad Range)
         */}
        <View
          style={[
            styles?.barStyleLower,
            {
              width: `${lowBarWidth}%`,
              height: barHeight,
              backgroundColor: lowerBarColor ?? colors?.red,
              borderTopLeftRadius: barBorderRadius,
              borderBottomLeftRadius: barBorderRadius,
            },
          ]}
        />

        {/*
         * Medium Bar (Satisfactory Range)
         */}
        <View
          style={[
            styles?.barStyleMedium,
            {
              width: `${mediumBarWidth}%`,
              height: barHeight,
              backgroundColor: mediumBarColor,
              borderTopLeftRadius: barBorderRadius,
              borderBottomLeftRadius: barBorderRadius,
            },
          ]}
        />

        {/*
         * Target Bar
         */}
        <View style={[styles?.centerAlignedAbsoluteViews, {zIndex: 3}]}>
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
                  fontSize: numericSize ?? 12,
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

        {/* Actual Bar (Performance) */}
        <View
          style={[
            styles?.centerAlignedAbsoluteViews,
            {
              width: `${actualVal}%`,
              zIndex: 4,
            },
          ]}>
          {hideActualValue === true ? null : (
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
          )}
        </View>
      </View>

      {/* Quantitative Scale Code Begins */}
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
      {/* Quantitative Scale Code Ends */}
    </SafeAreaView>
  );
};

export default BetterBulletGraph;
