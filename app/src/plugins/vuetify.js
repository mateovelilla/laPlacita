import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
	icons: {
		iconfont: 'md',
	},
	theme: {
		options: {
			customProperties: true,
		},
    themes: {
			light: {
				primary: '#37475A',
				secondary: '#F2C84B',
				error: '#D96941',
				light: '#8C614C',
				btn: '#8B7B70'
			}
		}
	}
});
