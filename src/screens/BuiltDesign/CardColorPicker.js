import React,{useState, useEffect} from 'react';
import { View, Text, StyleSheet,TouchableOpacity, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {SliderHuePicker} from 'react-native-slider-color-picker'
import tinycolor from 'tinycolor2'
import SliderColorPickerExample from './ColorPickerSlider.js';


const CardColorPicker = (props) => {

    function renderColor(){
        const leng = 6;
        const color=['violet','blue','green','yellow','orange','red']
        return [...Array(leng)].map((elementInArray, index) => (
            <TouchableOpacity onPress={() => {
                props.setColor(color[index])
                var temp2 = props.undo
                var temp = {
                    fontColor:color[index],
                }
                temp2.push(temp)
                props.setUndoLength(props.undoLength+1)
                props.setUndo(temp2)
                }}>
                <View style={{
                    height:30,
                    width:30,
                    backgroundColor:color[index],
                    margin:7,
                    alignSelf:"center",
                    borderRadius:20}} />
            </TouchableOpacity>))
    }

    return(
        <View>
            <Text style={{fontSize:20, paddingLeft:25, padding:10}}>Default Colors</Text>
            <ScrollView horizontal>
                <View style={{flexDirection:'row', paddingLeft:15,}}>
                    {renderColor()}
                </View>
            </ScrollView>
            <Text style={{fontSize:20, paddingLeft:25, padding:10}}>Pick your colors</Text>
                <SliderColorPickerExample 
                    onChangeColor={props.setColor}
                    setUndo = {props.setUndo}
                    undo = {props.undo}
                    setUndoLength = {props.setUndoLength}
                    undoLength = {props.undoLength}
                    />
        </View>
    )

    };

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:10
    },
    header:{
        fontSize:18
    },
    image:{
        flex:1,
        flexDirection:'row',
        height:275,
        width:225
    },
    thumb: {
        width: 20,
        height: 20,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 2,
        shadowOpacity: 0.35,
    },
    track:{
        height:10,
        width:'100%'
    },
    sliderContainer:{
        flex:1,
        width:"70%",
        paddingHorizontal:25.
    }
});

export default CardColorPicker;