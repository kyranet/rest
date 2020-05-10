import { URL } from 'url';

import { ImageURLOptions, EmojiExtension } from '../types/InternalREST';

const ALLOWED_EXTENSIONS = ['webp', 'png', 'jpg', 'jpeg', 'gif'];
const ALLOWED_SIZES = Array.from({ length: 9 }, (__, i) => 2 ** (i + 4));

function makeURL(base: string, { extension = 'png', size }: ImageURLOptions = {}): string {
	if (extension && !ALLOWED_EXTENSIONS.includes(String(extension).toLowerCase())) throw new RangeError(`Invalid extension provided: ${extension}\nMust be one of: ${ALLOWED_EXTENSIONS.join(', ')}`);
	if (size && !ALLOWED_SIZES.includes(size)) throw new RangeError(`Invalid size provided: ${size}\nMust be one of: ${ALLOWED_SIZES.join(', ')}`);

	const url = new URL(`${base}.${extension}`);
	if (size) url.searchParams.set('size', String(size));

	return url.toString();
}

/**
 * The CDN link builder
 */
export class CDN {

	// eslint-disable-next-line no-useless-constructor
	public constructor(private readonly base: string) {}

	/**
	 * Generates an app asset URL for a client's asset.
	 * @param clientID The client ID that has the asset
	 * @param assetHash The hash provided by Discord for this asset
	 * @param options Optional options for the asset
	 */
	appAsset(clientID: string, assetHash: string, options?: ImageURLOptions): string {
		return makeURL(`${this.base}/app-assets/${clientID}/${assetHash}`, options);
	}

	/**
	 * Generates an app icon URL for a client's icon.
	 * @param clientID The client ID that has the icon
	 * @param iconHash The hash provided by Discord for this icon
	 * @param options Optional options for the icon
	 */
	appIcon(clientID: string, iconHash: string, options?: ImageURLOptions): string {
		return makeURL(`${this.base}/app-icons/${clientID}/${iconHash}`, options);
	}

	/**
	 * Generates the default avatar URL for a discriminator.
	 * @param discriminator The discriminator modulo 5
	 */
	defaultAvatar(discriminator: number): string {
		return `${this.base}/embed/avatars/${discriminator}.png`;
	}

	/**
	 * Generates a discovery splash URL for a guild's discovery splash.
	 * @param guildID The guild ID that has the discovery splash
	 * @param splashHash The hash provided by Discord for this splash
	 * @param options Optional options for the splash
	 */
	discoverySplash(guildID: string, splashHash: string, options?: ImageURLOptions): string {
		return makeURL(`${this.base}/discovery-splashes/${guildID}/${splashHash}`, options);
	}

	/**
	 * Generates an emoji's URL for an emoji.
	 * @param emojiID The emoji ID
	 * @param extension The extension of the emoji
	 */
	emoji(emojiID: string, extension: EmojiExtension = 'png'): string {
		return `${this.base}/emojis/${emojiID}.${extension}`;
	}

	/**
	 * Generates a group DM icon URL for a group DM.
	 * @param channelID The group channel ID that has the icon
	 * @param iconHash The hash provided by Discord for this group DM channel
	 * @param options Optional options for the icon
	 */
	groupDMIcon(channelID: string, iconHash: string, options?: ImageURLOptions): string {
		return makeURL(`${this.base}/channel-icons/${channelID}/${iconHash}`, options);
	}

	/**
	 * Generates a banner URL for a guild's banner.
	 * @param guildID The guild ID that has the banner splash
	 * @param bannerHash The hash provided by Discord for this banner
	 * @param options Optional options for the banner
	 */
	guildBanner(guildID: string, bannerHash: string, options?: ImageURLOptions): string {
		return makeURL(`${this.base}/banners/${guildID}/${bannerHash}`, options);
	}

	/**
	 * Generates an icon URL for a guild's icon.
	 * @param guildID The guild ID that has the icon splash
	 * @param iconHash The hash provided by Discord for this icon
	 * @param options Optional options for the icon
	 */
	guildIcon(guildID: string, iconHash: string, options?: ImageURLOptions): string {
		return makeURL(`${this.base}/icons/${guildID}/${iconHash}`, options);
	}

	/**
	 * Generates a guild invite splash URL for a guild's invite splash.
	 * @param guildID The guild ID that has the invite splash
	 * @param splashHash The hash provided by Discord for this splash
	 * @param options Optional options for the splash
	 */
	splash(guildID: string, splashHash: string, options?: ImageURLOptions): string {
		return makeURL(`${this.base}/splashes/${guildID}/${splashHash}`, options);
	}

	/**
	 * Generates a team icon URL for a team's icon.
	 * @param teamID The team ID that has the icon
	 * @param iconHash The hash provided by Discord for this icon
	 * @param options Optional options for the icon
	 */
	teamIcon(teamID: string, iconHash: string, options?: ImageURLOptions): string {
		return makeURL(`${this.base}/team-icons/${teamID}/${iconHash}`, options);
	}

	/**
	 * Generates a user avatar URL for a user's avatar.
	 * @param userID The user ID that has the icon
	 * @param avatarHash The hash provided by Discord for this avatar
	 * @param options Optional options for the avatar
	 */
	userAvatar(userID: string, avatarHash: string, { dynamic = false, ...options }: ImageURLOptions = {}): string {
		if (dynamic) options.extension = avatarHash.startsWith('a_') ? 'gif' : options.extension;
		return makeURL(`${this.base}/avatars/${userID}/${avatarHash}`, options);
	}

}
