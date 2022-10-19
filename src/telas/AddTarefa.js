import React, {Component} from "react";
import { Modal, View, StyleSheet, TouchableWithoutFeedback, Text, TouchableOpacity, TextInput, Platform } from "react-native";
import Estilos from "../Estilos";
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from "moment";

const estadoInicial = { desc: '', date: new Date(), showDatePicker: false}

export default class AddTarefa extends Component{

    state = {
        ...estadoInicial
    }

    save =()=>{
        const newTask ={
            desc: this.state.desc,
            date: this.state.date
        }
        this.props.onSave && this.props.onSave(newTask)
        this.setState({...estadoInicial})
    }

    getDateTime=()=>{
        let datePicker = <DateTimePicker value={this.state.date} 
        onChange={(_, date)=> this.setState({date, showDatePiker: false})} 
        mode='date' /> 
        
        const dateString = moment(this.state.date).format('dddd, D [de] MMMM [de] YYYY')

        if(Platform.OS === 'android'){
            datePicker = (
                <View>
                    <TouchableOpacity onPress={()=> this.setState({showDatePicker: true})}>
                        <Text style={styles.date}>
                            {dateString}
                        </Text>
                    </TouchableOpacity>
                    {this.state.showDatePicker && datePicker}
                </View>
            )
        }
        
        
        return datePicker
    }

    render(){
        return(
            <Modal transparent={true} 
            visible={this.props.visible} 
            onRequestClose={this.props.onCancel} 
            animationType='slide'
            >
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <Text style={styles.header}>Add tarefa</Text>
                    <TextInput style={styles.imput}
                    placeholder="Informe a Descrição..."
                    value={this.state.desc}
                    onChangeText={desc=> this.setState({desc})}
                    />
                    {this.getDateTime()}
                    <View style={styles.botoes}>
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={styles.botao}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.save}>
                            <Text style={styles.botao}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    background:{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    container:{
        backgroundColor: '#FFF'
    },
    header:{
        backgroundColor: Estilos.colors.hoje,
        color: Estilos.colors.secundaria,
        textAlign: 'center',
        padding: 15,
        fontSize: 15,
    },
    imput:{
        height: 40,
        margin: 15,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor:'#E3E3E3',
        borderRadius: 6,
        
    },
    botoes:{
        flexDirection: 'row',
        justifyContent: 'flex-end',

    },
    botao:{
        margin: 20,
        marginRight: 30,
        color: Estilos.colors.hoje
    },
    date:{
        fontSize:20,
        marginLeft: 15,
    }
})