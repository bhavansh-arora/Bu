import React,{useState, useEffect} from 'react'
import {View,Text,StyleSheet,TouchableOpacity,ScrollView, Platform} from 'react-native'
import Template_header from '../../components/Template_header'
import CardDynamic from '../../components/CardDynamic'
import AsyncStorage from '@react-native-community/async-storage'
import Modal from 'react-native-modal'
import CardDesign from './cardDesign'
import CardFont from './CardFont'
import CardAlign from './CardAlign'
import { Icon } from 'react-native-elements'
import { Image } from 'react-native'
import CardColorPicker from './CardColorPicker'
import {launchImageLibrary} from 'react-native-image-picker';
import { add } from 'react-native-reanimated'
import qs from 'qs'
import {update_data} from '../../action/login-registration';
import {useDispatch, connect} from 'react-redux';
import Loader from '../../components/Loader'
import CardDynamicBack from '../../components/CardDynamicBack'

function BuiltDesign({navigation,...props}) {



    const {
        update_data
    } = props


    const [number,setNumber] = useState(1)
    const [fileUri, setFileUri] = useState('')
    const [address, setAddress] = useState('')
    const [linkedin, setLinkedin] = useState('')
    const [facebook, setFacebook] = useState('')
    const [instagram, setInstagram] = useState('')
    const [website, setWebsite] = useState('')
    const [position, setPosition] = useState('')
    const [email, setEmail] = useState('');
    const [isVisible, setIsVisible]= useState(false)
    const [cardType, setCardType] = useState(-1)
    const [color, setColor] = useState([])
    const [leng, setLength] = useState(0)
    const [tool, setTool] = useState(1)
    const [fontColor, setFontColor] = useState('black')
    const [fontSize, setFontSize] = useState(12)
    const [fontFamily, setFontFamily] = useState('Champagne')
    const [profileModal, setProfileModal] = useState(false)
    const [profilePhoto, setProfilePhoto] = useState('')
    const [background, setBackground] = useState('')
    const [undo, setUndo] = useState([])
    const [undoLength, setUndoLength] = useState(0)
    const [underline, setUnderLine] = useState('none')
    const [redo, setRedo] = useState([])
    const [redoLength, setRedoLength] = useState(0)
    const [name,setName] = useState('')
    const [phone, setPhone] = useState('')
    const [makingCall, setMakingCall] = useState(false)
    const [backSide, setBackSide] = useState(false)
    const [backBackground, setBackBackground] = useState("")

    async function setColorCode()
    {
        const cc = JSON.parse(await AsyncStorage.getItem('cardType'))
        if(cc)
        {
            fetch('https://api-buca.herokuapp.com/template', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          })
            .then((response) => response.json()) //If response is in json then in success
            .then((responseJson) => {
              //  dispatch({type:"SET_INVISIBLE"})
              //alert(responseJson.path);
              const data =[]
              for(let i=0;i<responseJson[cc].templates.length;i++)
                data.push(responseJson[cc].templates[i].colorCode)
            setColor(data)
            setLength(responseJson[cc].templates.length)
            })
            .catch((error) => {
              //dispatch({type:"SET_INVISIBLE"})
              console.log(error);
            });
        }
    }

    const retrieveData = async () =>{
        try{

            const file = await AsyncStorage.getItem('fileUri')
            if(file)
                setFileUri(file)
            const bg= await AsyncStorage.getItem('background')
            if(await AsyncStorage.getItem('email'))
                setEmail(await AsyncStorage.getItem('email'))
            if (bg !== null) {
                var test = {
                    uri: bg
                }
                setBackground(test)
                const add = await AsyncStorage.getItem('address')
                const pos = await AsyncStorage.getItem('position')
                const web = await AsyncStorage.getItem('websitelink')
                const inst = await AsyncStorage.getItem('instagramid')
                const fb = await AsyncStorage.getItem('facebookid')
                const lkid = await AsyncStorage.getItem('linkedinid')
                const pfp = JSON.parse(await AsyncStorage.getItem('profilepicture'))
                const cc = JSON.parse(await AsyncStorage.getItem('cardType'))
                const num = JSON.parse(await AsyncStorage.getItem('value'))
                const fontC = await AsyncStorage.getItem('fontColor')
                const fontF = await AsyncStorage.getItem('fontFamily')
                const under = await AsyncStorage.getItem('underline')
                const fontS = JSON.parse(await AsyncStorage.getItem('fontSize'))
                if(cc)
                    setCardType(cc)
                if(num)
                    setNumber(num)
                if(fontC)
                    setFontColor(fontC)
                if(web)
                    setWebsite(web)
                if(fontF)
                    setFontFamily(fontF)
                if(under)
                    setUnderLine(under)
                if(fontS)
                    setFontSize(fontS)
                if(inst)
                    setInstagram(inst)
                if(fb)
                    setFacebook(fb)
                if(lkid)
                    setLinkedin(lkid)
                if(add)
                    setAddress(add)
                if(pos)
                    setPosition(pos)
                if(pfp)
                    setProfilePhoto(pfp)
                if(await AsyncStorage.getItem('name'))
                    setName(await AsyncStorage.getItem('name'));
                if(await AsyncStorage.getItem('phone'))
                    setPhone(await AsyncStorage.getItem('phone'))
            }
        }
        catch(e){
            console.log(e)
        }

    }

        useEffect(() => {
        setColorCode()
        retrieveData()
    },[])

    const chooseProfilePhoto = async () => {
        console.log("choose")
        let options = {
          title: 'Select Image',
          customButtons: [
            { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
          ],
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        launchImageLibrary(options, async (response) => {
          //console.log('Response = ', response);

          if (response.didCancel) {
            console.log('User cancelled image picker');
            console.log("STORING")
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
          } else {
            //console.log('response', JSON.stringify(response));
            setProfilePhoto(response)
          }
        });
      }

      const chooseBackground = async () => {
        let options = {
          title: 'Select Image',
          customButtons: [
            { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
          ],
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        launchImageLibrary(options, async (response) => {
          //console.log('Response = ', response);

          if (response.didCancel) {
            console.log('User cancelled image picker');
            console.log("STORING")
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
          } else {
            //console.log('response', JSON.stringify(response));
            if(backSide)
                setBackBackground(response)
            else
                setBackground(response)
          }
        });
      }

    function make_api_call()
    {
        setMakingCall(true)
        setIsVisible(false)
        storeData()
        const axios = require('axios')
        if(email)
        //alert("called")
        {
            var u = false
            var temp = {
                name: profilePhoto.fileName,
                type: profilePhoto.type,
                uri:
                  Platform.OS === "android" ? profilePhoto.uri : profilePhoto.uri.replace("file://", "")
            }
            var temp2 = {
                name: background.fileName,
                type: background.type,
                uri:
                  Platform.OS === "android" ? background.uri : background.uri.replace("file://", "")
            }
            if(underline=='underline')
                u = true
            const data = {
                position:"position",
                address:address,
                linkedInId:linkedin,
                facebookId:facebook,
                websiteLink:website,
                instagramid:instagram,
                cardType:number,
                backgroundUrl:JSON.stringify(temp2),
                profileImage:JSON.stringify(temp),
                frontFontFamily:fontFamily,
                frontFontSize:fontSize,
                cardCreated:true,
                frontFontColor:fontColor,
                frontFontUnderline:u
            }
            const data2 = {
                position:"position",
                address:address,
                linkedInId:linkedin,
                facebookId:facebook,
                websiteLink:website,
                instagramid:instagram,
                cardType:number,
                backgroundUrl:JSON.stringify(temp2),
                profileImage:JSON.stringify(temp),
                frontFontFamily:fontFamily,
                frontFontSize:fontSize,
                cardCreated:true,
                frontFontColor:fontColor,
                frontFontUnderline:u,
                name:name,
                phone:phone,
                email:email,
            }
            update_data(data2)
            const url = 'https://api-buca.herokuapp.com/updateprofile/'+email
            try{
            axios({
                method:'POST',
                url:url,
                data:qs.stringify(data),
                headers:{
                    'content-type':'application/x-www-form-urlencoded;charset=utf-8'
                }
            }).then((res)=>{
                navigation.navigate('Design_buca_last')
                setMakingCall(false)
            })
        }catch(e){
            console.log(e)
            setMakingCall(false)
        }


    }
}

    async function storeData()
    {
        if(number)
            await AsyncStorage.setItem('value', JSON.stringify(number))
        if(address)
            await AsyncStorage.setItem('address', address)
        if(position)
            await AsyncStorage.setItem('position', position)
        if(fontColor)
            await AsyncStorage.setItem('fontColor', fontColor)
        if(fontSize)
            await AsyncStorage.setItem('fontSize', JSON.stringify(fontSize))
        if(fontFamily)
            await AsyncStorage.setItem('fontFamily', fontFamily)
        if(underline)
            await AsyncStorage.setItem('underline', underline)
        if(profilePhoto)
            await AsyncStorage.setItem('profilepicture', JSON.stringify(profilePhoto))
        console.log(background.uri)
        await AsyncStorage.setItem('background', background.uri)
    }

    function getColorsPath(num)
    {
        fetch('https://api-buca.herokuapp.com/template', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
        .then((response) => response.json()) //If response is in json then in success
        .then((responseJson) => {
          //  dispatch({type:"SET_INVISIBLE"})
          //alert(responseJson.path);
          var temp = {
              uri: (responseJson[cardType].templates[num].path)
          }
          setBackground(temp)
        })
        .catch((error) => {
          //dispatch({type:"SET_INVISIBLE"})
          console.log(error);
        });
    }
    function renderColor()
    {
        return [...Array(leng)].map((elementInArray, index) => (
            <TouchableOpacity onPress={() => getColorsPath(index)}>
                <View style={{
                    height:30,
                    width:30,
                    backgroundColor:color[index],
                    margin:7,
                    alignSelf:"center",
                    borderRadius:20}} />
            </TouchableOpacity>))
    }

    function undoThePrev()
    {
        if(undoLength>1)
        {
            if(undo[undoLength-2].fontSize)
                setFontSize(parseInt(undo[undoLength-2].fontSize))
            if(undo[undoLength-2].fonts)
                setFontFamily(undo[undoLength-2].fonts)
            if(undo[undoLength-2].fontColor)
                setFontColor(undo[undoLength-2].fontColor)
            if(undo[undoLength-2].underline)
                setUnderLine(undo[undoLength-2].underline)

                var temp = undo
                var tempR = redo
                var tempL = undo[undoLength-1]
                tempR.push(tempL)
                setRedo(tempR)
                setRedoLength(redoLength+1)
                temp.pop()
                setUndo(temp)
                setUndoLength(undoLength-1)
        }
        else{
            console.log("Nothing to undo")
        }
    }

    function redoThePrev()
    {
        if(redoLength>1)
        {
            if(redo[redoLength-2].fontSize)
                setFontSize(parseInt(redo[redoLength-2].fontSize))
            if(redo[redoLength-2].fonts)
                setFontFamily(redo[redoLength-2].fonts)
            if(redo[redoLength-2].fontColor)
                setFontColor(redo[redoLength-2].fontColor)
            if(redo[redoLength-2].underline)
                setUnderLine(redo[redoLength-2].underline)

                var temp = redo
                temp.pop()
                setRedo(temp)
                setRedoLength(redoLength-1)
                //console.log(redo)
        }
        else{
            console.log("Nothing to redo")
        }
    }

    function renderCard()
    {
        if(backSide)
        {
            return(<CardDynamicBack
                image_size="60"
                        svg_width="12"
                        svg_width_pin="14"
                        value={number}
                        big={true}
                        address={address}
                        position={position}
                        fontColor = {fontColor}
                        fontSize = {fontSize}
                        fontFamily = {fontFamily}
                        underline = {underline}
                        profilePhoto = {profilePhoto.uri}
                        bg = {backBackground.uri}
                        name={name}
                        phone={phone}
                        email={email}
            />)
        }
        return <CardDynamic
                        image_size="60"
                        svg_width="12"
                        svg_width_pin="14"
                        value={number}
                        big={true}
                        address={address}
                        position={position}
                        fontColor = {fontColor}
                        fontSize = {fontSize}
                        fontFamily = {fontFamily}
                        underline = {underline}
                        profilePhoto = {profilePhoto.uri}
                        bg = {background.uri}
                        name={name}
                        phone={phone}
                        email={email}
                        />
    }

    function renderToolbar()
    {
        return(
            <>
            <View style={{flex:1, flexDirection:'row', shadowColor:'#898989', shadowRadius:23, paddingHorizontal:15}}>
                <TouchableOpacity onPress={()=>{setTool(1)}} style={{flex:1}}>
                    <Image source={require('../../assets/grid.png')} style={styles.image_icon}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{setTool(2)}} style={{flex:1}}>
                    <Image source={require('../../assets/text-2.png')} style={styles.image_icon}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{setTool(3)}} style={{flex:1}}>
                    <Image source={require('../../assets/palette.png')} style={styles.image_icon}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{setTool(4)}} style={{flex:1}}>
                    <Image source={require('../../assets/text-3.png')} style={styles.image_icon}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{undoThePrev()}} style={{flex:1}}>
                    <Image source={require('../../assets/undo.png')} style={styles.image_icon2}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{redoThePrev()}} style={{flex:1}}>
                <Image source={require('../../assets/redo.png')} style={styles.image_icon2}/>
                </TouchableOpacity>
            </View>
            </>
        )
    }

    function renderDesignParts()
    {
        switch(tool)
        {
            case 1: return(<CardDesign setNumber={setNumber} number={number}/>)
            case 2: return (<CardFont
                                setFontSize = {setFontSize}
                                fontSize = {fontSize}
                                fonts = {fontFamily}
                                setFonts = {setFontFamily}
                                setUndo = {setUndo}
                                undo = {undo}
                                setUndoLength = {setUndoLength}
                                undoLength = {undoLength}
                                underline = {underline}
                                setUnderLine = {setUnderLine}
                                />)
            case 3: return(<CardColorPicker
                                setColor={setFontColor}
                                setUndo = {setUndo}
                                undo = {undo}
                                setUndoLength = {setUndoLength}
                                undoLength = {undoLength}
                                />)
            case 4: return(<CardAlign/>)
            default: return(<View></View>)
        }
    }

    return (
        <>
        <Loader loading={makingCall}/>
       <View style={styles.container}>
        <Template_header title="Built Your Design" redirectTo="Choose"/>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.card_container1}>
                    <TouchableOpacity style={{width:"45%",display:"flex"}} onPress={()=>setBackSide(false)}>
                        <View style={(!backSide)?styles.card_selected:styles.card}></View>
                        <Text style={styles.card_front_backs}>Front</Text>
                    </TouchableOpacity>
                   
                </View>
            <View style={styles.card_container}>
                <View style={{width:"90%"}}>
                    {renderCard()}
                </View>
                <Text style={styles.choose_text}>Choose Colors</Text>
                <ScrollView horizontal>
                <View style={styles.color_picker_container}>
                    {renderColor()}
                </View>
                </ScrollView>
            </View>
            {renderToolbar()}
            {renderDesignParts()}
        </ScrollView>
       </View>
            <TouchableOpacity style={{height:50, width:50, backgroundColor:'#00bd89', position:'absolute', flex:0, borderRadius:50, bottom:115, right:25, justifyContent:'center'}}  onPress={() => setProfileModal(true)}>
                <View >
                <Icon
                            size={28}
                            name='plus'
                            type='feather'
                            color="white"/>
                </View>
            </TouchableOpacity>
            <View style={{alignItems:'center'}}>
                <Modal isVisible={profileModal} style={{height:100}} coverScreen={true} >
                    <View style={{ backgroundColor:'#FFF', borderRadius:15, alignItems:'center', height:350, width:"100%",margin:0}}>
                        <Text style={{fontSize:25, fontWeight:'bold', paddingTop:45, textAlign:'center'}}>Choose an image</Text>
                        <View style={{ justifyContent:'space-around', paddingTop:10, flex:2, width:"100%",flexDirection:'row'}}>
                             <TouchableOpacity
                                onPress={() => chooseBackground()}
                                style={{marginTop:'2%'}}>
                                <View style={{justifyContent:'center', alignContent:'center', margin:35}}>
                                <Image source={require('../../assets/picture.png')} style={{height:80, width:80}}/>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => chooseProfilePhoto()}
                                style={{marginTop:'2%'}}>
                                 <View style={{justifyContent:'center', alignContent:'center', margin:35}}>
                                <Image source={require('../../assets/user.png')} style={{height:80, width:80}}/>
                                </View>
                            </TouchableOpacity>
                            </View>
                        <View style={{ justifyContent:'space-around', paddingTop:10, flex:1, width:"100%",flexDirection:'row'}}>
                            <TouchableOpacity
                                onPress={() => setProfileModal(false)}
                                style={{marginTop:'2%', position:'absolute', right:20}}>
                                <View style={styles.save_button}>
                                <Text style={styles.button_text}>Done</Text>
                                </View>
                            </TouchableOpacity>
                            </View>
                    </View>
                </Modal>
           </View>
       <View style={styles.bottom_bar}>
           <View style={{alignItems:'center'}}>
                <Modal isVisible={isVisible} style={{height:100}} coverScreen={true}>
                    <View style={{ backgroundColor:'#FFF', borderRadius:15, alignItems:'center', height:300, width:"100%",margin:0}}>
                        <Text style={{fontSize:25, fontWeight:'bold', paddingTop:45, textAlign:'center'}}>Are you sure you want to save changes?</Text>
                        <View style={{ justifyContent:'space-around', paddingTop:10, flex:1, width:"100%",}}>
                            <TouchableOpacity
                                onPress={() => make_api_call()}
                                style={{marginTop:'2%'}}>
                                <View style={styles.save_button}>
                                <Text style={styles.button_text}>Yes, I want to change it</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setIsVisible(false)}
                                style={{marginTop:'2%'}}>
                                <View style={styles.dont_save_button}>
                                <Text style={styles.button_text}>No, I don't want to change it</Text>
                                </View>
                            </TouchableOpacity>
                            </View>
                    </View>
                </Modal>
           </View>
            <TouchableOpacity  style={styles.touchable_login}  onPress={() => setIsVisible(true)}>
                <View style={styles.buuton_login}>
                    <Text style={styles.button_text}>Confirm</Text>
                </View>
            </TouchableOpacity>
        </View>
        </>

    )
}

const mapStateToProps = (state) => {
    return {
      _id: state.loginReg._id || '',
    };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
        update_data: (data) => {
            dispatch(update_data(data));
          },
    };
  };

  export default connect(mapStateToProps, mapDispatchToProps)(BuiltDesign);

const styles = StyleSheet.create({
    container:{
        flex:1,
        display:"flex",
        backgroundColor:"#fff",
    },
    card_container:{
        backgroundColor:"#f9f9f9",
        alignItems:"center",
        paddingTop:10,
    },
    card_container1:{
       flexDirection:"row",
       justifyContent:'center',
       width:"100%",
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
        height:42,
        paddingTop:15

    },
    bottom_bar:{
        backgroundColor:"#fff",
        height:100,
        shadowColor: '#bdbdbd',
       borderColor:"#bdbdbd",
       shadowOffset: { height: 0 },
    shadowColor: '#bdbdbd',
    shadowOpacity: 20,
    elevation: 5,
    },
    choose_text:{
        fontSize:20
    },
    color_picker_container:{
        flexDirection:"row"
    },
    header:{
        fontSize:17,
    color:"#2d2d2d",
    fontWeight:"bold",
    paddingTop:20,
    marginHorizontal:"5%"
    },
    card:{
    width:"90%",
    margin:13,
    backgroundColor:"#fff",
    height:70,
    borderRadius:5,
      shadowColor: '#bdbdbd',
      shadowOpacity: 1,
      elevation: 20,
    shadowOffset:{
        width:2,height:2
    },borderColor:"#fff",
    borderWidth:2,
    borderWidth:1,
    },
     card_selected:{
         width:"90%",
    backgroundColor:"#fff",
    height:70,
    borderRadius:5,
      shadowColor: '#bdbdbd',
      shadowOpacity: 1,
      elevation: 20,
    shadowOffset:{
        width:2,height:2
    },borderColor:"#fff",
    borderWidth:2,
    flexDirection:"row",
    margin:13,
    borderWidth:1,
    borderColor:"#00bd84"
    },

    save_button:{
        backgroundColor:'#0D8',
        borderRadius: 5,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
        padding:25,
        flex:1,
        margin:15,

      },
      dont_save_button:{
        backgroundColor:'#898989',
        borderRadius: 5,
        height: 102,
        padding:25,
        marginTop:10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom:25,
        flex:1,
        margin:15,
      },
      button_text:
      {
          fontSize:20,
          fontWeight:'200',
          color:'#FFF'
      },
      card_front_backs:{
          fontSize:18,
          color:'black',
          textAlign:'center',
          fontWeight:'bold',
          padding:10,
      },
      image_icon:{
          height:25,
          width:25,
          margin:15,
          alignSelf:'center'
      },
      image_icon2:{
        height:25,
        width:25,
        margin:15,
        alignSelf:'center'
    }
})
