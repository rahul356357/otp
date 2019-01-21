import React from 'react';
import { View, Text} from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';
const URL = 'https://us-central1-one-time-password-55947.cloudfunctions.net';
export default class SignUpForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            phone:'',
            error:false
        }
    }
    handleSubmit = async () => {
        try {
            const { phone } = this.state;
            await axios.post(`${URL}/createUser`, { phone });
            await axios.post(`${URL}/requestOneTimePassword`, { phone });
            this.setState({error:false, phone:''})
        } catch (error) {
            console.log(error)
            this.setState({error:true})
      }
    }

    render() {
        return (
            <View>
                <View>
                <FormLabel>Input Phone Number</FormLabel>
                <FormInput  onChangeText={(phone)=>this.setState({phone:phone})} value={this.state.phone} /> 
                </View>
                <View style={{marginLeft:10}}>
                    { this.state.error ? <Text>Error Occured</Text>:<Text>No Error</Text>}
                </View>
                <Button title="Submit Signup" onPress={this.handleSubmit}  backgroundColor="#3ade"></Button>
            </View>
        )
    }
}