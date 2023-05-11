import {Component, Vue} from 'vue-facing-decorator';
import {IUser} from '@/interfaces/user';
import axios from 'axios';

@Component({})
export default class Marketplace extends Vue {
    public errors!: string[] = [];
    public sellerFilter!: string[] = [];
    public productName!: string = '';
    public productSku!: string = '';
    public productPrice!: string = '';
    public priceMin!: number = '';
    public priceMax!: number = '';

    private users: any = [];
    private usersById: any = {};
    private products: any = {};
    private pagination: any = {};
    private currentPage: string = '';
    private limitPage: string = '10';
    private nameProduct: string = '';

    get authentication(): IUser {
        return this.$store.getters['auth/authentication'];
    }

    async listProducts() {
        const queryParams = {
            limit: this.limitPage
        };
        if (this.currentPage) {
            queryParams.page = this.currentPage;
        } else {
            queryParams.page = '1';
        }
        if (this.nameProduct) {
            queryParams.name = this.nameProduct;
        }
        if (this.priceMin && this.priceMin > 0) {
            queryParams.priceMin = this.priceMin;
        }
        if (this.priceMax && this.priceMax > 0) {
            queryParams.priceMax = this.priceMax;
        }
        if (this.sellerFilter.length) {
            queryParams.seller = this.sellerFilter;
        }

        try {
            const response = await axios.get(
                import.meta.env.VITE_API_URL_BASE + '/products',
                {
                    params: queryParams,
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    }
                }
            );
            this.products = response.data.data;
            this.pagination = response.data.pagination;
        } catch (errResponse) {
            console.log(errResponse);
        }
    }

    async listUsers() {
        const response = await axios.get(
            import.meta.env.VITE_API_URL_BASE + '/sellers'
        );
        this.users = response.data.data;
        for (let i = 0; i < this.users.length; i++) {
            this.usersById[this.users[i].id] = this.users[i].email;
        }
    }

    async created() {
        this.sellerFilter = [];
        this.errors = [];
        this.productName = '';
        this.productSku = '';
        this.productPrice = '';
        this.priceMin = '';
        this.priceMax = '';
        await this.listProducts();
        await this.listUsers();
    }

    async changePage(page) {
        this.currentPage = page;
        await this.listProducts();
    }

    async prevPage(page) {
        await this.changePage(page - 1);
    }

    async nextPage(page) {
        await this.changePage(page + 1);
    }

    async setProductName(event) {
        this.nameProduct = event.target.value;
        await this.listProducts();
    }

    async setLimit(event) {
        this.limitPage = event.target.value;
        await this.listProducts();
    }
}
