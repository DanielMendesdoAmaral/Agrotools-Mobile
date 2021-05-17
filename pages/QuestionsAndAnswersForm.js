import * as React from 'react';
import { StyleSheet, View, FlatList, Text, ScrollView } from "react-native";
import { useEffect, useState } from 'react';

import { urlApi } from "../utils/constants"

export default function QuestionsAndAnswers({ navigation, route }) {

    const [form, setForm] = useState({});
    const [formId, setFormId] = useState("");

    useEffect(() => {
        setFormId(route.params.formId);
        get();
    });

    const get = () => {
        fetch(`${urlApi}/form/get-questions-and-answers/${formId}`)
            .then(r => r.json())
            .then(d => setForm(d.dados))
    }

    return (
        <>
            <ScrollView>
                <View style={{ alignItems: "center" }}>
                    <View style={styles.container}>
                        {
                            form.questionsAndAnswers?.map(qa => {
                                return (
                                    <>
                                        <Text style={styles.question}>{qa.questionText}</Text>
                                        {
                                            qa.answers.map(a => {
                                                return (
                                                    <View style={styles.answer}>
                                                        <Text style={styles.cardAnswer}>{a.answerText}</Text>
                                                        <Text style={styles.cardInformation}>Autor: {a.authorName}</Text>
                                                        <Text style={styles.cardInformation}>Respondido em {a.answeredAt}</Text>
                                                    </View>
                                                )
                                            })
                                        }
                                    </>
                                )
                            })
                        }
                    </View>
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "90%",
        marginVertical: 50
    },
    cardInformation: {
        marginVertical: 2.5,
        fontSize: 12.5
    },
    cardTitle: {
        textAlign: "center",
        fontWeight: "bold",
    },
    question: {
        fontWeight: "bold",
        fontSize: 17.5
    },
    answer: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#CCC",
        padding: 15,
        marginVertical: 10
    },
    cardAnswer: {
        fontSize: 15,
        marginBottom: 25
    }
});