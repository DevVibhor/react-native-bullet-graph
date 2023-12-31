import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  barStyle: {
    height: 30,
    alignSelf: 'center',
  },
  actualStyle: {
    alignSelf: 'flex-start',
  },
  targetStyle: {
    position: 'absolute',
  },
  actualTextValue: {
    textAlign: 'center',
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
