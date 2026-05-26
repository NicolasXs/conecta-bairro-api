import { AppError } from "../domain/errors";

interface ViaCepResponse {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: true;
}

export const fetchCidadeByCep = async (cep: string): Promise<string> => {
  const digits = cep.replace(/\D/g, "");

  if (digits.length !== 8) {
    throw new AppError(422, "INVALID_CEP", "CEP deve conter 8 dígitos.");
  }

  let response: Response;

  try {
    response = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
  } catch {
    throw new AppError(502, "VIACEP_UNAVAILABLE", "Não foi possível consultar o ViaCEP.");
  }

  if (!response.ok) {
    throw new AppError(502, "VIACEP_UNAVAILABLE", "Erro ao consultar o ViaCEP.");
  }

  const data = (await response.json()) as ViaCepResponse;

  if (data.erro) {
    throw new AppError(422, "INVALID_CEP", "CEP não encontrado.");
  }

  return data.localidade;
};
