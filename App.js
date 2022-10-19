import { Component } from "react";
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Platform, Alert  } from "react-native";
import moment from 'moment'
import 'moment/locale/pt-br'
import { AntDesign } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Estilos from './src/Estilos'
import AddTarefa from "./src/telas/AddTarefa";
import Tarefa from "./src/components/Tarefa";

const initialState = {
  mostrarConcluidas: true,
  tarefasVisiveis:[],
  mostrarModal: false,
  tarefas:[]
}

export default class App extends Component {
  state = {
    ...initialState
  }

componentDidMount = async ()=>{
  const stateString = await AsyncStorage.getItem('state')
  const state = JSON.parse(stateString) || initialState
  this.setState(state, this.filterTasks)
}

  filtrarTarefas=()=>{
    this.setState({mostrarConcluidas: !this.state.mostrarConcluidas}, this.filterTasks)
  }

  filterTasks =()=>{
    let tarefasVisiveis = null 
    if(this.state.mostrarConcluidas){
      tarefasVisiveis = [...this.state.tarefas]
    }else{
      const pending = task => task.dataCon === null
      tarefasVisiveis = this.state.tarefas.filter(pending)
    }
    this.setState({tarefasVisiveis})
    AsyncStorage.setItem('state', JSON.stringify(this.state))
  }
  
  tarefaConc = tarefaId=>{
    const tarefas = [...this.state.tarefas]
    tarefas.forEach(tarefa=>{
      if(tarefa.id === tarefaId){
        tarefa.dataCon = tarefa.dataCon ? null : new Date()
      }
    })

    this.setState({tarefas}, this.filterTasks)
  }


    addTask = newTask => {
      if(!newTask.desc || !newTask.desc.trim()){
        Alert.alert('Dados Inválidos', 'Descrição não informada!')
        return
      }

      const tarefas = [...this.state.tarefas]
      tarefas.push({
        id: Math.random(),
        desc: newTask.desc,
        dataEst: newTask.Date,
        dataCon: null
      })
      this.setState({tarefas, mostrarModal: false })
    }

    deleteTask = id =>{
      const tarefas = this.state.tarefas.filter( task => task.id !== id)
      this.setState({tarefas}, this.filterTasks)
    }


    render(){
      const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
      return(
        <View style={styles.container} >
          <AddTarefa visible={this.state.mostrarModal}
          onCancel={()=> this.setState({mostrarModal: false})}
          onSave={this.addTask}/>
          <View style={styles.header}>
            <View style={styles.titleBar}>
              <Text style={styles.title}>Hoje</Text>
              <Text style={styles.subtitle}>{today}</Text>
               
            </View> 
            <View style={styles.iconBar}>
                <TouchableOpacity  onPress={this.filtrarTarefas}>
                  <AntDesign name={this.state.mostrarConcluidas ? 'eye' : 'eyeo'} 
                  size={35} color='#FFF'/>
                </TouchableOpacity>
              </View>
          </View>
          <View style={styles.lista}>
          <FlatList data={this.state.tarefasVisiveis} 
            keyExtractor={item=> `${item.id}`}
            renderItem={({item}) => <Tarefa {...item} 
            tarefaConc={this.tarefaConc} 
            onDelete={this.deleteTask}/> }
            />
             
          </View>
          <TouchableOpacity style={styles.addButton}
          onPress={()=> this.setState({mostrarModal: true})}
          activeOpacity={0.7}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
    )}
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    header:{
      flex: 2,
      flexDirection: 'row',
      backgroundColor: 'red'
    },
    lista:{
      flex: 9
    },
    titleBar:{
      flex: 1,
      justifyContent: 'flex-end',
      
    },
    title:{
      fontSize: 50,
      color: Estilos.colors.secundaria,
      marginLeft: 20,
    },
    subtitle:{
      fontSize: 20,
      color: Estilos.colors.secundaria,
      marginLeft: 20,
      marginBottom: 20
    },
    iconBar:{
      flexDirection: 'row',
      marginHorizontal:20,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      marginBottom: 20
    },
    addButton:{
      position: 'absolute',
      right: 30,
      bottom: 30,
      width: 50,
      height: 50,
      borderRadius:25,
      backgroundColor: Estilos.colors.hoje,
      alignItems: "center",
      justifyContent: "center"
      },
      addButtonText:{
        fontSize:35,
        color: Estilos.colors.secundaria
      }
 
});