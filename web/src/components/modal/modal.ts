import {Component, Vue} from 'vue-facing-decorator';

@Component({
    name: 'app-modal',
    emits: ['app-modal-close']
})
export default class Modal extends Vue {
    close() {
        this.$emit('app-modal-close');
    }
}
