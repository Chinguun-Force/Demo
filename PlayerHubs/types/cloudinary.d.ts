declare module 'cloudinary' {
  export const v2: {
    config: (config: {
      cloud_name: string;
      api_key: string;
      api_secret: string;
    }) => void;
    uploader: {
      upload: (
        file: string,
        options: {
          folder?: string;
          resource_type?: string;
        },
        callback: (error: Error | undefined, result: any) => void
      ) => void;
    };
  };
} 