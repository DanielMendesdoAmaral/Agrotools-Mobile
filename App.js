import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {purple, white} from "./utils/constants";

import Forms from "./pages/Forms";
import QuestionsAndAnswers from "./pages/QuestionsAndAnswersForm"

const Stack = createStackNavigator();

const headerOptions = {
    headerStyle: {
        backgroundColor: purple
    },
    headerTintColor: white,
    headerTitleStyle: {
        fontWeight: 'bold',
        color: white,
        alignSelf: "center"
    }
}

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Forms">
                <Stack.Screen name="Forms" component={Forms} options={headerOptions}/>
                <Stack.Screen name="Perguntas e respostas" component={QuestionsAndAnswers} options={headerOptions}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}