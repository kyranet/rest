export const enum RESTManagerEvents {
	Debug = 'debug',
	Ratelimited = 'ratelimited',

	ClientRESTDebug = 'restDebug',
}

export type ImageExtension = 'png' | 'gif' | 'webp' | 'jpg' | 'jpeg';
export type EmojiExtension = 'png' | 'gif';

export interface ImageURLOptions {
	extension?: string;
	size?: number;
	dynamic?: boolean;
}
