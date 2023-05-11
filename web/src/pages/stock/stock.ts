import {Component, Vue} from 'vue-facing-decorator';
import {IUser} from '@/interfaces/user';
import axios from 'axios';
import AppModal from '@/components/modal/modal.vue';

@Component({
    components: {
        'app-modal': AppModal
    }
})
export default class Stock extends Vue {
    public isModalVisible!: boolean = false;
    public productId!: string = false;
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

    async logout() {
        try {
            await this.$store.dispatch('auth/setAuthentication', undefined);
            localStorage.removeItem('authentication');
            this.$router.replace('/login');
        } catch (error) {
            localStorage.removeItem('authentication');
            this.$router.replace('/login');
        }
    }

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
                        'Access-Control-Allow-Origin': '*',
                        Authorization: `Bearer ${this.authentication.token}`
                    }
                }
            );
            this.products = response.data.data;
            this.pagination = response.data.pagination;
        } catch (errResponse) {
            if (errResponse.response.status === 401) {
                await this.logout();
            }
        }
    }

    async listUsers() {
        const response = await axios.get(
            import.meta.env.VITE_API_URL_BASE + '/sellers',
            {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            }
        );
        this.users = response.data.data;
        for (let i = 0; i < this.users.length; i++) {
            this.usersById[this.users[i].id] = this.users[i].email;
        }
    }

    async created() {
        this.productId = '';
        this.isModalVisible = false;
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

    showModal() {
        this.productName = '';
        this.productSku = '';
        this.productPrice = '';
        this.isModalVisible = true;
    }

    closeModal() {
        this.isModalVisible = false;
    }

    async save() {
        if (this.productId != '') {
            await this.updateProduct();
        } else {
            await this.saveProduct();
        }
    }

    async saveProduct() {
        try {
            await axios.post(
                import.meta.env.VITE_API_URL_BASE + '/products',
                {
                    name: this.productName,
                    sku: this.productSku,
                    price: parseFloat(this.productPrice)
                },
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        Authorization: `Bearer ${this.authentication.token}`
                    }
                }
            );
        } catch (errResponse) {
            if (errResponse.response.status === 401) {
                await this.logout();
            }
            if (errResponse.response.status === 400) {
                this.errors = errResponse.response.data.meta.errors;
                return;
            }
        }
        await this.listProducts();
        this.closeModal();
    }

    async updateProduct() {
        try {
            await axios.put(
                import.meta.env.VITE_API_URL_BASE +
                    '/products/' +
                    this.productId,
                {
                    name: this.productName,
                    sku: this.productSku,
                    price: parseFloat(this.productPrice)
                },
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        Authorization: `Bearer ${this.authentication.token}`
                    }
                }
            );
        } catch (errResponse) {
            if (errResponse.response.status === 401) {
                await this.logout();
            }
            if (errResponse.response.status === 400) {
                this.errors = errResponse.response.data.meta.errors;
                return;
            }
        }
        this.productId = '';
        await this.listProducts();
        this.closeModal();
    }

    updateProductModal(productId) {
        this.productId = productId;
        let product: any = {};

        for (let i = 0; i < this.products.length; i++) {
            if (productId == this.products[i].id) {
                product = this.products[i];
                break;
            }
        }

        this.productName = product.name;
        this.productSku = product.sku;
        this.productPrice = product.price;
        this.isModalVisible = true;
    }

    async deleteProduct(productId) {
        let product: any = {};

        for (let i = 0; i < this.products.length; i++) {
            if (productId == this.products[i].id) {
                product = this.products[i];
                break;
            }
        }

        if (
            confirm('Confirma que desea eliminar el producto ' + product.name)
        ) {
            try {
                await axios.delete(
                    import.meta.env.VITE_API_URL_BASE +
                        '/products/' +
                        product.id,
                    {
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            Authorization: `Bearer ${this.authentication.token}`
                        }
                    }
                );
                await this.listProducts();
            } catch (error) {
                console.log(error);
            }
        }
    }
}
