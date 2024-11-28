'use client'

import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { duration } from 'dayjs';

export default function TeacherSchedule({activeTeacher}:any) {
    return(
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.stripe}>
                    <View style={{ backgroundColor: '#E63312', flex: 1, height: '8px', }}></View>
                    <View style={{ backgroundColor: '#BA2C70', flex: 1, height: '8px', }}></View>
                    <View style={{ backgroundColor: '#650549', flex: 1, height: '8px', }}></View>
                    <View style={{ backgroundColor: '#27348B', flex: 1, height: '8px', }}></View>
                    <View style={{ backgroundColor: '#007D58', flex: 1, height: '8px', }}></View>
                    <View style={{ backgroundColor: '#95C11F', flex: 1, height: '8px', }}></View>
                    <View style={{ backgroundColor: '#F18700', flex: 1, height: '8px', }}></View>
                    <View style={{ backgroundColor: '#FBBA00', flex: 1, height: '8px', }}></View>
                </View>
                <View style={styles.pageTitle}>
                    <Text style={{fontSize: '15px', fontWeight: 'bold', marginBottom: '5px'}} >International House Monterrey</Text>
                    <Text style={{fontSize: '12px', color: '#616C72', marginBottom: '30px'}}>Active Groups | Felipe López</Text>
                </View>
                
                <View style={styles.weekDay}>
                    <View style={styles.DayTitle}>
                        <Text>LUNES</Text>
                    </View>
                    <View style={styles.frequencyList}>
                        <View style={styles.columns}>
                            <View style={styles.group}>
                                <Text>Group</Text>
                            </View>
                            <View style={styles.date}>
                                <Text>Start date:</Text>
                            </View>
                            <View style={styles.date}>
                                <Text>En date</Text>
                            </View>
                            <View style={styles.duration}>
                                <Text>Duration</Text>
                            </View>
                        </View>
                        <View style={styles.frequency}>
                            <View style={styles.group}>
                                <Text>Group 0001 | Folio 29376</Text>
                            </View>
                            <View style={styles.date}>
                                <Text>01/01/2025</Text>
                            </View>
                            <View style={styles.date}>
                                <Text>01/06/2025</Text>
                            </View>
                            <View style={styles.duration}>
                                <Text>9:00 am - 11:00 am</Text>
                            </View>
                        </View>
                    </View>
                </View>

            </Page>
        </Document>
    )
}

// Create styles
const styles = StyleSheet.create({
    page: {
        paddingHorizontal: '20px',
        paddingVertical: '28px',
        fontSize: '12px',
    },
    stripe: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        flexDirection: 'row'
    },
    pageTitle: {
        width: '100%',
        textAlign: 'center'
    },
    weekDay: {
        width: '100%',
    },
    DayTitle: {
        paddingHorizontal: '10px',
        paddingVertical: '5px',
        width: '100%',
        textAlign: 'center',
        backgroundColor: '#DEE7F3',
        marginBottom: '5px'
    },
    frequencyList: {

    },
    columns: {
        flexDirection: 'row',
        paddingHorizontal: '10px',
        paddingVertical: '6px',
        fontSize: '10px',
        color: '#616C72'
    },
    frequency: {
        flexDirection: 'row',
        paddingHorizontal: '10px',
        paddingVertical: '6px',
        fontSize: '11px',
    },
    group: {
        width: '220px'
    },
    date: {
        flex: 1
    },
    duration: {
        flex: 1,
        textAlign: 'right'
    },
});