import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },

    header: {
        backgroundColor: '#fff',
        paddingVertical: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        //SOMBRAS//
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
        
    },

    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#004f92',
        marginRight: 20
    },

    menuButton: {
        padding: 5,
    },

    profileButton: {
        padding: 5,
    },

    content: {
         alignItems: 'center',
         paddingVertical: 20,
    },

    button: {
        width: '95%',
        marginVertical: 10,
        paddingVertical: 20,
        flex: 1,
        borderRadius: 10,
        backgroundColor: '#004f92',
        //SOMBRAS//
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },

    buttonView: {
        justifyContent: 'space-between',
        paddingHorizontal: '5%',
    },
    buttonContent:{
        flexDirection: 'row',
        justifyContent:'space-between',
    },
    buttonDescription:{
        flexDirection: 'row',
        alignItems:'flex-start',
    },

    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },

    description: {
        fontSize: 14,
        color: '#d0d0d0',
        marginTop: 5,
    },

    icon: {
        marginLeft: '5%',
        marginTop:'1%',
    },

    image: {
        width: 30,
        height: 30,
        marginRight: 10,
        resizeMode: 'contain',
    },
});