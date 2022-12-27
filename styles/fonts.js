import { Dimensions } from 'react-native';

const { fontScale } = Dimensions.get('screen');

const fonts = {};
fonts.baseSmall = { normal: { fontSize: 14 / fontScale } };
fonts.base = { normal: { fontSize: 18 / fontScale } };
fonts.baseBig = { normal: { fontSize: 22 / fontScale } };
fonts.title = { normal: { fontSize: 28 / fontScale } };
fonts.titleBig = { normal: { fontSize: 40 / fontScale } };

Object.keys(fonts).forEach(key => fonts[key].bold = { ...fonts[key].normal, fontWeight: 'bold' });

export { fonts };