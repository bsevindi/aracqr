import { Alert } from 'react-native';
import noop from '../util/noop';

export const singleButtonNoopAlert = (title, message, buttonText) => {
  Alert.alert(
    title,
    message,
    [
      { text: buttonText, onPress: () => noop() },
    ],
    { cancelable: false }
  );
};
