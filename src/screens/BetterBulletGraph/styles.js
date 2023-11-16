import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  mainBarStyle: {
    alignSelf: 'center',
  },
  barStyleLower: {
    alignSelf: 'center',
    left: 0,
    position: 'absolute',
    zIndex: 2,
  },
  barStyleMedium: {
    alignSelf: 'center',
    left: 0,
    position: 'absolute',
    zIndex: 1,
  },
  actualStyle: {
    alignSelf: 'flex-start',
  },
  targetStyle: {
    position: 'absolute',
  },
  actualTextValue: {
    fontSize: 16,
  },
  mainStyle: {
    width: '100%',
    justifyContent: 'center',
  },
  targetHeader: {
    fontSize: 18,
    position: 'absolute',
    top: 0,
    color: 'black',
    textAlign: 'center',
    alignSelf: 'center',
  },
  targetValueStyle: {
    position: 'absolute',
    textAlign: 'center',
    alignSelf: 'center',
  },
  centerAlignedAbsoluteViews: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
});

export default styles;
