// S3 crypto icon utility
const S3_BUCKET = 'production-seer-coin-images';
const AWS_REGION = 'us-east-1';

export function getCryptoIconUrl(cryptoId: string, size: 'small' | 'large' = 'small'): string {
  const id = cryptoId.toLowerCase().trim();
  return `https://${S3_BUCKET}.s3.${AWS_REGION}.amazonaws.com/coins/${id}/${size}.png`;
}