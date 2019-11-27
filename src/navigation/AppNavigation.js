import { StackNavigator } from 'react-navigation';
import CarListScreen from '../screens/CarListScreen';
import ViewQRScreen from '../screens/ViewQRScreen';
import NewCarScreen from '../screens/NewCarScreen';
import ViewPdfScreen from '../screens/ViewPdfScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import SplashScreen from '../screens/SplashScreen';

export const AppNavigation = StackNavigator({

  ToHome: { screen: CarListScreen },
  ToViewQR: { screen: ViewQRScreen },
  ToNewCar: { screen: NewCarScreen },
  ToViewPdf: { screen: ViewPdfScreen },
  ToNotifications: { screen: NotificationsScreen },
  ToSplashScreen: { screen: SplashScreen },
});
