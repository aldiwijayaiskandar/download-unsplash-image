import {createNavigationContainerRef} from '@react-navigation/native';

import {NavigationParams} from '@models';

/*
    A reference for navigation function in React Navigation
    note:
    - use for navigation throught out the apps & used because have the type of the params of each screen
    - every navigation must use this function for standarisation purposes
*/
export const navigationRef = createNavigationContainerRef<NavigationParams>();
