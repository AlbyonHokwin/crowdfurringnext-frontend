import { Dimensions } from 'react-native';

const { fontScale } = Dimensions.get('screen');

const fonts = {};
fonts.baseSmall = { normal: { fontSize: fontScale * 16 } };
fonts.base = { normal: { fontSize: fontScale * 20 } };
fonts.baseBig = { normal: { fontSize: fontScale * 24 } };
fonts.title = { normal: { fontSize: fontScale * 30 } };
fonts.titleBig = { normal: { fontSize: fontScale * 40 } };

Object.keys(fonts).forEach(key => fonts[key].bold = { ...fonts[key].normal, fontWeight: 'bold' });

export { fonts };