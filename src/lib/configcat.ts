import * as configcat from 'configcat-js';
import { env } from './env';

// Verificar se a chave SDK é válida
const isValidSdkKey = (key: string): boolean => {
  return Boolean(key && key.startsWith('configcat-sdk-1/') && key.length > 20);
};

// Configuração do cliente ConfigCat
export const configCatClient = (() => {
  if (!env.CONFIGCAT_SDK_KEY) {
    console.warn('ConfigCat SDK Key não configurada. Feature flags usarão valores padrão.');
    return null;
  }

  if (!isValidSdkKey(env.CONFIGCAT_SDK_KEY)) {
    console.warn('ConfigCat SDK Key inválida. Feature flags usarão valores padrão.');
    return null;
  }

  try {
    return configcat.getClient(
      env.CONFIGCAT_SDK_KEY,
      configcat.PollingMode.AutoPoll,
      {
        pollIntervalSeconds: 30, // Verifica atualizações a cada 30 segundos
        requestTimeoutMs: 3000,  // Timeout para requisições (3 segundos)
        logger: configcat.createConsoleLogger(
          env.DEBUG_MODE 
            ? configcat.LogLevel.Info // Logs detalhados em desenvolvimento
            : configcat.LogLevel.Warn  // Logs mínimos em produção
        ),
      }
    );
  } catch (error) {
    console.warn('Erro ao criar cliente ConfigCat:', error);
    return null;
  }
})();

// Definição dos tipos para as feature flags esperadas
export interface FeatureFlags {
  ab_test_home_banner: 'A' | 'B';
  // Adicione outras feature flags aqui conforme o projeto cresce
}

// Valores padrão para as feature flags
export const DEFAULT_FLAGS: FeatureFlags = {
  ab_test_home_banner: 'A',
};

// Função para obter um feature flag específico
export async function getFeatureFlag<K extends keyof FeatureFlags>(
  flagKey: K,
  userObject?: configcat.User
): Promise<FeatureFlags[K]> {
  if (!configCatClient) {
    if (env.DEBUG_MODE) {
      console.warn(`ConfigCat client não configurado. Usando valor padrão para ${String(flagKey)}.`);
    }
    return DEFAULT_FLAGS[flagKey];
  }

  try {
    const value = await configCatClient.getValueAsync(
      flagKey,
      DEFAULT_FLAGS[flagKey],
      userObject
    );
    return value as FeatureFlags[K];
  } catch (error) {
    console.error(`Erro ao obter feature flag ${String(flagKey)}:`, error);
    return DEFAULT_FLAGS[flagKey];
  }
}

// Função para criar um objeto de usuário para segmentação
export function createUserObject(
  identifier: string,
  email?: string,
  country?: string,
  customAttributes?: Record<string, string>
): configcat.User {
  return new configcat.User(identifier, email, country, customAttributes);
}

