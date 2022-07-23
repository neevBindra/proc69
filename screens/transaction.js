import React, {Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';


export default class TransactionScreen extends Component{
    constructor(props)
    {
        super(props);
        
        this.state = {
            domState:"normal",
            hasCameraPermission:null,
            scanned:false,
            scannedData:""
        }
    }
    // domState value will get from line 35
    getCameraPermission = async domState => {

        const{status}= await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            // status === "granted" is true only when user has granted permission and vice-versa
            hasCameraPermission: status === "granted",
            scanned:false,
            domState:domState
        })
    }

    handleBarCodeScanned = async({type,data})=>{
        this.setState({
            scannedData:data,
            domState:"normal",
            scanned:true
        })
    }
    render(){
        const {domState,hasCameraPermission,scannedData,scanned} = this.state
        if(domState === "scanner"){
            return(
                    <BarCodeScanner>
                        onBarCodeScanned = {scanned ? undefined :this.handleBarCodeScanned}
                    </BarCodeScanner>
            )
        }
        return(
           <View style={styles.container}>
            <Text style={styles.text}>
                {hasCameraPermission ? scannedData : "request for camera permission"}
            </Text>

           <TouchableOpacity styles={styles.button}
           onPress={()=> this.getCameraPermission("scanner")}> 
        
                <Text styles={styles.buttonText}>Scan QR code</Text>
           </TouchableOpacity>
           </View> 
        );
    }
}

const styles = StyleSheet.create({

    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#5653D4'
    },
    text:{
        color:'#FFFFFF',
        fontSize:30
    },
    button:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#FA452',
        width:"43%",
        height:55,
        borderRadius:15,

    },
    buttonText:{
        fontSize:24,
        color:"#FFFFFF",
    }
})