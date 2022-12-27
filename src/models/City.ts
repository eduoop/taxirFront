export type City = {
    id: number;
    nome: string;
    microrregiao: {
        id: string;
        mesorregiao: {
            UF: {
                id: number;
                nome: string;
                região: {
                    id: number;
                    nome: string;
                    sigla: string;
                },
                sigla: string;
            }
            id: number;
            nome: string;
        }
        nome: string;
    }
}