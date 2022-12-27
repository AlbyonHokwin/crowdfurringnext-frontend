import { Dimensions } from 'react-native';

const { fontScale } = Dimensions.get('screen');

const fonts = {};
fonts.baseSmall = { normal: { fontSize: 16 / fontScale } };
fonts.base = { normal: { fontSize: 20 / fontScale } };
fonts.baseBig = { normal: { fontSize: 24 / fontScale } };
fonts.title = { normal: { fontSize: 30 / fontScale } };
fonts.titleBig = { normal: { fontSize: 40 / fontScale } };

Object.keys(fonts).forEach(key => fonts[key].bold = { ...fonts[key].normal, fontWeight: 'bold' });

export { fonts };