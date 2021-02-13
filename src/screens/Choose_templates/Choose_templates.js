import React,{useState} from 'react'
import {StyleSheet,View,ScrollView,Text,TouchableOpacity,TextInput,Image,ImageBackground} from 'react-native'
import Template_header from '../../components/Template_header'
import Card from '../../components/Card'
import CreateDesign from '../../components/CreateDesign'
import Input_header from '../../components/Input_header'
import { Icon } from 'react-native-elements'

function Choose_templates({navigation}) {
    const [email, setEmai] = useState('')
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          // do something
          navigation.navigate("Choose")
        });



        return unsubscribe;
      }, [navigation]);
    return (
        <View style={styles.container}>
        <View style={styles.container}>
<Template_header title="Choose Template" redirectTo="Design"/>

<ScrollView>
<ScrollView horizontal>
    <View style={{flexDirection:'row', flex:1}}>
        <View style={{width:350,marginRight:20}}>
            <ImageBackground style={styles.card_free2} source={require('../../assets/premium-9.png')} imageStyle={{ borderRadius: 5}}/>
        </View>
        <View style={{width:350,marginRight:20 }}>
              <ImageBackground style={styles.card_free2} source={require('../../assets/premium-7.png')} imageStyle={{ borderRadius: 5}}/>
        </View>
        <View style={{width:350,marginRight:20}}>
              <ImageBackground style={styles.card_free2} source={require('../../assets/premium-8.png')} imageStyle={{ borderRadius: 5}}/>
        </View>
        <View style={{width:350,marginRight:20}}>
            <ImageBackground style={styles.card_free2} source={require('../../assets/premium-10.png')} imageStyle={{ borderRadius: 5}}/>
        </View>
    </View>
</ScrollView>
<TouchableOpacity onPress={() => navigation.navigate("Templates")}>
    <View style={{...styles.view, flexDirection:'row'}}>
    <Text style={styles.view}>view more</Text>

        </View>
    </TouchableOpacity>

<Text style={{fontSize:17,
    color:"#2d2d2d",
    fontWeight:"bold",marginHorizontal:10}}>Build your design</Text>
    <View style={{flexDirection:'row'}}>
        <Image source={require('../../assets/digitalize-card.png')} style={{height:200, width:"50%"}}/>
        <View style={{justifyContent:'center', width:"50%",alignItems:"center"}}>
            <Text style={{fontSize:10, fontWeight:'bold', paddingBottom:15}}>Want us to digitalize your card?</Text>
            <TouchableOpacity style={{backgroundColor:'#00bd89', height:25, alignContent:'center', justifyContent:'center', alignItems:'center', borderRadius:5,width:"70%"}}>
                <View>
                    <Text style={{fontSize:12, color:'white'}}>Visit website</Text>
                </View>
            </TouchableOpacity>
        </View>
    </View>
    <View style={styles.input_container}>
    <Text style={{fontWeight:"700"}}>Your Code</Text>
    <View style={{flexDirection:'row', flex:1, }}>
    <TextInput
                autoCapitalize="none"

          placeholder="insert code"
          style={
               styles.password_input_focused

          }
          defaultValue={email}
          onChangeText={(val) => setEmai(val)}

        />
        <TouchableOpacity
        onPress={()=>{
            var temp = axios({
                method:'GET',
                url:'http://api-buca.herokuapp.com/admin/customtemplate',
                data:{
                    email:{email}
                },
                headers:{
                    'content-type':'application/x-www-form-urlencoded;charset=utf-8'
                }
                });
        }}
        style={{
            flex:2, backgroundColor:'#00bd89', height:42,
        height: 42,
        borderRadius: 5,
        paddingLeft: 10,
        marginTop: 5,
        fontSize: 14,
        marginHorizontal:15,
        justifyContent:'center',
        marginBottom:20,}}>
             <Text style={{color:"#fff"}}>Take me</Text>
        </TouchableOpacity>
        </View>

        </View>
        </ScrollView>
        <View style={{height:20}}></View>
        </View>

         </View>
    )

}

export default Choose_templates
const styles=StyleSheet.create({
    container:{
        flex:1,
        display:"flex",
        backgroundColor:"#fff",

    },
    header:{
        fontSize:17,
    color:"#2d2d2d",
    fontWeight:"bold"
    },
    view:{
        color:"#00bd84",
        fontSize:17,
        fontWeight:"500",
        justifyContent:'flex-end',
        alignSelf:'flex-end',
        paddingHorizontal:10,
        marginBottom:5,
        marginTop:5
    },
    password_input_focused: {
        borderWidth: 2,
        borderColor: '#00BD89',
        height: 42,
        borderRadius: 5,
        paddingLeft: 10,
        marginTop: 5,
        fontSize: 14,
        marginBottom:20,
        flex:5,
      },
      input_container:{
          marginHorizontal:"5%",
          paddingTop:10
      },
      card_free2:{
       width:"100%",
       backgroundColor:"#fff",
       height:150,
       marginHorizontal:10,
       borderRadius:5,
       shadowColor: '#bdbdbd',
       shadowOpacity: 1,
       elevation: 20,
       shadowOffset:{
           width:2,height:2
       },
       borderColor:"#fff",
       marginTop:20,
       flexDirection:"row",
       marginBottom:20,
       },
})
/* <Card image_size="30" svg_width="8" svg_width_pin="10" />
<Card image_size="30" svg_width="8" svg_width_pin="10" value={3} big={false} /> */

/*
    <View style={{flexDirection:"row"}}>
        <View style={{width:"70%"}}>
            <Card image_size="30" svg_width="8" svg_width_pin="10" value={1} big={false} />
        </View>
        <View style={{width:"70%",marginLeft:"5%"}}>
            <Card image_size="30" svg_width="8" svg_width_pin="10" value={2} big={false}  />
        </View>
    </View>

    <View style={{flexDirection:"row"}}>
<View style={{width:"70%"}}>
<Card image_size="30" svg_width="8" svg_width_pin="10" value={3} big={false} />

</View>
<View style={{width:"70%",marginLeft:"5%"}}>
<Card image_size="30" svg_width="8" svg_width_pin="10 " value={4} big={false}/>

</View>
</View>
*/
