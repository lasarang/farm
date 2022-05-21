export interface Roles{
    worker?: boolean;
    admin?: boolean;
}

export interface User{
    uid: string;
    name: string;
    roles: Roles;
}

export interface Usuario{
    //InfoBasica
    cedula: string;
    nombres: string;
    apellidos: string;
    direccion: string;
    telefono: string;
    email: string;
    id: string;
    rol: string;

    //Info personal
    dob: string;
    groLegal: string;
    estadoCivil: string;
    seguro: string;
    ocupacion: string;
    discapacidad: string;
    gpoSanguineo: string;
    talla: number;
    peso: number;
}
