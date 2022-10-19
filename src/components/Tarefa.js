import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, } from "react-native";
import Estilos from "../Estilos";
import moment from "moment";
import 'moment/locale/pt-br'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { GestureHandlerRootView } from "react-native-gesture-handler/Swipeable";

export default props =>{

    const doneOrNot = props.dataCon != null ?{textDecorationLine: 'line-through'} : {}

    const data = props.dataCon ? props.dataCon : props.dataEst
    const dataFormatada = moment(data).locale('pt-br').format('ddd,  D [de] MMMM')
    const getRightContent= ()=>{
        return(
            <TouchableOpacity style={styles.rigth} onPress={()=> props.onDelete && props.onDelete(props.id)} >
                <Text style={styles.delbutton}>X</Text>
            </TouchableOpacity>
        )
    }
    const getLeftContent= ()=>{
        return(
            <View style={styles.left}>
                <Text style={styles.excludeicon}>X</Text>
                <Text style={styles.exclude}>Excluir</Text>
            </View>
            
        )
    }


    return (
       
       <Swipeable renderRightActions={getRightContent}
    renderLeftActions={getLeftContent} 
    onSwipeableLeftWillOpen={()=>()=> props.onDelete && props.onDelete(props.id)}>
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={()=> props.tarefaConc(props.id)}>
                    <View style={styles.checkContainer}>
                        {checkView(props.dataCon)}
                    </View>
                </TouchableWithoutFeedback>
                <View>
                    <Text style={[styles.desc, doneOrNot ]}>{props.desc}</Text>
                    <Text style={styles.data}>{dataFormatada}</Text>
                </View>    
            </View>
       </Swipeable>
            
        
    )
}

function checkView(dataCon){
    if(dataCon != null ){
        return(
            <View style={styles.concluido}>
            
            </View>
        ) 
    }else{
        return(
            <View style={styles.pendente}></View>
        )  
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#AAA',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor:'#FFF'
    },
    checkContainer:{
        width: '15%',
        alignItems:'center'
    },
    pendente:{
        height: 20,
        width:20,
        borderRadius:10,
        borderWidth:1,
        borderColor: '#555',
    
    },
    concluido:{
        height: 20,
        width:20,
        borderRadius:10,
        backgroundColor: '#555',
        alignItems: 'center',
        justifyContent: 'center',
    
    },
    desc:{
        color: Estilos.colors.mainText,
        fontSize: 15,
    },
    data:{
        color: Estilos.colors.subText,
        fontSize: 10,
    },
    delbutton:{
        fontSize:25,
        color: '#FFF',
        fontWeight: 'bold'
    },
    rigth:{
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'flex-end',
        paddingHorizontal:20,

    },
    left:{
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems:'center',
        flex: 1
    },
    exclude:{
        color:'#FFF',
        fontSize: 20,
        margin:10,

    },
    excludeicon:{
        marginLeft: 10,
        color: '#FFF',
        fontSize: 25,
        fontWeight: 'bold'
    }
})