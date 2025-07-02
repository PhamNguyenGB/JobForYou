import models from "../models";
import { TokenDto } from "../types/token.types";

export class TokenRepo {
  async createToken(token: TokenDto) {
    return await models.TokenModel.create(token);
  }

  async findOneToken(refreshToken: string) {
    return await models.TokenModel.findOne({
      where: { refresh_token: refreshToken },
    });
  }

  async updateToken(refresh_token: string) {
    return await models.TokenModel.update(
      { is_revoked: true },
      { where: { refresh_token } }
    );
  }
}

const tokenRepo = new TokenRepo();
export default tokenRepo;
