import {
    StyleSheet,
    Text,
    View,
    Dimensions,
} from 'react-native';
import React from 'react';
import * as colors from '../styles/colors';
import Pot from './Pot';

import { useWindowDimensions } from "react-native";

const PotLayout = (props) => {
    const { height: windowHeight, width: windowWidth } = useWindowDimensions();
    const { pots, dist, height, padding, displayModal } = props;

    const containerStyle = [styles.container, { marginBottom: padding }];

    switch (pots.length) {
        // Layout for 1 pot
        case 1:
            return (
                <View style={containerStyle}>
                    <Pot
                        picture={pots[0].pictures[0]}
                        name={pots[0].animalName}
                        slug={pots[0].slug}
                        pot={pots[0]}
                        width={windowWidth - 2 * padding}
                        height={windowHeight * height}
                        displayModal={displayModal}
                    />
                </View>
            );

        // Layout for 2 pots
        case 2:
            return (
                <View style={containerStyle}>
                    <View style={styles.rowView}>
                        <Pot
                            picture={pots[0].pictures[0]}
                            name={pots[0].animalName}
                            slug={pots[0].slug}
                            pot={pots[0]}
                            width={windowWidth * dist - 1.5 * padding}
                            height={windowHeight * height}
                            displayModal={displayModal}
                        />
                        <Pot
                            picture={pots[1].pictures[0]}
                            name={pots[1].animalName}
                            slug={pots[1].slug}
                            pot={pots[1]}
                            width={windowWidth * (1 - dist) - 1.5 * padding}
                            height={windowHeight * height}
                            displayModal={displayModal}
                        />
                    </View>
                </View>
            );

        // Layout for 3 pots
        case 3:
            return (
                <View style={containerStyle}>
                    <View style={styles.rowView}>
                        <View style={[styles.columnView, { height: windowHeight * height }]}>
                            <Pot
                                picture={pots[0].pictures[0]}
                                name={pots[0].animalName}
                                slug={pots[0].slug}
                                pot={pots[0]}
                                width={windowWidth * dist - 1.5 * padding}
                                height={windowHeight * height / 2 - 0.5 * padding}
                                displayModal={displayModal}
                            />
                            <Pot
                                picture={pots[1].pictures[0]}
                                name={pots[1].animalName}
                                slug={pots[1].slug}
                                pot={pots[1]}
                                width={windowWidth * dist - 1.5 * padding}
                                height={windowHeight * height / 2 - 0.5 * padding}
                                displayModal={displayModal}
                            />
                        </View>
                        <Pot
                            picture={pots[2].pictures[0]}
                            name={pots[2].animalName}
                            slug={pots[2].slug}
                            pot={pots[2]}
                            width={windowWidth * (1 - dist) - 1.5 * padding}
                            height={windowHeight * height}
                            displayModal={displayModal}
                        />
                    </View>
                </View>
            );

        // Layout for 4 pots
        case 4:
            return (
                <View style={containerStyle}>
                    <View style={[styles.columnView, { height: windowHeight * height }]}>
                        <View style={styles.rowView}>
                            <Pot
                                picture={pots[0].pictures[0]}
                                name={pots[0].animalName}
                                slug={pots[0].slug}
                                pot={pots[0]}
                                width={windowWidth * dist - 1.5 * padding}
                                height={windowHeight * height * dist - 0.5 * padding}
                                displayModal={displayModal}
                            />
                            <Pot
                                picture={pots[1].pictures[0]}
                                name={pots[1].animalName}
                                slug={pots[1].slug}
                                pot={pots[1]}
                                width={windowWidth * (1 - dist) - 1.5 * padding}
                                height={windowHeight * height * dist - 0.5 * padding}
                                displayModal={displayModal}
                            />
                        </View>
                        <View style={styles.rowView}>
                            <Pot
                                picture={pots[2].pictures[0]}
                                name={pots[2].animalName}
                                slug={pots[2].slug}
                                pot={pots[2]}
                                width={windowWidth * dist - 1.5 * padding}
                                height={windowHeight * height * (1 - dist) - 0.5 * padding}
                                displayModal={displayModal}
                            />
                            <Pot
                                picture={pots[3].pictures[0]}
                                name={pots[3].animalName}
                                slug={pots[3].slug}
                                pot={pots[3]}
                                width={windowWidth * (1 - dist) - 1.5 * padding}
                                height={windowHeight * height * (1 - dist) - 0.5 * padding}
                                displayModal={displayModal}
                            />
                        </View>
                    </View>
                </View>
            );

    }
};

export default PotLayout;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
    },
    rowView: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
    },
    columnView: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});