import {IUser} from '@/interfaces/user';
import {Component, Vue} from 'vue-facing-decorator';
import MenuItem from '@/components/menu-item/menu-item.vue';
import {PfImage} from '@profabric/vue-components';
import {i18n} from '@/translation';

@Component({
    name: 'app-menu-sidebar',
    components: {
        'app-menu-item': MenuItem,
        'pf-image': PfImage
    }
})
export default class MenuSidebar extends Vue {
    menu = MENU;

    get authentication(): IUser {
        return this.$store.getters['auth/authentication'];
    }

    get sidebarSkin() {
        return this.$store.getters['ui/sidebarSkin'];
    }
}

export const MENU = [
    {
        name: i18n.global.t('labels.marketplace'),
        path: '/',
        icon: 'fa-credit-card'
    },
    {
        name: i18n.global.t('labels.stock'),
        path: '/stock',
        icon: 'fa-cubes'
    }
];
