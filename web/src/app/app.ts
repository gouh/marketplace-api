import {calculateWindowSize} from '@/utils/helpers';
import {Component, Vue, Watch} from 'vue-facing-decorator';
import {useWindowSize} from '@vueuse/core';
import {getAuthStatus} from '@/utils/oidc-providers';

@Component({})
export default class App extends Vue {
    isAppLoading: boolean = true;

    async mounted() {
        await this.checkSession();
    }

    async checkSession() {
        try {
            const response = await getAuthStatus();
            if (response != null && typeof response != 'undefined') {
                await this.$store.dispatch('auth/setAuthentication', response);
            }
        } catch (error: any) {
            console.log('error', error);
        }
        this.isAppLoading = false;
    }

    @Watch('windowSize')
    watchWindowSize(newValue: any) {
        if (this.$store.getters['ui/screenSize'] !== newValue) {
            this.$store.dispatch('ui/setWindowSize', newValue);
        }
    }

    get windowSize() {
        const {width} = useWindowSize();
        return calculateWindowSize(width.value);
    }
}
