interface IUser {
    id: string,
    role: string;
    firstname: string;
    lastname: string;
}


export const Auth = defineStore('IsAuth', () => {
    const count = ref(0)
    const IsAuth = ref<boolean>(false);
    const User = ref<IUser>({
        id: '499fa5a0-771c-4fd7-bd58-dad8fdd913ab',
        firstname: '',
        lastname: '',
        role: "Superadmin"
    })

    function $reset() {
        count.value = 0
    }

    return { count, IsAuth, User, $reset }
})