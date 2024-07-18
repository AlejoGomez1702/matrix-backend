import * as bcrypt from 'bcrypt';

interface SeedUser {
    email: string;
    fullName: string;
    password: string;
    document: string;
    country: string;
    phoneNumber: string;
    phoneNumber2?: string; // Opcional
    sponsor: string;
    termsAccepted: boolean;
    dataUsageAuthorization: boolean;
    isActive: boolean;
    roles: string[];
    state: number;
}

interface SeedState {
    name: string;
}

interface SeedData {
    states: SeedState[];
    users: SeedUser[];
}

export const initialData: SeedData = {
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNzIxMDczMDg1LCJleHAiOjE3MjExNTk0ODV9.XodnNt7cOXQfH5GHH46lsigFo5wybuFxa8HusiWW9iE
    users: [
        {
            email: 'ramiro@matrix.com',
            fullName: 'Administrador',
            password: bcrypt.hashSync('Administrador1', 10),
            document: '12345678',
            country: 'Matrixland',
            phoneNumber: '123-456-7890',
            phoneNumber2: '098-765-4321', // Este campo es opcional
            sponsor: 'SponsorName',
            termsAccepted: true,
            dataUsageAuthorization: true,
            isActive: true,
            roles: ['admin'],
            state: 1
        },
    ],
    states: [
        {
            name: 'Registrado'
        },
        {
            name: 'Patrocinado'
        },
        {
            name: 'Miembro 1'
        },
        {
            name: 'Miembro 2'
        },
        {
            name: 'Miembro 3'
        }
    ]
};