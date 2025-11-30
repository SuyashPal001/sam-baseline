// src/config/s3-config.ts
interface S3Config {
  // Only environment-specific bucket names from environment variables
  artifactsBucket: string;
  applicationBucket: string;
}

export const getS3Config = (): S3Config => {
  return {
    artifactsBucket: process.env.S3_ARTIFACTS_BUCKET!,
    applicationBucket: process.env.S3_APPLICATION_BUCKET!
  };
};
