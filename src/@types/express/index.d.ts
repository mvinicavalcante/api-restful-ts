//Sobrescrevendo o request para passar o id de usuário na autenticação (middleware do token)
declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}
