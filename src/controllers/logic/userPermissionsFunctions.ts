import { Request, Response } from "express";
import knex from "../../database/connection";
import { sendMessage } from "../../websocket";

export const getUsersPermissions = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const userHasPermission = await knex("usuarios_has_permissoes")
      .select("*")
      .join(
        "usuarios",
        "usuarios.codigo_usuario",
        "usuarios_has_permissoes.codigo_usuario"
      )
      .join(
        "permissoes",
        "permissoes.codigo_permissao",
        "usuarios_has_permissoes.codigo_permissao"
      )
      .where("codigo_usuario", userId);
    return res.json(userHasPermission);
  } catch (error) {
    console.log("Erro:", error);
    return res.json({ message: error });
  }
};
