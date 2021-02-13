import React from 'react';
import {
    SliderHuePicker,
    SliderSaturationPicker,
    SliderValuePicker,
} from 'react-native-slider-color-picker';
import {
    AppRegistry,
    Dimensions,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import tinycolor from 'tinycolor2';
 
const {
    width,
} = Dimensions.get('window');
 
export default class SliderColorPickerExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oldColor: "#FF7700",
        };
    }
 
    changeColor = (colorHsvOrRgb, resType) => {
        //console.log(tinycolor(colorHsvOrRgb).toHexString())
        this.props.onChangeColor(tinycolor(colorHsvOrRgb).toHexString())
        var temp2 = this.props.undo
        var temp = {
            fontColor:tinycolor(colorHsvOrRgb).toHexString(),
        }
        temp2.push(temp)
        this.props.setUndoLength(this.props.undoLength+1)
        this.props.setUndo(temp2)
        if (resType === 'end') {
            this.setState({
                oldColor: tinycolor(colorHsvOrRgb).toHexString(),
            });
        }
    }
 
    render() {
        const {
            oldColor,
        } = this.state;
 
        return (
            <View style={styles.container}>
                <View style={{marginHorizontal: 24, marginTop: 20, height: 12, width: width - 48}}>
                    <SliderHuePicker
                        ref={view => {this.sliderHuePicker = view;}}
                        oldColor={oldColor}
                        trackStyle={[{height: 12, width: width - 48}]}
                        thumbStyle={styles.thumb}
                        useNativeDriver={true}
                        onColorChange={this.changeColor}
                    />
                </View>
                <View style={{marginHorizontal: 24, marginTop: 20, height: 12, width: width - 48}}>
                    <SliderSaturationPicker
                        ref={view => {this.sliderSaturationPicker = view;}}
                        oldColor={oldColor}
                        trackStyle={[{height: 12, width: width - 48}]}
                        thumbStyle={styles.thumb}
                        useNativeDriver={true}
                        onColorChange={this.changeColor}
                        style={{height: 12, borderRadius: 6, backgroundColor: tinycolor({h: tinycolor(oldColor).toHsv().h, s: 1, v: 1}).toHexString()}}
                    />
                </View>
                <View style={{marginHorizontal: 24, marginTop: 20, height: 12, width: width - 48}}>
                    <SliderValuePicker
                        ref={view => {this.sliderValuePicker = view;}}
                        oldColor={oldColor}
                        minimumValue={0.02}
                        step={0.05}
                        trackStyle={[{height: 12, width: width - 48}]}
                        trackImage={require('react-native-slider-color-picker/brightness_mask.png')}
                        thumbStyle={styles.thumb}
                        onColorChange={this.changeColor}
                        style={{height: 12, borderRadius: 6, backgroundColor: 'black'}}
                    />
                </View>
            </View>
        );
    }
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
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
});
