import React,{useState, useEffect} from 'react';
import { View, Text, StyleSheet,TouchableOpacity, Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements'
import { Picker } from '@react-native-picker/picker';

const CardFont = (props) => {

    const [fonts, setFonts] = useState('Champagne')
    const [bold, setBoldFont] = useState(false)
    const [italic, setItalicFont] = useState(false)

    function underline()
    {
        if(props.underline==='underline')
        {
            var temp2 = props.undo  
            var temp = {
                underline:'none',
            }
            temp2.push(temp)
            props.setUndoLength(props.undoLength+1)
            props.setUndo(temp2)
            props.setUnderLine('none')
        }
        else{
            var temp2 = props.undo  
            var temp = {
                underline:'underline',
            }
            temp2.push(temp)
            props.setUndoLength(props.undoLength+1)
            props.setUndo(temp2)
            props.setUnderLine('underline')
        }
    }

    function setBold()
    {
        var val = fonts
        if(italic && !bold)
        {
            val = fonts+"-BoldItalic"
            props.setFonts(val)
            setBoldFont(true)
        }
        else if(!bold)
        {
            val = fonts+"-Bold"
            props.setFonts(val)
            setBoldFont(true)
        }
        else if(italic && bold)
        {
            val = fonts+"-Italic"
            props.setFonts(val)
            setBoldFont(false)
        }
        else{
            props.setFonts(fonts)
            setBoldFont(false)
        }
        var temp2 = props.undo  
            var temp = {
                fonts:val,
            }
            temp2.push(temp)
            props.setUndoLength(props.undoLength+1)
            props.setUndo(temp2)
        
    }

    function setItalic()
    {
        var val = fonts
        if(!italic && bold)
        {
            val = fonts+"-BoldItalic"
            props.setFonts(val)
            setItalicFont(true)
        }
        else if(!italic)
        {
            val = fonts+"-Italic"
            props.setFonts(val)
            setItalicFont(true)
        }
        else if(italic && bold)
        {
            val = fonts+"-Bold"
            props.setFonts(val)
            setItalicFont(false)
        }
        else{
            props.setFonts(fonts)
            setItalicFont(false)
        }
        var temp2 = props.undo  
            var temp = {
                fonts:val,
            }
            temp2.push(temp)
            props.setUndoLength(props.undoLength+1)
            props.setUndo(temp2)
        
    }

      return (
          <>
        <View style={styles.container}>
            <View style={{flex:1}}>
                <Text style={styles.header}>Select Font</Text>
                <View style={{borderWidth:1,flexDirection:'row', justifyContent:'space-between', alignItems:'center' ,borderColor:'black', borderRadius:2, margin:10,paddingHorizontal:10, width:"90%"}}>
                    <Picker
                        style={{height: 50, width: "100%"}}
                        selectedValue={fonts}
                        onValueChange={(val)=>{
                            setFonts(val)
                            props.setFonts(val)
                            var temp2 = props.undo
                                    var temp = {
                                        fonts:val,
                                    }
                                    if(props.undoLength>1)
                                    {
                                        if(temp2[props.undoLength-1].fonts!==temp.fonts)
                                        {
                                    temp2.push(temp)
                                    props.setUndoLength(props.undoLength+1)
                                    props.setUndo(temp2)
                                        }
                                    }
                                    
                        }}
                        >
                        <Picker.Item label="Alex Brush" value="AlexBrush" />
                        <Picker.Item label="Bakery" value="bakery" />
                        <Picker.Item label="Box Spagethy" value="BoxSpagethy" />
                        <Picker.Item label="Champagne" value="Champagne" />
                        <Picker.Item label="Chocolate Covered Raindrops" value="ChocolateCoveredRaindrops" />
                        <Picker.Item label="Chopin Script" value="ChopinScript" />
                        <Picker.Item label="Emilisa" value="Emillisa" />
                        <Picker.Item label="Europe Underground" value="EuropeUnderground" />
                        <Picker.Item label="Miss Nelly" value="MissNelly" />
                        <Picker.Item label="Rubellas" value="Rubellas" />
                        <Picker.Item label="Theano Didot" value="TheanoDidot" />
                        <Picker.Item label="Wow Darling" value="WowDarling" />
                    </Picker>
                </View>
                <View style={{paddingTop:10}}> 
                <Text style={styles.header}>Size</Text>
                <View style={{borderWidth:1, borderColor:'black', borderRadius:2, margin:10,width:85,paddingHorizontal:10,}}>
                    <TextInput 
                        placeholder="12" 
                        value={props.fontSize} 
                        onChangeText={(val) => {
                            if(val)
                            {
                                props.setFontSize(parseInt(val))
                                    
                            }
                                
                        }}
                        onSubmitEditing = {(value)=>{
                            var val = value.nativeEvent.text
                            var temp2 = props.undo
                                    var temp = {
                                        fontSize:val,
                                    }
                                    temp2.push(temp)
                                    props.setUndoLength(props.undoLength+1)
                                    props.setUndo(temp2)
                                console.log(props.undo)
                        }}
                        keyboardType = 'numeric'
                        />
                </View>
                </View>
            </View>
            <View style={{flex:1, paddingLeft:15}}>
                <Text style={styles.header}>Style</Text>
                <View style={styles.items}>
                <TouchableOpacity onPress={()=>{setBold()}}>
                <Image source={require('../../assets/bold.png')} style={styles.image_icon}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{setItalic()}}>
                    <Image source={require('../../assets/italic.png')} style={styles.image_icon}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{underline()}}>
                    <Image source={require('../../assets/underline-2.png')} style={styles.image_icon}/>
                    </TouchableOpacity>
                </View>
                <Text style={styles.header}>Align</Text>
                <View style={styles.items}>
                    <TouchableOpacity onPress={()=>{setTool(4)}}>
                        <Icon
                            size={20}
                            raised
                            name='align-left'
                            type='feather' 
                            color="black"/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{setTool(4)}}>
                        <Icon
                            size={20}
                            raised
                            name='align-right'
                            type='feather' 
                            color="black"/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{setTool(4)}}>
                        <Icon
                            size={20}
                            raised
                            name='align-center'
                            type='feather' 
                            color="black"/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </>
      );
    };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row',
    justifyContent:'flex-start',
    padding:15,
  },
  items:{
      flex:1,
      flexDirection:'row'
  },
  header:{
      fontSize:18,
      color:'#898989',
      paddingHorizontal:10
  },
  images:{
    height:70, 
    width:70,
    marginHorizontal:10,
    marginTop:10,
  },
  image_icon:{
      height:25,
      width:25,
      marginTop:25,
      margin:5
  }
});

export default CardFont;