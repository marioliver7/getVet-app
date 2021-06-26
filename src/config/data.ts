export class Data {

    public static token = null;
    public static user: { name: string, email: string };

    public static setToken(email: string, password: string) {
        this.token = btoa(`${email}:${password}`);
    }

    public static getToken() {
        return this.token || localStorage.getItem('GetVet_TOKEN');
    }

    public static saveToken() {
        localStorage.setItem('GetVet_TOKEN', this.token);
    }

    public static initToken() {
        this.token = localStorage.getItem('GetVet_TOKEN');

        if (this.token) {
            this.user = JSON.parse(localStorage.getItem('GetVet_USER'));
        }
    }

    public static removeToken() {
        localStorage.removeItem('GetVet_TOKEN');
        localStorage.removeItem('GetVet_USER');
    }

    public static saveUser(user: any) {
        localStorage.setItem('GetVet_USER', JSON.stringify(user));
    }
}