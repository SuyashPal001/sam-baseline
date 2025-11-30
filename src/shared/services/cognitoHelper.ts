import { SSMClient, GetParametersCommand } from '@aws-sdk/client-ssm';

const ssmClient = new SSMClient({ region: process.env.AWS_REGION || 'ap-south-1' });

interface CognitoCredentials {
  clientId: string;
  clientSecret: string;
  userPoolId: string;
}

let cachedCredentials: CognitoCredentials | null = null;

export const getCredentials = async (): Promise<CognitoCredentials> => {
  // Return cached credentials if available
  if (cachedCredentials) {
    console.log('Using cached Cognito credentials');
    return cachedCredentials;
  }

  console.log('Retrieving Cognito credentials from Parameter Store...');

  const clientIdPath = process.env.COGNITO_CLIENT_ID_PATH;
  const clientSecretPath = process.env.COGNITO_CLIENT_SECRET_PATH;
  const userPoolId = process.env.COGNITO_USER_POOL_ID;

  if (!clientIdPath || !clientSecretPath || !userPoolId) {
    throw new Error('Cognito configuration environment variables not set');
  }

  const command = new GetParametersCommand({
    Names: [clientIdPath, clientSecretPath],
    WithDecryption: true
  });

  const response = await ssmClient.send(command);

  if (!response.Parameters || response.Parameters.length < 2) {
    throw new Error('Failed to retrieve Cognito credentials from Parameter Store');
  }

  const clientId = response.Parameters.find(p => p.Name === clientIdPath)?.Value;
  const clientSecret = response.Parameters.find(p => p.Name === clientSecretPath)?.Value;

  if (!clientId || !clientSecret) {
    throw new Error('Cognito credentials incomplete');
  }

  cachedCredentials = {
    clientId,
    clientSecret,
    userPoolId
  };

  console.log('Cognito credentials retrieved and cached successfully');
  return cachedCredentials;
};

export const clearCache = (): void => {
  cachedCredentials = null;
};
