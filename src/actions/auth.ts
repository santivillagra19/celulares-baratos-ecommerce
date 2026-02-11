import { supabase } from "../supabase/client";

interface IAuthLogin {
    email: string;
    password: string;
}

interface IAuthRegister {
    email: string;
    password: string;
    fullName: string;
    phone?: string;
}

export const signUp = async ({
    email,
    password,
    fullName,
    phone

}: IAuthRegister) => {
    try {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) {
            throw new Error(error.message);
        };

        const userId = data.user?.id;
        if (!userId) {
            throw new Error('Error al obtener el id del usuario')
        };

        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) {
            throw new Error('Email y/o contraseña incorrectos');
        };

        const { error: roleError } = await supabase.from('user_roles').insert({
            user_id: userId,
            role: 'customer'
        });
        if (roleError) {
            throw new Error('Error al registrar el rol del usuario');
        };

        const { error: customerError } = await supabase.from('customers').insert({
            user_id: userId,
            full_name: fullName,
            phone,
            email
        });
        if (customerError) {
            throw new Error('Error al registrar los datos del usuario');
        };

        return data;


    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error('Error desconocido al registrar al usuario');
    }
};

export const signIn = async ({ email, password }: IAuthLogin) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
        throw new Error('Email y/o contraseña incorrectos');
    }

    return data;
};

export const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
        throw new Error('Error al cerrar sesión');
    }
};

export const getSesion = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
        throw new Error('Error al obtener la sesión');
    };

    return data;
}