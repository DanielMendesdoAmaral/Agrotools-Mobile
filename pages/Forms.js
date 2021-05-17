import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet, View, FlatList, Text, ScrollView, TouchableOpacity, Alert } from "react-native";

import {white, urlApi} from "../utils/constants";

const Item = ({formId, formTitle, authorName, questionsNumber, createdAt, answered, navigation}) => {
    return (
        <View style={styles.form}>
            <Text style={styles.cardTitle}>{formTitle}</Text>
            <Text style={styles.cardInformation}>Autor: {authorName}</Text>
            <Text style={styles.cardInformation}>{questionsNumber} perguntas</Text>
            <Text style={styles.cardInformation}>Criado em {createdAt}</Text>
            {
                answered ? null : <Text style={styles.neverAnswered}>Este form nunca foi respondido</Text>
            }
            <View style={{ width: "100%", alignItems: "center" }}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={
                        answered ?
                        () => {
                            navigation.navigate("Perguntas e respostas", {
                                formId: formId
                            })
                        }
                        :
                        () => {
                            Alert.alert(
                                "Sem respostas",
                                "Esse form ainda não foi respondido"
                            )
                        }
                    }
                >
                    <Text style={styles.buttonText}>Ver perguntas e respostas</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default function Forms({navigation}) {

    const [forms, setForms] = useState([]);

    useEffect(() => {
        list()
    }, []);

    const list = async () => {
        const response = await fetch(`${urlApi}/form/list`);
        const data = await response.json();

        setForms(data.dados)
    }

    const renderItem = ({item}) => {
        return <Item formId={item.formId} formTitle={item.formTitle} authorName={item.authorName} questionsNumber={item.questionsNumber} createdAt={item.createdAt} answered={item.answered} navigation={navigation}/>
    }

    return (
        <>
            <ScrollView>
                <View style={{ alignItems: "center" }}>
                    <View style={styles.container}>
                        <FlatList
                            data={forms}
                            renderItem={renderItem}
                            keyExtractor={item => item.formId}
                            style={{width: "100%"}}
                        />
                    </View>
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "90%"
    },
    button: {
        backgroundColor: '#0069D9',
        padding: 10,
        borderRadius: 6,
        width: "80%",
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: white
    },
    cardInformation: {
        marginVertical: 10
    },
    cardTitle: {
        textAlign: "center", 
        fontWeight: "bold", 
        fontSize: 17.5
    },
    form: {
        width: "100%", 
        height: "auto", 
        borderWidth: 1, 
        borderRadius: 10, 
        borderColor: "#CCC", 
        padding: 15, 
        marginVertical: 10
    },
    neverAnswered: {
        marginVertical: 10,
        color: "red"
    }
});