import { View, Text, ActivityIndicator } from 'react-native'
import ColorPicker from 'react-native-wheel-color-picker'

const ColorPickerComponent = ({formData, setFormData}) => {

    const handleColorChange = (color) => {
        
        if (color !== formData.background.data.color) {
            setFormData({
                ...formData,
                background: {
                    type: "color", 
                    data: { color }
                }
            });
        }
      };

  return (
    <View style={[]}>
            <ColorPicker
                ref={r => { this.picker = r }}
                color={formData.background.data.color}
                swatchesOnly={false}
                onColorChange={handleColorChange}
                thumbSize={35}
                sliderSize={40}
                noSnap={true}
                row={false}
                swatchesLast={true}
                swatches={true}
                discrete={false}
                wheelLodingIndicator={<ActivityIndicator size={40} />}
                sliderLodingIndicator={<ActivityIndicator size={20} />}
                useNativeDriver={true}
                useNativeLayout={true}
            />
    </View>
  )
}

export default ColorPickerComponent