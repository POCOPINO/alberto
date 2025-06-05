import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from "../Components/Drawer"

import Home from '../Screens/Home';
import Vacinas from '../Screens/Vacina';
import Nutricao from "../Screens/Nutricao";
import IMC from '../Screens/IMC';
import Medicamentos from '../Screens/Medicamentos';
import Login from '../Screens/Login';
import Cadastro from '../Screens/Cadastro';
import PagMantra from '../Screens/PagMantra';
import MeuPerfil from '../Screens/MeuPerfil';
import PagFrase from '../Screens/FrasedoDia';
import PagSono from '../Screens/DicasdeSono';
import Splash from '../Screens/splesh';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function  HomeDrawer() {
    return(
        <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
            <Drawer.Screen name="Home" component={Home} options={{headerShown: false}}/>
            <Drawer.Screen name="Meu Perfil" component={MeuPerfil} options={{headerShown: false}}/>
        </Drawer.Navigator>
    );
}

export default function Routes (){

return(
<NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen name='Splesh' component={Splash} options={{headerShown: false}} />
        <Stack.Screen name="HomeDrawer" component={HomeDrawer} options={{headerShown: false}}/>
        <Stack.Screen name='Login' component={Login} options={{headerShown: false}} />
        <Stack.Screen name='Cadastro' component={Cadastro} options={{headerShown: false}}/>
        {/*o home drawer precisa estar aqui para ele poder ser usado nos botões que levam diretamente para a Home*/}

        {/*telas acessadas pela home*/}
        <Stack.Screen name='PagSono' component={PagSono} options={{headerShown: false}}/>
        <Stack.Screen name='PagVacina' component={Vacinas} options={{headerShown: false}}/>
        <Stack.Screen name='PagIMC' component={IMC} options={{headerShown: false}}/>
        <Stack.Screen name='PagNutricao' component={Nutricao} options={{headerShown: false}}/>
        <Stack.Screen name='PagRemedio' component={Medicamentos} options={{headerShown: false}}/>
        <Stack.Screen name='PagMantra' component={PagMantra} options={{headerShown: false}}/>
        <Stack.Screen name='PagFrase' component={PagFrase} options={{headerShown: false}}/>
    </Stack.Navigator>  
</NavigationContainer>

);
}