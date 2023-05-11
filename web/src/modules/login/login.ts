import {Component, Vue} from 'vue-facing-decorator';

import Input from '@/components/input/input.vue';
import {useToast} from 'vue-toastification';
import {authLogin} from '@/utils/oidc-providers';
import {PfButton} from '@profabric/vue-components';

@Component({
    components: {
        'app-input': Input,
        'pf-button': PfButton
    }
})
export default class Login extends Vue {
    private appElement: HTMLElement | null = null;
    public email: string = '';
    public password: string = '';
    public isAuthLoading: boolean = false;
    private toast = useToast();

    public mounted(): void {
        this.appElement = document.getElementById('app') as HTMLElement;
        this.appElement.classList.add('login-page');
    }

    public unmounted(): void {
        (this.appElement as HTMLElement).classList.remove('login-page');
    }

    public async loginByAuth(): Promise<void> {
        try {
            this.isAuthLoading = true;
            const response = await authLogin(this.email, this.password);
            await this.$store.dispatch('auth/setAuthentication', response);
            this.toast.success('Acceso exitoso');
            this.isAuthLoading = false;
            this.$router.replace('/');
        } catch (error: any) {
            this.toast.error(error.message);
            this.isAuthLoading = false;
        }
    }
}
