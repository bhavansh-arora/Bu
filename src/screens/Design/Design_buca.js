import React,{useState} from 'react'
import {View,StyleSheet,TextInput,TouchableOpacity,Text,SafeAreaView,ScrollView,StatusBar} from 'react-native'
import Header from '../../components/Design_header'
import Card from '../../components/Card'
import Input_header from '../../components/Input_header'
import DropDownPicker from 'react-native-dropdown-picker';
import SvgUri from 'react-native-svg-uri';


function Design_buca({navigation}) {
   const [profile,setProfile] = useState(null)
   const [industry,setIndustry] = useState(null)
    return (
       <SafeAreaView style={styles.container}>
              <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#ffffff"
        translucent={false}
      />
<Header title="Design Your buca" />
<ScrollView showsVerticalScrollIndicator={false} style={{padding:0,flex:1,height:"100%",display:"flex",backgroundColor:"#fff",marginTop:10}}>
<View style={{alignItems:"center"}}>
<Card image_size="60" svg_width="10" svg_width_pin="12" value={1} big={true} position={"Business Waala"} address={"jninhnnnhnhnjnhjhjn"} mail={"abc@gmail.com"} name={"bhavansh"} phone={"+929238"}/>


<Input_header header="Industry" />
<View style={{width:"100%",borderWidth:0,backgroundColor:"#fff",zIndex:2}}>
<DropDownPicker
    items={[
        {label: 'Food & Beverage', value: 'food'},
        {label: 'Education', value: 'education'},
    ]}

    defaultValue={industry}
    containerStyle={{height: 42,marginTop:7,borderColor:"#bdbdbd"}}
    style={{backgroundColor: '#fff',width:"90%",marginLeft:"5%",borderWidth:2,borderColor:"#bdbdbd"}}
    itemStyle={{
        justifyContent: 'flex-start',
    }}
    dropDownStyle={{backgroundColor: '#fff',width:"90%",marginLeft:"5%",borderColor:"#bdbdbd",borderWidth:1,zIndex:2}}
    multiple={false}
        onChangeItem={item => setIndustry(item.value)}

/>
</View>


<Input_header header="Position" />
<TextInput
        autoCapitalize="none"
          style={styles.password_input_style}
        />
        
       
<View style={{display:"flex",flex:1,width:"100%",height:"100%"}}>

<TouchableOpacity  style={styles.touchable_login} onPress={() => navigation.navigate("Design")}>
          <View style={styles.buuton_login}>
            <Text style={styles.button_text}>Next</Text>
          </View>
        </TouchableOpacity> 
        </View>
        </View>
        </ScrollView>
       </SafeAreaView>
    )
}

export default Design_buca
const styles=StyleSheet.create({
    container:{
        flex:1,
        display:"flex",
        height:"100%",
        backgroundColor:"#fff"
    },
    footer:{
        flex:2,
        display:"flex",
        alignItems:"center",
       // height:"100%",
        marginTop:10,
        
    
    },
    password_input_style: {
        borderWidth: 2,
        borderColor: '#BDBDBD',
        height: 42,
        borderRadius: 5,
        paddingLeft: 10,
        marginTop: 7,
        fontSize: 17,
        width:"90%",
      },
      buuton_login: {
        backgroundColor: '#00bd84',
        borderRadius: 5,
        height: 42,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal:"5%"
      },
      button_text: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 17,
      },
      touchable_login:{
          display:"flex",
        paddingTop:15,
        marginTop:"7%",
flex:1,
       
    },
    text:{
        color:"#00bd84",
        fontSize:17,
        fontWeight:"bold",
        paddingRight:10,
    }
})
