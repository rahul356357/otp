import React from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';
import firebase from 'firebase';
const URL = 'https://us-central1-one-time-password-55947.cloudfunctions.net';
export default class SignUpForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            phone: '',
            error: false,
            code: ''
        }
    }
    handleSubmit = async () => {
        try {
            const { phone } = this.state;
            let { data } = await axios.post(`${URL}/verifyOneTimePassword`, { phone, code });
            console.log(data)
            firebase.auth().signInWithCustomToken(data.token);
            this.setState({ error: false, phone: '', code: '' })
        } catch (error) {
            console.log(error)
            this.setState({ error: true })
        }
    }

    render() {
        return (
            <View>
                <View>
                    <FormLabel>Input Phone Number</FormLabel>
                    <FormInput onChangeText={(phone) => this.setState({ phone: phone })} value={this.state.phone} />
                </View>
                <View>
                    <FormLabel>Otp Code</FormLabel>
                    <FormInput onChangeText={(c0de) => this.setState({ code })} value={this.state.code} />
                </View>
                <View style={{ marginLeft: 10 }}>
                    {this.state.error ? <Text>Error Occured</Text> : <Text>No Error</Text>}
                </View>
                <Button title="Submit Sign In" onPress={this.handleSubmit} backgroundColor="#3ade"></Button>
            </View>
        )
    }
} 