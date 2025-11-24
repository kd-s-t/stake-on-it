import { S3_BUCKET, AWS_REGION } from './config';
import { IconSize } from './types';

export function getCryptoIconUrl(cryptoId: string, size: IconSize = 'small'): string {
  const id = cryptoId.toLowerCase().trim();
  return `https://${S3_BUCKET}.s3.${AWS_REGION}.amazonaws.com/coins/${id}/${size}.png`;
}